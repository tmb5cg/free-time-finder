var inputCals = [];

var allStartTimes = [];
var allEndTimes = [];


// Fetches calendar IDs, creates checkboxes and adds event listener
// called on site load
function getCalendarIDs() {
  return gapi.client.calendar.calendarList.list({})
      .then(function(response) {
        localStorage.clear();


              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);

              console.log("YEEEET", response.result.items[0].id);


              var calendars = response.result.items;
              //appendPre('Upcoming events:');

              if (calendars.length > 0) {
                for (i = 0; i < calendars.length; i++) {
                  var cal = calendars[i];
                  var calName = cal.id;

                  console.log("Calendar: ", calName)

                  checkboxid = "checkbox";
                  id_from_input = checkboxid.concat(i);

                  var checkbox = document.createElement("input");
                  var checkboxlabel = document.createElement("Label");

                  checkbox.type = "checkbox";
                  checkbox.class = "checkbox";
                  checkbox.id = id_from_input;
                  checkbox.value = calName;
                  checkboxlabel.setAttribute("for",id_from_input);
                  checkboxlabel.innerHTML = calName

                  document.getElementById("checkboxes").appendChild(checkbox);
                  document.getElementById("checkboxes").appendChild(checkboxlabel);
                }

                // Add event listener to all checkboxes
                document.querySelector('#checkboxes').onclick = function(ev) {
                if(ev.target.value) {
                  console.log(ev.target.checked, ev.target.value);

                  // Store checkbox states in Local Storage
                  localStorage.setItem(ev.target.value, ev.target.checked);

                  fetchFreeBusy();
                  }
                }

              } else {
                appendPre('No upcoming events found.');
              }

            },
            function(err) { console.error("Execute error", err); });
}

// makes request to Google Calendar API, populates free busy global arrays
// called on button click. make it call on checkbxo state change
function fetchFreeBusy() {

  // Sets up inputCals local storage for input below
  pushCheckboxStatesToLocalStorage();

  // Gets input date from datebox
  inputDate = document.getElementById('startDateinput').value;
  inputDate = new Date(inputDate);

  inputDate2 = document.getElementById('endDateinput').value;

  if (inputDate2.length > 2) {
    // This means we have an end date
    inputDate2 = new Date(inputDate2);
    inputDate2.setHours(inputDate2.getHours()+20);

    document.getElementById('freetimesTitle2').innerHTML = inputDate2;
  } else {
    // This means we only want a singular date, so make inputDate2 the same as inputDate and add hours
    inputDate2 = new Date(inputDate);
    inputDate2.setHours(inputDate.getHours()+24);

  }

  document.getElementById('freetimesTitle').innerHTML = inputDate.toISOString();
  document.getElementById('freetimesTitle2').innerHTML = inputDate2.toISOString();

  // Format in ISO
  inputDate = inputDate.toISOString();
  inputDate2 = inputDate2.toISOString();

  return freeRequest = gapi.client.calendar.freebusy.query({

        items: inputCals,
        // 8 am EST to 6 pm EST
        // timeMin: "2020-12-07T05:00:00-00:00",
        // timeMax: "2020-12-07T23:00:00-00:00",
        // timeMin: "2020-12-21T05:00:00.000Z",
        // timeMax: "2020-12-21T23:00:00.000Z",
        timeMin: inputDate,
        timeMax: inputDate2,
        timeZone: "-0500",
    })


        .then(function(response) {
          console.log("Frebusy response: ", response);
          console.log("Frebusy response2: ", response.result);
          // console.log("Frebusy response3: ", response.result.calendars["evan@wgny.co"].busy[0]);
          console.log("array length: ", inputCals.length);


          for (k = 0; k < inputCals.length; k++) {
            var curCal = inputCals[k].id;
            console.log("Current calendar: ", curCal);
            console.log("Iteration: k = " + k)

            var busyTimes = response.result.calendars[curCal].busy;

            for (i = 0; i < busyTimes.length; i++){
              var busyBlock = busyTimes[i];
              console.log("Busy block for " + curCal, busyBlock);

              var startTime = busyBlock.start;
              var endTime = busyBlock.end;

              var data = {date: startTime};
              var data2 = {date: endTime};

              allStartTimes.push(data);
              allEndTimes.push(data2);

              // if startime - endtime greater than 6 hours ignore it (i.e. OOO)
            }
          }

          // I think .then(function(response)) adds the delay which is why it didn't work before
          consolidateAllBusyTimes();

        },
        function(err) { console.error("Execute error", err); });
}




// Pushes checkbox states to local storage
function pushCheckboxStatesToLocalStorage () {

    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        if(value == "true") {
          console.log(key + " => " + value);
          var cal = {id: key};
          inputCals.push(cal);
          console.log("Inputcals: ", inputCals)


        }
      }
}

// UGLY function parses busy times to return pretty time slots
function consolidateAllBusyTimes() {
      allStartTimes.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

    //    appendPre("- - - - - - - Sorting end times")

    allEndTimes.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c-d;
    });

      startTimes = allStartTimes;
      endTimes = allEndTimes;
//  consolidateAllBusyTimes(allStartTimes, allEndTimes);
    //appendPre("running this new method startTimes length: " + startTimes.length);
    var masterArray = [];
      for (x = 0; x < startTimes.length; x++){
        startTime = startTimes[x].date;
        endTime = endTimes[x].date;

        timeStartDateFormat = new Date(startTime);
        timeEndDateFormat = new Date(endTime);

        prettyStartTime = timeStartDateFormat.toLocaleString('en-US', { timeZone: 'EST' });
        prettyEndTime = timeEndDateFormat.toLocaleString('en-US', { timeZone: 'EST' });

        timecombo = [timeStartDateFormat, timeEndDateFormat];
        masterArray.push(timecombo);
      }
      // print OG array
    // //
    // appendPre("Original array");
    //   for (k=0; k<masterArray.length;k++){
    //     data = masterArray[k];
    //     start = data[0];
    //     end = data[1];
    //
    //     start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
    //     end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });
    //
    //     appendPre(k + " Start: " + start2 + " || End: " + end2);
    //   }
      // STEP 1 merge all same start times
      var newtimes = [];
      for (x = 0; x < masterArray.length; x++){
            var data = masterArray[x];

            var curstart = data[0].getTime();
            var curend = data[1].getTime();

            var latestend = curend;

            for (i = 0; i < masterArray.length; i++){
              var data2 = masterArray[i];

              var start2 = data2[0].getTime();
              var end2 = data2[1].getTime();
              if (curstart == start2) {
                    if (latestend < end2) {
                      latestend = end2;
                    }
              }
            }

            newtime = [curstart, latestend];

            var shouldWeAddIt = true;
            for (k=0; k<newtimes.length;k++){
              data = newtimes[k];
              start = data[0];
              end = data[1];

              if (start == curstart){
                if (end == latestend) {
                  shouldWeAddIt = false;
                }
              } else {
              }
            }

            if (shouldWeAddIt){
              newtimes.push(newtime);
            }
        }

        // print OG array
      //
      // appendPre("Merging same start times");
      //   for (k=0; k<newtimes.length;k++){
      //     data = newtimes[k];
      //     start = data[0];
      //     end = data[1];
      //
      //     start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
      //     end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });
      //
      //     appendPre(k + " Start: " + start2 + " || End: " + end2);
      //   }

      // STEP 2  Remove times within larger time blocks
      var newertimes = [];
      for (x = 0; x < newtimes.length; x++){
            var data = newtimes[x];

            var curstart = data[0]
            var curend = data[1]
            var latestend = curend;

            var shouldAdd = true;
            for (i = 0; i < newtimes.length; i++){
              var data2 = newtimes[i];
              var start2 = data2[0]
              var end2 = data2[1]

              if (start2 < curstart) {
                if (end2 > curend){
                  shouldAdd = false;
                }
              }

            }

            newtime = [curstart, curend];

            if (shouldAdd) {
              newertimes.push(newtime);
            }
        }


            // STEP 2 printing results
          //  appendPre("TIMES WITH OVERLAPPING BLOCKS REMOVED: " + newertimes);
            for (k=0; k<newertimes.length;k++){
              data = newertimes[k];
              start = data[0];
              end = data[1];

              start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
              end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });

            }

        // STEP  3 FINAL STEP - consolidate back to back events
        var newesttimes = [];
        var removedtimes = [];
        for (x = 0; x < newertimes.length; x++){
              var data = newertimes[x];

              var curstart = data[0];
              var curend = data[1];

              for (i = 0; i < newertimes.length; i++){
                var data2 = newertimes[i];

                var start2 = data2[0];
                var end2 = data2[1];

                if (curend > start2){
                  if (curend < end2) {
                    newtime = [curstart, end2];
                    newesttimes.push(newtime);
                    removedtimes.push([curstart,curend]);
                    removedtimes.push([start2, end2]);
                  }
                }
          }
        }

            // STEP 3 printing results
            for (k=0; k<newesttimes.length; k++){
              data = newesttimes[k];
              start = data[0];
              end = data[1];

              start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
              end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });

            }

            // more printing results
            for (k=0; k<removedtimes.length; k++){
              data = removedtimes[k];
              start = data[0];
              end = data[1];

              start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
              end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });
            }

          // Adding consolidated times together, finishing up etc
          var finaltimes = [];
          for (k=0; k < newertimes.length; k++){
            data = newertimes[k];
            start = data[0];
            end = data[1];

            var shouldWeAddIt = true;

            for (x=0; x < removedtimes.length; x++){
                  data2 = removedtimes[x];
                  start2 = data2[0];
                  end2 = data2[1];

                  if (start2 == start) {
                    if (end2 == end) {
                      shouldWeAddIt = false;
                    }
                    }
              }

            if (shouldWeAddIt == true) {
              finaltimes.push(data);
            }
         }

       for (k=0; k<finaltimes.length; k++){
         data = finaltimes[k];
         start = data[0];
         end = data[1];

         start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
         end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });

       }

       for (k=0; k<newesttimes.length; k++){
         data = newesttimes[k];
         finaltimes.push(data);
       }

       for (k=0; k<finaltimes.length; k++){
         data = finaltimes[k];
         start = data[0];
         end = data[1];

         start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
         end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });

       }

       var allstarttimes3 = [];
       var allendtimes3 = [];
       for (k=0; k<finaltimes.length; k++){
         data = finaltimes[k];
         start = data[0];
         end = data[1];

         allstarttimes3.push(start);
         allendtimes3.push(end);
       }

      allstarttimes3.sort(function(a, b){return a-b});
      allendtimes3.sort(function(a, b){return a-b});

      var finalmasterArray = [];

        for (x = 0; x < allstarttimes3.length; x++){
          startTime = allstarttimes3[x];
          endTime = allendtimes3[x];

          timeStartDateFormat = new Date(startTime);
          timeEndDateFormat = new Date(endTime);

          prettyStartTime = timeStartDateFormat.toLocaleString('en-US', { timeZone: 'EST' });
          prettyEndTime = timeEndDateFormat.toLocaleString('en-US', { timeZone: 'EST' });

          timecombo = [timeStartDateFormat, timeEndDateFormat];
          finalmasterArray.push(timecombo);
        }

        printPrettyTimeslots(allstarttimes3, allendtimes3, finalmasterArray);

  }

// Takes consolidated calendar and returns time slots

function printPrettyTimeslots(allstarttimes3, allendtimes3, finalmasterArray){
    var awesomeArray = [];
    for (x = 0; x < finalmasterArray.length-1; x++){
          var times = finalmasterArray[x];
          var curstart = times[0];
          var curend = times[1];

          var times = finalmasterArray[x+1];

          var nextstart = times[0];
          var nextend = times[1];


          if (x==0) {
            // First element, subtract from 8am
            eightAm = new Date(curstart);

            eightAm.setHours(8);
            eightAm.setMinutes(0);
            eightAm.setSeconds(0);

            eightAm = eightAm.getTime();
            eightAm = new Date(eightAm);

            diff = curstart - eightAm;

            if (diff > 0) {
              beginfreeslot = eightAm;
              eightAm = eightAm.getTime();
              endfreeslot = eightAm + diff;
// console.log("morning begin free slot (should be 8am): " + beginfreeslot);
// console.log("morning diff should be 30 mins: " + diff);
//
// console.log("morning end free slot (should be 830am): " + endfreeslot);
              prettyStart = new Date(beginfreeslot);
              prettyEnd = new Date(endfreeslot);

              prettyStartTime = prettyStart.toLocaleString('en-US', { timeZone: 'EST' });
              prettyEndTime = prettyEnd.toLocaleString('en-US', { timeZone: 'EST' });

              splitStart = prettyStartTime.split(" ");
              splitEnd = prettyEndTime.split(" ");

              ogStart = splitStart[1];
              ogEnd = splitEnd[1];
              awesomeArray.push([prettyStart, prettyEnd]);
            }



            // final else statement is skipped on first element due to bad code
            // copying and pasting the else so it will hit, then it will
            // add the end time
            diff = nextstart - curend;

            if (diff > 0) {
              beginfreeslot = curend;
              endfreeslot = nextstart + diff;
              console.log("correct begin free slot: " + beginfreeslot);
              console.log("correct diff " + diff);

              console.log("correct end slot: " + endfreeslot);
              prettyStart = new Date(beginfreeslot);
              prettyEnd = new Date(endfreeslot);

              prettyStartTime = prettyStart.toLocaleString('en-US', { timeZone: 'EST' });
              prettyEndTime = prettyEnd.toLocaleString('en-US', { timeZone: 'EST' });

              splitStart = prettyStartTime.split(" ");
              splitEnd = prettyEndTime.split(" ");

              ogStart = splitStart[1];
              ogEnd = splitEnd[1];
              awesomeArray.push([prettyStart, prettyEnd]);
            }

          }

          else if (x == finalmasterArray.length-2){
            // final else statement is skipped on last element due to bad code
            // copying and pasting the else so it will hit, then it will
            // add the end time
            diff = nextstart - curend;

            if (diff > 0) {
              beginfreeslot = curend;
              endfreeslot = nextstart + diff;
              console.log("correct begin free slot: " + beginfreeslot);
              console.log("correct diff " + diff);

              console.log("correct end slot: " + endfreeslot);
              prettyStart = new Date(beginfreeslot);
              prettyEnd = new Date(endfreeslot);

              prettyStartTime = prettyStart.toLocaleString('en-US', { timeZone: 'EST' });
              prettyEndTime = prettyEnd.toLocaleString('en-US', { timeZone: 'EST' });

              splitStart = prettyStartTime.split(" ");
              splitEnd = prettyEndTime.split(" ");

              ogStart = splitStart[1];
              ogEnd = splitEnd[1];
              awesomeArray.push([prettyStart, prettyEnd]);
            }

            // Proceed to add final end of day -> 8 pm time slot
            sevenPm = new Date(curend);

            sevenPm.setHours(8+12);
            sevenPm.setMinutes(0);
            sevenPm.setSeconds(0);

            nextend = nextend.getTime()

            diff = sevenPm - nextend;

            if (diff > 0) {
              // nextend = nextend.getTime()
              beginfreeslot = nextend;
              endfreeslot = nextend + diff;

              prettyStart = new Date(beginfreeslot);
              prettyEnd = new Date(endfreeslot);

              prettyStartTime = prettyStart.toLocaleString('en-US', { timeZone: 'EST' });
              prettyEndTime = prettyEnd.toLocaleString('en-US', { timeZone: 'EST' });

              splitStart = prettyStartTime.split(" ");
              splitEnd = prettyEndTime.split(" ");

              ogStart = splitStart[1];
              ogEnd = splitEnd[1];
              awesomeArray.push([prettyStart, prettyEnd]);
            }


          }
          else {
              diff = nextstart - curend;

              if (diff > 0) {
                beginfreeslot = curend;
                endfreeslot = nextstart + diff;
                console.log("correct begin free slot: " + beginfreeslot);
                console.log("correct diff " + diff);

                console.log("correct end slot: " + endfreeslot);
                prettyStart = new Date(beginfreeslot);
                prettyEnd = new Date(endfreeslot);

                prettyStartTime = prettyStart.toLocaleString('en-US', { timeZone: 'EST' });
                prettyEndTime = prettyEnd.toLocaleString('en-US', { timeZone: 'EST' });

                splitStart = prettyStartTime.split(" ");
                splitEnd = prettyEndTime.split(" ");

                ogStart = splitStart[1];
                ogEnd = splitEnd[1];
                awesomeArray.push([prettyStart, prettyEnd]);
              }
            }
    }

    // Remove old elements in list
    thelist = document.getElementById("myList");
    while( thelist.firstChild ){
      thelist.removeChild( thelist.firstChild );
    }
    for (x = 0; x < awesomeArray.length; x++){
      var times = awesomeArray[x];
      var curstart = times[0];
      var curend = times[1];

      curstartString = String(curstart);
      curendString = String(curend);
      // createPrettyList(curstart, curend);
      // appendPre("[inputDate]: " + curstart + " to " + curend);
//

      startstring = curstart.toLocaleString('en-US', { timeZone: 'EST',  timeStyle: "short", dateStyle: "short" });
      endstring = curend.toLocaleString('en-US', { timeZone: 'EST',  timeStyle: "short", dateStyle: "short" });

      startstringsplit = curstartString.split(" ");
      pretty_dayofweek = startstringsplit[0]
      month = curstart.getMonth() + 1;
      day = curstart.getDate();

      startstringsplit2 = startstring.split(" ");
      pretty_starttime = startstringsplit2[1] + " " + startstringsplit2[2];
      endstringsplit2 = endstring.split(" ");
      pretty_endtime = endstringsplit2[1] + " " + endstringsplit2[2];

      prettystring = (pretty_dayofweek + " " + month + "/" + day + ": " + pretty_starttime + " to " + pretty_endtime);
      console.log(prettystring);


      var node = document.createElement("LI");
      //var textnode = document.createTextNode("[inputDate]: " + curstart +  " to " + curend);
      var textnode = document.createTextNode(prettystring)
      node.appendChild(textnode);
      document.getElementById("myList").appendChild(node);

    }
}

// html is static text. javascript is what talks to the objects and says
// hey now youre going to display what i want instead
// function createPrettyList(freeStart, freeEnd) {
//   var node = document.createElement("LI");
//   var textnode = document.createTextNode("[inputDate]: " + freeStart +  " to " + freeEnd);
//   node.appendChild(textnode);
//   document.getElementById("myList").appendChild(node);
// }

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
