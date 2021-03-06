const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");

const admin = require("firebase-admin");

require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
if (!admin.apps.length) {
  admin.initializeApp(config);
}
var db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

const api = functions.https.onRequest(app);

module.exports = {
  api,
};

app.post("/users", async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .add({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        inventory: req.body.inventory,
        colour: req.body.colour,
        size: req.body.size,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    console.log(user);

    const updatedArticleInfo = await db
      .collection("users")
      .findOne({ name: req.body.name });

    res.status(200).json(updatedArticleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});

app.get("/api/drivers/:uid", async (req, res) => {
  db.collection("drivers")
    .doc(req.params.uid)
    .get()
    .then((doc) => {
      console.log("Document data:", doc.data());
      res.status(200).send(doc.data());
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.status(500).json({ message: "Error!" });
    });
});

app.post("/api/drivers/add", async (req, res) => {
  try {
    console.log(req.body);

    const user = await db
      .collection("drivers")
      .doc(req.body.uid)
      .set({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        whatsappNumber: req.body.whatsappNumber,
        cellNumber: req.body.cellNumber,
        postalCode: req.body.postalCode,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});
