const bcrypt = require('bcryptjs');

async function insertedData(db) {

    const users = [
        { username: 'rahul', password: 'rahul@2021' },
        { username: 'praneetha', password: 'praneetha@2021' },
        { username: 'mosh', password: 'DevMosh22' },
        { username: 'robert', password: 'WilsonRobert45' },
        { username: 'david', password: 'the_miller@23' }
    ];

    
    const products = [
        { id: 16, title: 'Embroidered Net Gown', brand: 'Manyavar', price: 62990, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-long-fork.png', category_id: 1, rating: 4 },
        { id: 24, title: 'Front Load Machine', brand: 'Samsung', price: 22490, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-washing-machine.png', category_id: 3, rating: 3 },
        { id: 33, title: "Collider Black Dial Men's Watch", brand: 'Fossil', price: 14995, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png', category_id: 2, rating: 4 },
        { id: 18, title: 'True Wireless Earbuds', brand: 'LG', price: 13499, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ear-buds.png', category_id: 3, rating: 4 },
        { id: 35, title: "Maritime Men's Watch", brand: 'Titan', price: 11999, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png', category_id: 2, rating: 3 },
        { id: 34, title: "Neutra Analog Men's Watch", brand: 'Fossil', price: 10995, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png', category_id: 2, rating: 4 },
        { id: 48, title: 'Monsters Charm Toy', brand: 'Trendytap', price: 8600, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png', category_id: 5, rating: 4 },
        { id: 31, title: 'Privateer Quartz Watch', brand: 'Fossil', price: 8122, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png', category_id: 2, rating: 3 },
        { id: 32, title: 'Chronograph black Watch', brand: 'Fossil', price: 6395, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-watch.png', category_id: 2, rating: 3 },
        { id: 22, title: 'Podcast Microphone', brand: 'MAONO', price: 5555, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-singing-mike.png', category_id: 3, rating: 3 },
        { id: 42, title: 'Virgin Avocado Oil', brand: 'ProV', price: 4144, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-oil.png', category_id: 4, rating: 4 },
        { id: 12, title: 'Wrap Dress', brand: 'Vero Moda', price: 3039, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-simple-formal.png', category_id: 1, rating: 3 },
        { id: 11, title: 'Warm Up Jacket', brand: 'Monte Carlo', price: 2796, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-sim-jacket.png', category_id: 1, rating: 2 },
        { id: 8, title: 'Slim Fit Blazer', brand: 'LEVIS', price: 2599, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-purple-jacket.png', category_id: 1, rating: 3 },
        { id: 4, title: "Men's Waistcoat", brand: 'LEVIS', price: 2500, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-jacket.png', category_id: 1, rating: 3 },
        { id: 14, title: 'Sheer Anarkali', brand: 'Saadgi', price: 2172, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-white-punjabi.png', category_id: 1, rating: 4 },
        { id: 20, title: 'SilverBullet Mixer Grinder', brand: 'COOKWELL', price: 1899, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-mixer-grinder-white.png', category_id: 3, rating: 3 },
        { id: 7, title: 'Zari Design Kurta', brand: 'Libas', price: 1869, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-punjabi.png', category_id: 1, rating: 3 },
        { id: 25, title: "Analog Men's Watch", brand: 'Fastrack', price: 1850, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-casual-watch.png', category_id: 2, rating: 2 },
        { id: 15, title: 'Embellished Maxi Dress', brand: 'STREET 9', price: 1799, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-blue-fork.png', category_id: 1, rating: 4 },
        { id: 21, title: 'PS5 Controller Charger', brand: 'New World', price: 1749, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ps5-controller.png', category_id: 3, rating: 3 },
        { id: 19, title: 'Mixer Grinder', brand: 'Lifelong', price: 1699, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-mixer-grinder.png', category_id: 3, rating: 3 },
        { id: 23, title: 'Dynamic Microphone', brand: 'JTS Store', price: 1699, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-solo-mike.png', category_id: 3, rating: 2 },
        { id: 26, title: 'Tea Kettle Pot', brand: 'Indian Art Villa', price: 1685, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-copper-kettle.png', category_id: 2, rating: 3 },
        { id: 52, title: 'Non-Toxic Robot Toys', brand: 'FunBlast', price: 1545, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-short-green-robot.png', category_id: 5, rating: 4 },
        { id: 5, title: 'Slim Fit Jeans', brand: 'LEVIS', price: 1469, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-jeans-pants.png', category_id: 1, rating: 3 },
        { id: 47, title: 'Panda Baby Product', brand: 'Panda', price: 1399, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-big-two-wheeler.png', category_id: 5, rating: 3 },
        { id: 17, title: 'Handheld Full Body Massager', brand: 'AGARO REGAL', price: 1299, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-body-massager.png', category_id: 3, rating: 4 },
        { id: 45, title: 'Turmeric Powder', brand: 'Patanjali', price: 1234, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-turmeric.png', category_id: 4, rating: 3 },
        { id: 30, title: 'Nova SuperGroom Multi-kit', brand: 'Nova', price: 1199, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-nover-v2-trimmer.png', category_id: 2, rating: 3 },
        { id: 9, title: 'Animal Printed Shirt', brand: 'Mufti', price: 1017, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-short-sleeves-shirt.png', category_id: 1, rating: 3 },
        { id: 13, title: 'Knit Cream Sweater', brand: 'MansiCollections', price: 996, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-stylish-sweater.png', category_id: 1, rating: 3 },
        { id: 6, title: 'Miss Chase Bodycon Dress', brand: 'LEVIS', price: 974, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-modren-net.png', category_id: 1, rating: 3 },
        { id: 37, title: 'Chilli Extract Sauce', brand: 'Everin', price: 788, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-extract.png', category_id: 4, rating: 3 },
        { id: 46, title: 'Batman Batmobile', brand: 'Funskool', price: 745, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-batman-toy.png', category_id: 5, rating: 3 },
        { id: 49, title: 'Knitted Rabbit', brand: 'Ira', price: 620, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-orange-rabbit.png', category_id: 5, rating: 3 },
        { id: 51, title: 'Kids Toy Train', brand: 'FIONA', price: 599, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-red-train.png', category_id: 5, rating: 3 },
        { id: 53, title: 'Honey Teddy Bear', brand: 'Honey', price: 599, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-simple-teddy.png', category_id: 5, rating: 4 },
        { id: 3, title: 'Cotton Hoodie', brand: 'Scott International', price: 498, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-hoodie.png', category_id: 1, rating: 3 },
        { id: 54, title: 'Nexa Yellow Car', brand: 'Quinergys', price: 490, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-yellow-car.png', category_id: 5, rating: 3 },
        { id: 10, title: 'Polyester Saree', brand: 'Ahalyaa', price: 419, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-side-sareee.png', category_id: 1, rating: 3 },
        { id: 27, title: 'Aluminium 4 Cup Tea Kettle', brand: 'Kitchen Expert', price: 399, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-kettle.png', category_id: 2, rating: 3 },
        { id: 29, title: 'Beard Trimmer', brand: 'Nova', price: 398, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-nova-trimmer.png', category_id: 2, rating: 3 },
        { id: 2, title: 'Plain Round Neck T-shirt', brand: 'Huetrap', price: 395, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-fit-t-shirt.png', category_id: 1, rating: 2 },
        { id: 28, title: 'Tripod Stand', brand: 'Sketchfab', price: 390, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-medium-tripod.png', category_id: 2, rating: 3 },
        { id: 50, title: 'Bot Robot Toy', brand: 'WireScorts', price: 355, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-orange-robot.png', category_id: 5, rating: 3 },
        { id: 1, title: 'Wide Bowknot Hat', brand: 'MAJIK', price: 288, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-cap.png', category_id: 1, rating: 2 },
        { id: 44, title: 'Crystal Sugar', brand: 'NatureVit', price: 278, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-sugar-cubes.png', category_id: 4, rating: 3 },
        { id: 43, title: 'Basmati Rice', brand: 'Fortune', price: 244, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-rice.png', category_id: 4, rating: 3 },
        { id: 38, title: 'Flour Unbleached', brand: 'TWF Store', price: 200, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery--flour.png', category_id: 4, rating: 3 },
        { id: 40, title: 'Maroon Kumkum ', brand: 'Amazon', price: 200, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery--kumkum.png', category_id: 4, rating: 2 },
        { id: 36, title: 'Eggs', brand: 'Naturoz', price: 60, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-eggs.png', category_id: 4, rating: 2 },
        { id: 41, title: 'Fresh Lemon, 100g', brand: 'Amazon', price: 50, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-lemons.png', category_id: 4, rating: 3 },
        { id: 39, title: 'Fresh Produce Green Chilli', brand: 'Amazon', price: 30, image_url: 'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-green-chilli.png', category_id: 4, rating: 3 }
    ];
    try {
        for (const user of users) {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        await db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, [user.username, hashedPassword]);
        }

        for (const product of products) {
        await db.run(
            `INSERT OR IGNORE INTO products (id, title, brand, price, image_url, category_id, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [product.id, product.title, product.brand, product.price, product.image_url, product.category_id, product.rating]
        );
        }
        console.log("Data Inserted Successfully.");
  } catch (error) {
        console.log("Error in inserting data:", error);
        throw error;
  }
}  

module.exports = insertedData