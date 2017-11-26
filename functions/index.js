process.env.DEBUG = 'actions-on-google:*';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Assistant = require('actions-on-google').ApiAiAssistant;

admin.initializeApp(functions.config().firebase);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('headers: ' + JSON.stringify(request.headers));
  console.log('body: ' + JSON.stringify(request.body));

  const assistant = new Assistant({request: request, response: response});

  admin.database().ref('messages').push({
    name: 'Some name',
    text: 'I am chilling!'
  }).then(() => {
    // send json back
    // dialogflow sdk
    response.send("Good chilling!");
  });
});
