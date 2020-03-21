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

// Function to calculate train times and post new row
function newRow(trainName, trainDest, trainFreq, trainTime){
  var momentObject = moment(trainTime, "HH:mm").subtract(1, "days");
  var diffTime = moment().diff(momentObject, "minutes");
  var tRemainder = diffTime % trainFreq;

  // Minutes Until Train Arrives
  var tMinutesTillTrain = trainFreq - tRemainder;

  // Next Train Calculation
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  //  Create a new row with the information enter and calculated
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(moment(nextTrain).format("LT")),
    $("<td>").text(tMinutesTillTrain),
  );
  
  // Append new row
  $("#current-trains").append(newRow);
}

//  Create initial rows as examples
newRow("Trenton Express", "Trenton", 30, "06:00");
newRow("Boston Bus", "Boston", 65, "07:15");

$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  //  Create storage variables
  var trainName  = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  
  //  Assign user input values to the created variable
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = parseInt($("#frequency").val().trim());

  // Check to make sure all appropriate information is entered into the text-boxes
  if (!moment($("#first-train").val().trim(), "HH:mm").isValid() || isNaN(frequency) || trainName === "" || destination === "") {
    alert ("The one of the pieces of information entered into the text boxes is either missing or not valid entries.  Please enter appropriate information into each of the text boxes.");
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  } else {

  // Push user input information to the firebase database
  database.ref().push({
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency,
  dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clears all of the user input text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
  }
});

database.ref().on("child_added", function(childSnapshot){
// Create storage variables
var name = childSnapshot.val().trainName;
var dest = childSnapshot.val().destination;
var freq = childSnapshot.val().frequency;
var time = childSnapshot.val().firstTrain;

newRow(name, dest, freq, time);
});