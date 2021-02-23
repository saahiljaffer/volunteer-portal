import React from "react";

const getFirebaseConfig = new Promise((resolve, reject) => {
  fetch(`/__/firebase/init.json`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));
});

export default getFirebaseConfig;
