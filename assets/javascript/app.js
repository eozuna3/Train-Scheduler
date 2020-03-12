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
  var trainName  = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = parseInt($("#frequency").val().trim());

  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(moment($("#first-train").val().trim(), "HH:mm").isValid());
  console.log(frequency);

  if (!moment($("#first-train").val().trim(), "HH:mm").isValid() || isNaN(frequency) || trainName === "" || destination === "") {
    alert ("The one of the pieces of information entered into the text boxes is either missing or not valid entries.  Please enter appropriate information into each of the text boxes.");
    $("#train-name").val("");
    $("#destination").val("");
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
  var momentObject = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "days");
  var freq = childSnapshot.val().frequency;
  
  var diffTime = moment().diff(momentObject, "minutes");
  console.log(momentObject);
  console.log(diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % freq;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = freq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#current-trains").append(newRow);
  });