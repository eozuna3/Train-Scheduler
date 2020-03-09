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

$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  //Create storage variables
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  var momentTime = "";
  
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  momentObject = moment($("#first-train").val().trim(), "HH:mm");
  frequency = parseInt($("#frequency").val().trim());

  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(momentObject);
  console.log(momentObject.isValid());
  console.log("CORRECTED TIME: " + moment(momentObject).format("HH:mm"));
  console.log(frequency);

  if (!momentObject.isValid() || isNaN(frequency)) {
    alert ("The information entered into the First Train Time and/or Frequency text boxes were not valid entries.  Please enter appropriate information into each of the text boxes.");
    $("#first-train").val("");
    $("#frequency").val("");
  } else {

  database.ref().push({
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency,
  dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clears all of the text-boxes
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
  var first = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().frequency;

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(dest),
    $("<td>").text(freq),
  );

  $("#current-trains").append(newRow);

});