// Initialize Firebase
var config = {
  apiKey: "AIzaSyDmivNCyACYtNyw1JWaMYMaUNXeXvc4QE8",
  authDomain: "train-time-531d5.firebaseapp.com",
  databaseURL: "https://train-time-531d5.firebaseio.com",
  projectId: "train-time-531d5",
  storageBucket: "",
  messagingSenderId: "597498409910"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var trainData = firebase.database();

$("#add-train").on("click", function(event) {
  event.preventDefault();

  //variables to store user input
  var trainName = $("#trainName-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrainTime-input")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");

  var frequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);

  return false;
});


//calculate when next train will arrive

//get current time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//get the first train time
// First Time (pushed back 1 year to make sure it comes before current time)
firstTrain = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTrain);

//get the difference between the times
diffTime = moment().diff(moment(firstTrain), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

//get time apart(remainder)
tRemainder = diffTime % frequency;
console.log("Remainder is: " + tRemainder);

tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//display data on webpage
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().trainName);
  var p = $(
    "<tr class='myRow'>" +
      "<td class='col-lg-2'>" +
      childSnapshot.val().trainName +
      "</td>" +
      "<td class='col-lg-2'>" +
      childSnapshot.val().destination +
      "</td>" +
      "<td class='col-lg-2'>" +
      childSnapshot.val().frequency +
      "</td>" +
      "<td class='col-lg-2'>" +
      childSnapshot.val().nextArrival +
      "</td>" +
      "<td class='col-lg-2'>" +
      childSnapshot.val().tMinutesTillTrain +
      "</td></tr>"
  );
  $("#tableRow").append(p);
});
