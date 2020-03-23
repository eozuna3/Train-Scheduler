# Train-Scheduler
This is my 7th assignment in which I created a Train Scheduler webpage. This assignement specifically utilized firebase database in order to store and retrieve information for populating a train schedule.  This assignment is my intital introduction into the use of databases for storing and retrieving information.

When the page initially loads the user is to enter text into text boxes regarding information about a train they wish to add to the list of trains.  When the user enters the information into the text boxes and submits the form.  The information is first checked to make sure that it is usable information and if not the user is alerted to incorrectly entered information and instructed to re-enter the information.  The text boxes are emptied after the user submits there information.  The information from the text boxes is then pushed to the firebase database.

Once the information is pushed to the database, it triggers an onchild_added event which will calculate the time when the next train arrives and figures out how long it is will be until the next train arrives.  It then dynamically corrects a new row for the train schedule table in which fills in all the information about the train entered and calculated.


Here is a link to the site -- https://eozuna3.github.io/Train-Scheduler/
