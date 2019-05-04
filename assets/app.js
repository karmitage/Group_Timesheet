
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCGbZ3IjeE643_1GNhrWqdlLKFPJU3FozQ",
    authDomain: "timesheet-f08da.firebaseapp.com",
    databaseURL: "https://timesheet-f08da.firebaseio.com",
    projectId: "timesheet-f08da",
    storageBucket: "timesheet-f08da.appspot.com",
    messagingSenderId: "88797544678"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Capture user inputs and store them into variables
var name = '';
var startDate = '';
var hourlyRate = 0;
var role = '';


$("#search").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    name = $("#name").val().trim();
    startDate = $("#date").val().trim();
    hourlyRate = $("#rate").val().trim();
    role = $("#role").val().trim();

    var randomDate =

        // Console log each of the user inputs to confirm we are receiving them
        console.log(name);
    console.log(startDate);
    console.log(hourlyRate);
    console.log(role);


    // Code for handling the push
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        hourlyRate: hourlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.hourlyRate);

    //Create html elements --could this be a function?

    // var row = $("<div class='row'>");

    // var col1 = $("<div class='col' id='name-display'>");
    // var col2 = $("<div class='col' id='role-display'>");
    // var col3 = $("<div class='col' id='date-display'>");
    // var col4 = $("<div class='col' id='rate-display'>");
    // var col5 = $("<div class='col' id='months-display'>");
    // var col6 = $("<div class='col' id='total-display'>");

    // var months = '';
    // var total = '';

    // col1.text(sv.name);
    // col2.text(sv.role);
    // col3.text(sv.startDate);
    // col4.text(sv.hourlyRate);
    // col5.text(months);
    // col6.text(total);

    // row.append(col1);
    // row.append(col2);
    // row.append(col3);
    // row.append(col4);
    // row.append(col5);
    // row.append(col6);

    // $("#displayResults").append(row);

    //new logic that references actual HTML elements

    var row = $("<tr>");
    var rowHeader = $("<th scope='row'>");
    row.append(rowHeader);

    rowHeader.text(sv.name);

    var col1 = $("<td id='role-display'>");
    var col2 = $("<td id='date-display'>");
    var col3 = $("<td id='rate-display'>");
    var col4 = $("<td id='months-display'>");
    var col5 = $("<td id='total-display'>");


    var months = '';
    var total = '';

    rowHeader.text(sv.name);
    col1.text(sv.role);
    col2.text(sv.startDate);
    col3.text(sv.hourlyRate);
    col4.text(months);
    col5.text(total);


    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);


    $("#displayResults").append(row);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
