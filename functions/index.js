const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const app = express();
// const firebase = require("firebase");
// require("firebase-admin/firestore");

// const firestore = require("firebase-firestore");
app.use(cors({ origin: true }));

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

const api = functions.runWith(runtimeOpts).https.onRequest(app);

var deliveries = [];
deliveries.push({
  city: "Toronto",
  id: "1",
  number: "270",
  phone: "647-502-6573",
  portions: "3",
  postalCode: "M2M 4A6",
  street: "Goldenwood Road",
});
deliveries.push({
  city: "Toronto",
  id: "2",
  number: "270",
  phone: "647-502-6573",
  portions: "3",
  postalCode: "M2M 4A6",
  street: "Goldenwood Road",
  notes: "thank you thank you thank you",
});
deliveries.push({
  city: "Toronto",
  id: "3",
  number: "270",
  phone: "647-502-6573",
  portions: "3",
  postalCode: "M2M 4A6",
  street: "Goldenwood Road",
});
deliveries.push({
  city: "Toronto",
  id: "1",
  number: "270",
  phone: "647-502-6573",
  portions: "3",
  postalCode: "M2M 4A6",
  street: "Goldenwood Road",
});
deliveries.push({
  city: "Toronto",
  id: "1",
  number: "270",
  phone: "647-502-6573",
  portions: "3",
  postalCode: "M2M 4A6",
  street: "Goldenwood Road",
});
deliveries.push({
  city: "Toronto",
  id: "1",
  number: "270",
  phone: "647-502-6573",
  portions: "3",
  postalCode: "M2M 4A6",
  street: "Goldenwood Road",
});
const config = {
  apiKey: "AIzaSyA_g3NGl1fswGiAn028Rq8VfRlqLZHA_1c",
  authDomain: "isijniyaz.firebaseapp.com",
  projectId: "isijniyaz",
  storageBucket: "isijniyaz.appspot.com",
  messagingSenderId: "575752581167",
  appId: "1:575752581167:web:5cb8b2e65175a906b816da",
};
if (!admin.apps.length) {
  admin.initializeApp();
}
var db = admin.firestore();

module.exports = {
  api,
};

app.get("/api/routes/:date/:id", async (req, res) => {
  db.collection("events")
    .doc(req.params.date)
    .collection("routes")
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

app.put("/api/drivers/signup", async (req, res) => {
  try {
    const user = await db
      .collection("events")
      .doc("ramadhan")
      .collection("ramadhanEvents")
      .where("drivers", "array-contains", req.body.uid)
      .get()
      .then(function (linkPagesRef) {
        linkPagesRef.forEach(function (doc) {
          doc.ref.update({
            drivers: admin.firestore.FieldValue.arrayRemove(req.body.uid),
          });
        });
      });

    for (var i = 0; i < req.body.ramadhan.length; i++) {
      const user = await db
        .collection("events")
        .doc("ramadhan")
        .collection("ramadhanEvents")
        .doc(req.body.ramadhan[i].substring(0, 10))
        .update({
          drivers: admin.firestore.FieldValue.arrayUnion(req.body.uid),
        });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});

db.collection("events").doc("2021-03-11").set({ index: 0 });

db.collection("events").doc("2021-03-11").collection("routes").doc("3").set({
  index: 0,
  deliveries: deliveries,
});

app.post("/api/routes/add", async (req, res) => {
  try {
    const event = await db
      .collection("events")
      .doc(req.body.date)
      .set({ index: 0 });

    const route = await db
      .collection("events")
      .doc(req.body.date)
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

    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});
