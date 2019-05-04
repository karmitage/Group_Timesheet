
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
// add a date format variable that handles start date inputs
var name = '';
var startDate = '';
var hourlyRate = 0;
var role = '';
var dateFormat = 'MM-DD-YYYY'


$("#search").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them in variables
    name = $("#name").val().trim();
    startDate = $("#date").val().trim();
    hourlyRate = $("#rate").val().trim();
    role = $("#role").val().trim();

    //this captures the "start date" field input (which is a string), stores it in 
    //the format specified by the "dateFormat" variable and displays it in that format
    //if we wanted, we could store it in one format and display it in another. but we're not going to do that.

    startDate = moment(startDate, dateFormat).format(dateFormat);

    // Console log each of the user inputs to confirm we are receiving them
    console.log(name);
    console.log(startDate);
    console.log(hourlyRate);
    console.log(role);


    // push data to our db
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

    // Console.logging data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.hourlyRate);

    //initialize variables for calculated display values
    var months = '';
    var total = '';

    //months worked is the difference in months between start date and current date
    //this diff function takes the current date (moment()) and calculates the diff
    //btw it and the startDate, formatted using our date format

    months = moment().diff(moment(sv.startDate, dateFormat), "months");
    console.log("number of months: " + months);

    //create a variable to hold the weekly rate
    var weeklyRate = parseInt(sv.hourlyRate) * 40;
    console.log("weekly rate is: " + weeklyRate);

    //assign total amount billed to the rate * the number of weeks since hire date
    total = weeklyRate * moment().diff(moment(sv.startDate, dateFormat), "weeks");
    console.log("total billed: " + total);

    //populate actual HTML elements
    var row = $("<tr>");
    var rowHeader = $("<th scope='row'>");
    row.append(rowHeader);

    rowHeader.text(sv.name);

    var col1 = $("<td id='role-display'>");
    var col2 = $("<td id='date-display'>");
    var col3 = $("<td id='rate-display'>");
    var col4 = $("<td id='months-display'>");
    var col5 = $("<td id='total-display'>");


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
