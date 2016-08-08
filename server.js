var express = require('express');
var moment = require('moment');
var url = require('url');
var app = express();

var testString = 754012800;
var naturalDate;

function getNaturalDate(val) {
var utcDate = new Date(val*1000);
var natMonth = utcDate.getMonth();
var natDay = utcDate.getDate();
var natYear = utcDate.getFullYear();
var natMonthString; 
switch(natMonth + 1) {
    case 1:
        natMonthString = "January";
        break;
    case 2:
        natMonthString = "February";
        break;
    case 3:
        natMonthString = "March";
        break;
    case 4:
        natMonthString = "April";
        break
    case 5:
        natMonthString = "May";
        break;
    case 6:
        natMonthString = "June";
        break;
    case 7:
        natMonthString = "July";
        break;
    case 8:
        natMonthString = "August";
        break;
    case 9:
        natMonthString = "September";
        break;
    case 10:
        natMonthString = "October";
        break;
    case 11: 
        natMonthString =  "November";
        break;
    case 12:
        natMonthString = "Decemeber";
        break;
    default:
        "null";
}
naturalDate = natMonthString + " " + natDay + ", " + natYear;
}

app.get('/:query', function (req, res) {
  var string = req.params.query;
  var reqString = string;
  var response = null;
  if (moment.unix(reqString).isValid() === true && !isNaN(reqString)) {
   console.log('Unix time was received');
   getNaturalDate(reqString);
   response = { 
     "Unix": reqString,
     "Natural": naturalDate };
  } else if (isNaN(reqString) && moment(new Date(reqString)).isValid()) {
     console.log('Natural date was received');
     var tempDate = new Date(reqString);
     var unixTime = (tempDate.getTime())/1000;
     response = { 
     "Unix": unixTime,
     "Natural": reqString };
  } else {
      console.log('Invalid input');
      response = { 
     "Unix": null,
     "Natural": null };
  }
  res.send(JSON.parse(JSON.stringify(response)));
  console.log('response was sent');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Date has been received');
});