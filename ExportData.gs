function exportEventsToMongoDB() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Data");
  var headerRows = 1;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange(); // determine the range of populated data
  var numRows = range.getNumRows(); // get the number of rows in the range
  var data = range.getValues(); // get the actual data in an array data[row][column]
  
  for (var i=headerRows; i<numRows; i++) {
    var eventIdCell = range.getCell(i+1, 1);
    var startDate = data[i][2];
    // Make a POST request with form data.
    j=1
    var formData = {
    'startDate' : data[i][j++],
    'businessID.id' : data[i][j++],
    'businessID.jobProfiles' : data[i][j++],
    'checkList' :  data[i][j++],
    'city.id'  : data[i][j++],
    'city.name' : data[i][j++],
    'city.stateId' : data[i][j++],
    'createdAt' : data[i][j++],
    'createdBy': data[i][j++],
    'dropMessage' : data[i][j++],
    'droppedDate' : data[i][j++],
    'gigOrderStatus' : data[i][j++],
    'gigerClientId' : data[i][j++],
    'gigerId' : data[i][j++],
    'gigerName' : data[i][j++],
    'isActive' : data[i][j++],
    'lastWorkingDate' : data[i][j++],
    'reportingLocation.name' : data[i][j++],
    'reportingLocation.stateId' : data[i][j++],
    'reportingLocation.type' : data[i][j++],
    'secondaryMobileNumber' : data[i][j++],
    'status' : data[i][j++]
    };
  var options = {
    'method' : 'post',
    'payload' : formData
  };
  if (startDate) {
    var insertID = UrlFetchApp.fetch('https://ap-south-1.aws.data.mongodb-api.com/app/gsheet-vvarr/endpoint/dataEntry', options);
    eventIdCell.setValue(JSON.parse(insertID.getContentText()).$oid); // Insert the new event ID

  }
  }
}

function removeEventsFromMongoDB() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Data");
  var headerRows = 1;  // Number of rows of header info (to skip)
  var range = sheet.getDataRange();
  var numRows = range.getNumRows();
  var data = range.getValues();
  
  for (var i=headerRows; i<numRows; i++) {
    // Cells are 1 indexed
    var eventIdCell = range.getCell(i+1, 1);
    // Make a POST request with form data.
    var formData = {
      '_id': data[i][0]
    };
    var options = {
      'method' : 'post',
      'payload' : formData
    };
    var insertID = UrlFetchApp.fetch('https://ap-south-1.aws.data.mongodb-api.com/app/gsheet-vvarr/endpoint/deleteData', options);
   if(JSON.parse(insertID.getContentText()).text)
    eventIdCell.setValue(""); // Insert the new event ID
    Logger.log(JSON.parse(insertID.getContentText()).text)
  }
}
function atEdit(e) {
  // Set a comment on the edited cell to indicate when it was changed.
  var rng = e.range;
  // range.setNote('Last modified: ' + new Date());
  var sheet = e.source.getActiveSheet();
  if (sheet.getName() == "Data") //"order data" is the name of the sheet where you want to run this script.
  {
    var actRng = sheet.getActiveRange();
    var editColumn = actRng.getColumn();
    var rowIndex = actRng.getRowIndex();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
    i = rowIndex-1

    j=0
    var range = sheet.getDataRange();
    var eventIdCell = range.getCell(i+1, 1);
    var data = range.getValues();
    var formData = {
    '_id' : data[i][j++],
    'startDate' : data[i][j++],
    'businessID.id' : data[i][j++],
    'businessID.jobProfiles' : data[i][j++],
    'checkList' :  data[i][j++],
    'city.id'  : data[i][j++],
    'city.name' : data[i][j++],
    'city.stateId' : data[i][j++],
    'createdAt' : data[i][j++],
    'createdBy': data[i][j++],
    'dropMessage' : data[i][j++],
    'droppedDate' : data[i][j++],
    'gigOrderStatus' : data[i][j++],
    'gigerClientId' : data[i][j++],
    'gigerId' : data[i][j++],
    'gigerName' : data[i][j++],
    'isActive' : data[i][j++],
    'lastWorkingDate' : data[i][j++],
    'reportingLocation.name' : data[i][j++],
    'reportingLocation.stateId' : data[i][j++],
    'reportingLocation.type' : data[i][j++],
    'secondaryMobileNumber' : data[i][j++],
    'status' : data[i][j++]
    };
    var add = 0
    Logger.log(formData._id)
    if(!formData._id){
      add = 1
      delete formData['_id'];
    }
    Logger.log(add)
    var options = {
    'method' : 'post',
    'payload' : formData
    };
    Logger.log(eventIdCell)
    if(add){
      var insertID = UrlFetchApp.fetch('https://ap-south-1.aws.data.mongodb-api.com/app/gsheet-vvarr/endpoint/dataEntry', options);
      eventIdCell.setValue(JSON.parse(insertID.getContentText()).$oid); // Insert the new event ID

      Logger.log('inside')
      Logger.log(insertID)
    }
    else{
      var insertID = UrlFetchApp.fetch('https://ap-south-1.aws.data.mongodb-api.com/app/gsheet-vvarr/endpoint/update', options);
      Logger.log(insertID) // Insert the new event ID
      Logger.log('nahi chala')
    }
  }

}
