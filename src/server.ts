import "dotenv/config"
import express from "express";

const app = express();

// mount the frontend
app.use(express.static("frontend/build"));

// parse requests of content-type - application/json
app.use(express.json());

const port = process.env.PORT; // default port to listen

// define a route handler for the default home page
app.get( "/api/hello", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );