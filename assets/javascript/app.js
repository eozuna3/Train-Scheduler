// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD52N9rqsiyFDl7VzUhPrB6ulfjKYDwdOU",
  authDomain: "train-scheduler-482b9.firebaseapp.com",
  databaseURL: "https://train-scheduler-482b9.firebaseio.com",
  projectId: "train-scheduler-482b9",
  storageBucket: "train-scheduler-482b9.appspot.com",
  messagingSenderId: "12928780338",
  appId: "1:12928780338:web:ed8d0c42b70a25d691542b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$("#submit-btn").on("click", function (event) {
  event.preventDefault();
  
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = moment($("#first-train").val().trim(), "HH:mm");
  frequency = parseInt($("#frequency").val().trim());

  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(firstTrain.isValid());
  console.log(frequency);


  // database.ref().push({
  //   trainName: trainName,
  //   destination: destination,
  //   firstTrain: firstTrain,
  //   frequency: frequency,
  //   dateAdded: firebase.database.ServerValue.TIMESTAMP
  // });

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});