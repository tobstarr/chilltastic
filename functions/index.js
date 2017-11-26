process.env.DEBUG = 'actions-on-google:*';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('headers: ' + JSON.stringify(request.headers));
  console.log('body: ' + JSON.stringify(request.body));

  const text = request.body.result.resolvedQuery;
  const parameters = request.body.result.parameters;

  admin.database().ref('messages').push({
    name: 'Some name',
    text: text,
    parameters: parameters
  }).then(() => {
    // send json back
    // dialogflow sdk
    response.send("Good chilling!");
  });
});
