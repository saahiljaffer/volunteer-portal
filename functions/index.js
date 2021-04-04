const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const app = express();
const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};
const api = functions.runWith(runtimeOpts).https.onRequest(app);

// firebase config
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

//  function to retrieve a user's data
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

// function to create a new user
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

    res.status(500).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});

//  function to shuffle an array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  console.log(arr);
}

// returns the ramadhan signup data for ramadhan for a user
app.get("/api/ramadhan/:uid", async (req, res) => {
  console.log("hello");
  try {
    let today = new Date();
    const user = await db
      .collection("events")
      .doc("ramadhan")
      .collection("ramadhanEvents")
      .doc("2021-04-15")
      .get()
      .then((doc) => {
        let ind = doc.data().drivers.indexOf(req.params.uid);
        if (ind > -1 && ind < doc.data().numDrivers) {
          res.status(200).json({ date: "2021-04-15" });
        } else {
          res.status(200).json({ date: "empty" });
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});

// shuffle the array of drivers randomly
app.get("/api/ramadhanShuffle", async (req, res) => {
  console.log("hello");
  try {
    const user = await db
      .collection("events")
      .doc("ramadhan")
      .collection("ramadhanEvents")
      .doc("2021-04-15")
      .get()
      .then((doc) => {
        let arr = doc.data().drivers;
        shuffleArray(arr);
        res.status(200).json(arr);
        doc.ref.update({ drivers: arr });
      });
  } catch (error) {
    res.status(500).json({ message: "Error! ", error });
  }
});

// Put request that allows drivers to modify their ramadhan signup
app.put("/api/drivers/signup", async (req, res) => {
  try {
    console.log(req.body);
    // clear the existing array
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

    // update the array with any new values
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
