process.env.DEBUG = 'actions-on-google:*';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('headers: ' + JSON.stringify(request.headers));
  console.log('body: ' + JSON.stringify(request.body));

  var text = request.body.result.resolvedQuery;
  const parameters = request.body.result.parameters;
  const sessionId = request.body.sessionId;

  text = new Date().toLocaleTimeString() + " " + text;

  admin.database().ref('messages').push({
    name: parameters['given-name'] || 'Unkown',
    text: text,
    parameters: parameters,
    session: sessionId,
  }).then(() => {
    // send json back
    // dialogflow sdk
    var res = {
       "speech": "Good chilling",
       "displayText": "Good chilling",
       "source": "Chilltastic"
    };
    response.set('Content-Type', 'application/json');
    response.send(JSON.stringify(res));
  });
});
