const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const app = express();
app.use(cors({ origin: true }));

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

const api = functions.runWith(runtimeOpts).https.onRequest(app);

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

module.exports = {
  api,
};

app.get("/api/routes/:id", async (req, res) => {
  db.collection("routes")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      res.status(200).send(doc.data());
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.status(500).json({ message: "Error!" });
    });
});

app.get("/api/drivers/:uid", async (req, res) => {
  db.collection("drivers")
    .doc(req.params.uid)
    .get()
    .then((doc) => {
      res.status(200).send(doc.data());
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.status(500).json({ message: "Error!" });
    });
});

app.post("/api/drivers/add", async (req, res) => {
  try {
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

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});

app.post("/api/routes/add", async (req, res) => {
  try {
    console.log(req.body);
    console.log("hello");

    const route = await db
      .collection("routes")
      .doc(req.body.id)
      .set({
        index: 0,
        deliveries: req.body.deliveries,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });

    console.log(route);

    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});
