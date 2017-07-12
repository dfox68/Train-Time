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
var database = firebase.database();
//global variables
var trainName;
var destination;
var firstTrain;
var frequency;
var nextArrival;
var diffTime;
var tRemainder;
var tMinutesTillTrain;

$(document).ready(function() {

      $(".form-control").val("");

      $("#add-train").on("click", function(event) {
        event.preventDefault();

        //variables to store user input
        trainName = $("#trainName-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#firstTrainTime-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,
          nextArrival: nextArrival,
          tMinutesTillTrain: tMinutesTillTrain
        });
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
        var p = $("<tr class='myRow'>" + "<td class='col-lg-2'>" + childSnapshot.val().trainName + "</td>" +
          "<td class='col-lg-2'>" + childSnapshot.val().destination + "</td>" +
          "<td class='col-lg-2'>" + childSnapshot.val().frequency + "</td>" +
          "<td class='col-lg-2'>" + childSnapshot.val().nextArrival + "</td>" +
          "<td class='col-lg-2'>" + childSnapshot.val().tMinutesTillTrain + "</td></tr>");
        $("#tableRow").append(p);
      });

});
