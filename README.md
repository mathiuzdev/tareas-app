# Application Documentation
## 1. Introduction
This application consists of two parts: a web client and a server. The client is developed with React and uses several modern libraries like Material UI, Formik, and Axios. The server is a REST API built with Node.js, Express, and Sequelize, which interacts with an SQLite database.

## 2. Client Usage
### Prerequisites
1. **Node.js** (recommended version: 16.x or higher)
2. **npm** or **yarn** for package management.

### Instructions to install and run the client
1. **Clone the client repository**:

    `git clone https://github.com/mathiuzdev/tasks-app`

    `cd client`
1. **Install dependencies**: Run the following command to install the necessary dependencies.

    `npm install`

    Or if you prefer to use yarn:

    `yarn install`
1. **Develop locally (Development mode)**: To start the development server and see the app in action, run:

    `npm run dev`

    Or if using yarn:
    
    `yarn dev`
1. **Open the application in the browser**: Once the development server is running, open your browser and go to [http://localhost:PORT/](http://localhost:PORT/).
1. **Build for production**: To create an optimized production-ready version of the app, run:

    `npm run build`

    Or if using yarn:

    `yarn build`

1. **Preview the production build**: If you want to preview how the application will look in production:

    `npm run preview`

    Or if using yarn

    `yarn preview`

## 3. Server Usage
### Prerequisites
1. **Node.js** (recommended version: 16.x or higher)
2. **npm** or **yarn** for package management.
3. **SQLite** as the database.

### Environment Variables Setup

This project uses environment variables to manage server configuration, database settings, and the JWT secret key.

Ensure you have a  `.env` file in the root of your project with the following variables:

```
JWT_SECRET=<secret-key> # Secret key for signing and verifying JWTs
DB_PATH=<database-path> # Path to the SQLite database (e.g., ./database.db)
PORT=<PORT>  # Port on which the server will run (e.g., 3000) 
NODE_ENV=<enviroment_mode> # Environment mode (e.g., development, production)
```
### Instructions to install and run the server
1.  **Clone the server repository**:

    `git clone https://github.com/mathiuzdev/tasks-app`

    `cd server`

1. **Install dependencies**: Run the following command to install the necessary dependencies:

    `npm install`

    Or if you prefer to use yarn:

    `yarn install`

1. **Start the server in development mode**: To start the server with hot-reloading, run:

    `npm run dev`

    Or if using yarn:

    `yarn dev`

The server will be available at [http://localhost:PORT/](http://localhost:PORT/).
1. **Start the server in production mode**: To run the server in production mode, first build the TypeScript files and then start the server:

    `npm run build`

    `npm start`

    Or if using yarn:

    `yarn build`

    `yarn start`

1. **Database Migrations**:  You can run migrations as follows. 
    To apply migrations:

    `npm run migrate`

    Or if using yarn:

    `yarn migrate`

    To revert migrations:

    `npm run migrate:undo`

    Or if using yarn:

    `yarn migrate:undo`

1. **Seed the database**: If you need to insert example data into the database:

    `npm run seed`

    Or if using yarn:

    `yarn seed`

## 4. Testing
#### Client
The client does not include tests in this setup, but you can use tools like Jest or React Testing Library to create unit or integration tests.
#### Server
The server includes tests with Jest. You can run the tests using the following command:

`npm run test`

Or if using yarn:

`yarn test`

## 5.  API Documentation

Access the interactive API documentation at the following URL:

[http://localhost:PORT/api](http://localhost:PORT/api) (SERVER)

From this page, you can explore all the API endpoints and test them directly from your browser.

![Screenshot de la documentación Swagger](https://media.discordapp.net/attachments/1129524430796767282/1306403103620202626/screencapture-localhost-3000-api-2024-11-13-20_37_55.png?ex=67368a33&is=673538b3&hm=2dbfa7d9a1ff50e57214ba061a558ead09fcc5185939022c1c3d0e07c57869fd&=&format=webp&quality=lossless&width=432&height=350)

## Authentication

To access most of the API endpoints, you need to authenticate using a JWT (JSON Web Token). You must include a valid token in the **JWT (JSON Web Token)**. You must include a valid token in the  `Authorization` header of your requests. 

### How to obtain and use the JWT token?

1. **Obtain your JWT token** by logging in (or through the authentication flow your API provides).
   
2. **Use the token in requests**: When making a request to any protected endpoint, add the token in the `Authorization` header like this:

    ```
    Authorization: Bearer <your-jwt-token>
    ```

### Example of authentication in Swagger UI

In the interactive Swagger documentation, you can easily test protected endpoints:

1. Go to [http://localhost:PORT/api](http://localhost:PORT/api).
2. At the top of the Swagger UI page, you'll find a button to **Authenticate** (Log in or similar).
3. Click the authentication button and enter your **JWT** in the provided field.
4. Once authenticated, you can make requests to endpoints that require authentication.

## Endpoints

The interactive documentation will allow you to see all available endpoints, their descriptions, and how to make requests. You will also be able to view the parameters required by each endpoint and the possible response codes.