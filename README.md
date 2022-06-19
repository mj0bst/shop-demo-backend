# Backend for demo shop

This project is a backend for a demo shop, containing a basic inventory management in the current state. It is built on Node.js, Typescript, Express and Sequelize.

## Configuration

The file .env contains a basic configuration template for the HTTP port and the DB connection. Supported options are:

| Variable    | Description                          |
|-------------|--------------------------------------|
| PORT        | http port the application will use   |
| DB_HOST     | the host where the database runs     |
| DB_PORT     | the port on which the database runs  |
| DB_USER     | the user for the database            |
| DB_PASSWORD | the password for DB_USER             |
| DB_NAME     | the name of the database             |
| DB_DIALECT  | DB dialect, only tested with mariadb |

For local development, the `NODE_ENV=development.local` can be used, enabling cors for calls from the frontend when it is launched separately via `npm start`.

## Building with Docker

First run `docker run build`, copy the build directory from the frontend to `frontend/build`, then run `docker build -t <your-image>:<your-tag>`. For running the image, you will need to specify a `.env` file either directly via the docker parameter `--env` or via the `NODE_ENV` environment variable. The application frontend and backend will run in one Node.js instance on the specified port. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.