var firebaseConfig = {
    apiKey: "AIzaSyDfU_eimUWsMsRxLMaBtI9v6pSMekzy8i4",
    authDomain: "train-time-2191d.firebaseapp.com",
    databaseURL: "https://train-time-2191d.firebaseio.com",
    projectId: "train-time-2191d",
    storageBucket: "",
    messagingSenderId: "889835667531",
    appId: "1:889835667531:web:89bc8218cee6c89e"


};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    var newTrain = {
        myTrainname: trainName,
        Mydestination: destination,
        MyfirstTrainTime: firstTrainTime,
        Myfrequency: frequency

    }

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().myTrainname;
    var destination = childSnapshot.val().Mydestination;
    var firstTime = childSnapshot.val().MyfirstTrainTime;
    var tFrequency = childSnapshot.val().Myfrequency;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
   


    var currentTime = moment();
   
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % tFrequency;
   
    var tMinutesTillTrain = tFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    $("#current-train-time").append("<tr><th>" +
        trainName + "</th> <th>" + destination + "</th> <th>" +
        tFrequency + "</th> <th>" + moment(nextTrain).format("HH:mm") +
        "</th> <th>" + tRemainder + "</th></tr>"
    )
});
