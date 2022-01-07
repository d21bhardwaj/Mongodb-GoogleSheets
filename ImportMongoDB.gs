function myFunction() {
  var sh1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data")
  var getData = UrlFetchApp.fetch('https://ap-south-1.aws.data.mongodb-api.com/app/gsheet-vvarr/endpoint/gsheet_get').getContentText()
  var jsonData = JSON.parse(getData)
  var ts
  for(i=0;i<2;i++){
    j=1
    sh1.getRange(i+2,j++).setValue(jsonData[i]._id.$oid)
    sh1.getRange(i+2,j++).setValue(jsonData[i].startDate)
    sh1.getRange(i+2,j++).setValue(jsonData[i].businessID.id)
    sh1.getRange(i+2,j++).setValue(jsonData[i].businessID.jobProfiles)
    sh1.getRange(i+2,j++).setValue(jsonData[i].checkList)
    sh1.getRange(i+2,j++).setValue(jsonData[i].city.id)
    sh1.getRange(i+2,j++).setValue(jsonData[i].city.name)
    sh1.getRange(i+2,j++).setValue(jsonData[i].city.stateId)
    sh1.getRange(i+2,j++).setValue(jsonData[i].createdAt)
    sh1.getRange(i+2,j++).setValue(jsonData[i].createdBy)
    sh1.getRange(i+2,j++).setValue(jsonData[i].dropMessage)
    sh1.getRange(i+2,j++).setValue(jsonData[i].droppedDate)
    sh1.getRange(i+2,j++).setValue(jsonData[i].gigOrderStatus)
    sh1.getRange(i+2,j++).setValue(jsonData[i].gigerClientId)
    sh1.getRange(i+2,j++).setValue(jsonData[i].gigerId)
    sh1.getRange(i+2,j++).setValue(jsonData[i].gigerName)
    sh1.getRange(i+2,j++).setValue(jsonData[i].isActive)
    sh1.getRange(i+2,j++).setValue(jsonData[i].lastWorkingDate)
    sh1.getRange(i+2,j++).setValue(jsonData[i].reportingLocation.name)
    sh1.getRange(i+2,j++).setValue(jsonData[i].reportingLocation.stateId)
    sh1.getRange(i+2,j++).setValue(jsonData[i].reportingLocation.type)
    sh1.getRange(i+2,j++).setValue(jsonData[i].secondaryMobileNumber)
    sh1.getRange(i+2,j++).setValue(jsonData[i].status)
  }
}
