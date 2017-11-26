const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

  firebase.database().ref('messages').push({
    name: 'Some name',
    text: 'I am chilling!'
  });

  // response
  response.send("Hello from Firebase!");
});
