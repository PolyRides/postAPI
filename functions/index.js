

const functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const exampleData = {
//   "data": [
//     {
//       "created_time": "2018-05-02T07:17:27+0000",
//       "message": "Offering  SLO -> SB Tomorrow (Friday) at 5 Returning Saturday afternoon",
//       "id": "64760994940_10156286273159941"
//     },
//     {
//       "created_time": "2018-04-27T15:02:16+0000",
//       "message": "Seeking Long Beach/OC to SLO this Friday 5/4 and back on Sunday 5/6! $$",
//       "id": "64760994940_10156275781939941"
//     },
//     {
//       "created_time": "2018-04-25T19:00:44+0000",
//       "message": "1 SPOT LEFT Offering: SLO---> San Jose  Leaving Friday after 1pm but returning Monday afternoon/evening $20 for gas",
//       "id": "64760994940_10156271716824941"
//     },
//     {
//       "created_time": "2018-04-24T17:26:58+0000",
//       "message": "Slo to SJ (Coleman Starbucks) / Pleasanton (Hacienda Starbucks) Wed 5/9 at 4:30pm $20",
//       "story": "Roger Federer added 4 new photos.",
//       "id": "64760994940_10156269183634941"
//     },
//     {
//       "created_time": "2018-04-23T12:16:21+0000",
//       "message": "Offering: SLO to SF Friday 5/4 @5:30pm leaving from campus Returning Sunday, 5/6 around 5 or 6pm Asking $25 for one way, $40 for roundtrip. I drive a big ole SUV so plenty of room for anything you need to bring up. Message me to save a spot :)",
//       "id": "64760994940_10156266059749941"
//     },
//   ]
// }

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var db = admin.database();
var ref = db.ref("/data");

// Data is sorted
exports.restAPI = functions.https.onRequest((request, response) => {
  ref.once("value", (data) => {
    let returnObj = [];
    let dataObj = data.val();
    console.log("dataObj: ", dataObj)
    let newObj = dataObj.sort((first, second) => {
      let firstUTC = Date.parse(first["created_time"]);
      let secondUTC = Date.parse(second["created_time"]);
      return secondUTC - firstUTC;
    })
    console.log("newObj: ", newObj)
    for (var key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        returnObj.push(newObj[key]);
      }
  }
    response.send({data: returnObj});
  })
});
