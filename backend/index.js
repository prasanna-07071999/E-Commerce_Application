const express = require('express')
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const {open} = require('sqlite')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken');
const insertedData = require('./data')


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

const dbPath = path.join(__dirname, "db", "nxttrends.db")

let db = null

async function createTables(db) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            brand TEXT NOT NULL,
            price REAL NOT NULL,
            image_url TEXT NOT NULL,
            category_id INTEGER,
            rating REAL
        );

        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
        );
    `)    
}

const initializeDbAndServer = async() =>{
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        await createTables(db);

        await insertedData(db);

        const PORT = process.env.PORT || 5000;

        app.listen(5000, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        })
    } catch(e){
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

initializeDbAndServer()

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "kajjehfxzcjhsdsaxdbsdhd", async (error, payload) => {
      if (error) {
        response.send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};


app.post('/signup', async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10)

  const selectUserQuery = `SELECT * FROM users WHERE username ='${username}'`;
  let passwordLength = password.length
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined){
    if(passwordLength > 6){
      const createUserQuery = `
      INSERT INTO users (username, password)
        VALUES('${username}', '${hashedPassword}')`

      await db.run(createUserQuery)
      response.send("User Created Successfully")
    } else {
      response.status(400)
      response.send("Password too short")
    }
  } else {
    response.status(400)
    response.send("User Already Exists.")
  }
});


app.post("/login", async (request, response) => {
  const { username, password } = request.body
  const selectQuery = `SELECT * FROM users WHERE username = '${username}'`
  const dbUser = await db.get(selectQuery)
  try{
      if (dbUser === undefined){
    response.status(400)
    response.send('Invalid User')
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    if(isPasswordMatched === true){
      const payload = {
        username: username,
      }
      const jwtToken = jwt.sign(payload, "kajjehfxzcjhsdsaxdbsdhd")
      response.send({jwtToken})
    } else {
      response.status(400)
      response.send("Invalid Password")
    }
  }
  } catch(e){
    return response.status(500).send('Internal Server Error');
  }
})

app.get('/products', async (req, res) => {
  try {
    const { category, title_search, rating, sort_by } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category_id = ?';
      params.push(category);
    }

    if (rating) {
      query += ' AND rating >= ?';
      params.push(rating);
    }

    if (title_search) {
      query += ' AND title LIKE ?';
      params.push(`%${title_search}%`);
    }

    if (sort_by === 'PRICE_HIGH') {
      query += ' ORDER BY price DESC';
    } else if (sort_by === 'PRICE_LOW') {
      query += ' ORDER BY price ASC';
    }

    const rows = await db.all(query, params);
    res.send({ products: rows });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).send({ error: err.message });
  }
});


// Get single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);
    
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.send(product);
  } catch (error) {
    console.error('DB Error:', error.message);
    res.status(500).send({ error: error.message });
  }
});




// Add to cart POST route without async/await
app.post('/cart', authenticateToken, async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
    const result = await db.run(query, [user_id, product_id, quantity]);
    res.send({ cartId: result.lastID });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get cart items GET route
app.get('/cart/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `
      SELECT c.id, p.title, p.price, c.quantity
      FROM cart c 
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `;
    const rows = await db.all(query, [userId]);
    res.send({ cartItems: rows });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete cart item route
app.delete('/cart/:cartId', authenticateToken, async (req, res) => {
  try {
    const { cartId } = req.params;
    await db.run('DELETE FROM cart WHERE id = ?', [cartId]);
    res.send({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Clear cart items route
app.delete('/cart/clear/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    await db.run('DELETE FROM cart WHERE user_id = ?', [userId]);
    res.send({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Create product
app.post('/products', authenticateToken, async (req, res) => {
  try {
    const { id, title, brand, price, image_url, category_id, rating } = req.body;

    if (!id || !title || !brand || price === undefined || !image_url) {
      return res.status(400).send({ error: 'Missing required product fields' });
    }

    const insertQuery = `
      INSERT INTO products (id, title, brand, price, image_url, category_id, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.run(insertQuery, [id, title, brand, price, image_url, category_id, rating]);
    res.status(201).send({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Update product
app.put('/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, brand, price, image_url, category_id, rating } = req.body;

    const existingProduct = await db.get('SELECT * FROM products WHERE id = ?', [id]);
    if (!existingProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }

    const updateQuery = `
      UPDATE products
      SET title = ?, brand = ?, price = ?, image_url = ?, category_id = ?, rating = ?
      WHERE id = ?
    `;
    await db.run(updateQuery, [title, brand, price, image_url, category_id, rating, id]);
    res.send({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Delete product
app.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await db.get('SELECT * FROM products WHERE id = ?', [id]);
    if (!existingProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }

    await db.run('DELETE FROM products WHERE id = ?', [id]);
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});