const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const db = require("./app/models");
const userRouter = require("./app/routes/user.routes")
const testRouter = require("./app/routes/test.routes")

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
    initial();
}).catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
});

// ________________________________________________________________________________________________
// Routes:

// test link 
app.get('/test', (req, res) => {
    res.send({ data: 'test from server!!!!' });
});

app.use("/api/user/auth", userRouter);
app.use("/api/user/test", testRouter);

// ________________________________________________________________________________________________

// Todo: Configuration du port et démarrage du serveur :
// * Set port, listen for requests:
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port : http://localhost:${PORT}.`);
});

// ________________________________________________________________________________________________

/**
    * @desc The estimatedDocumentCount() method is part of the Mongoose Query API and is used to estimate 
    the number of documents in a collection. It provides an approximate count of the documents using metadata, 
    which is faster than counting all documents in the collection.
    * Syntax:
    const MyModel = mongoose.model('MyModel', mySchema);
    MyModel.estimatedDocumentCount()
        .then((count) => {
            ...
        })
        .catch((err) => {
            console.error(err);
        });
    * visit @URL for more details:
    * @URL https://www.geeksforgeeks.org/mongoose-query-prototype-estimateddocumentcount-api/
*/

// TODO: initial() function helps us to create 3 important rows in roles collection:
const Role = db.role;
function initial() {
    Role.estimatedDocumentCount()
        .then((count) => {
            if (count === 0) {

                // Add user to roles collection
                new Role({ name: "user" }).save()
                    .then(() => console.log("added 'user' to roles collection"))
                    .catch(err => console.log("error creating initial user!", err));

                // Add admin  to roles collection
                new Role({ name: "admin" }).save()
                    .then(() => console.log("added 'admin' to roles collection"))
                    .catch(err => console.log("error creating initial admin!", err));

                // Add moderator to roles collection
                new Role({ name: "moderator" }).save()
                    .then(() => console.log("added 'moderator' to roles collection"))
                    .catch(err => console.log("error creating initial moderator!", err));
            }
        })
        .catch(err => console.log("error checking count in roles collection", err));
};