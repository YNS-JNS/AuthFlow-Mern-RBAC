const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const db = require("./app/models");


// ________________________________________________________________________________________________

const app = express();

// ________________________________________________________________________________________________

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware morgan
app.use(logger('dev'));

// ________________________________________________________________________________________________
// CORS:
const corsOptions = {
    // origin: "http://localhost:5173"
    origin: ["http://localhost:5173", "http://localhost:3000"]
}

app.use(cors(corsOptions));

// ________________________________________________________________________________________________
// Connect to MongoDB Atlas:


db.mongoose.connect(db.url).then(() => {
    console.log("Connect to database :)");
}).catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
});

// ________________________________________________________________________________________________
// Routes:



// ________________________________________________________________________________________________

// Todo: Configuration du port et démarrage du serveur :
// * Set port, listen for requests:
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port : http://localhost:${PORT}.`);
})