# Full-Stack E-Commerce Application

## Overview
This is a full-stack E-Commerce web application built with React for the frontend and Node.js with Express for the backend, using SQLite as the database. The app starts with a user registration page. Existing users can log in directly. After login, users are directed to the home page featuring a header for navigation.

## Features
- **User Authentication:** Secure registration and login with JWT-based authentication.
- **Navigation:** Header with options to navigate between Home, Products, and Cart.
- **Product Listing:** Products displayed on the Products page with details on selecting a product.
- **Product Details:** Detailed view of a selected product with an option to add it to the cart.
- **Shopping Cart:** Users can add products to their cart; cart data is saved persistently using localStorage.
- **Cart Management:** Cart items remain until explicitly removed by the user.

## Technologies Used
- **Frontend:** React (class components), React Router
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Authentication:** JWT, bcrypt for password hashing
- **State Persistence:** localStorage syncing with React state

## Project Structure
- `frontend/` — React application
- `backend/` — Express server with APIs and database integration

## API Endpoints
- User authentication (signup, login) with JWT issuance.
- CRUD operations for products.
- Cart management APIs (add item, get cart items, delete single item, clear cart).


##
Install backend dependencies and start server:

cd backend
npm install
npm start
##
Install frontend dependencies and start development server:

cd ../frontend
npm install
npm start


4. Access the app at `http://localhost:3000`. The backend server runs on port 5000 by default.

## Deployment

- Frontend and backend can be deployed separately.
- Frontend is deployed as a static site (build folder).
- Backend is deployed as a web service listening on a dynamic port.
- Remember to configure environment variables like JWT secret and database path in the deployment environment.

## Important Notes

- Cart items are stored in localStorage for persistence across sessions.
- JWT tokens are used to protect backend routes.
- Make sure to update frontend API URLs according to the deployed backend service.
- Backend listens on `process.env.PORT` for compatibility with cloud hosting.

## Contributing

Feel free to raise issues or submit pull requests to improve functionality.


