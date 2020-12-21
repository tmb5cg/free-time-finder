var allBusyTimes = [];
var inputEmails;
var inputCals = [];

var allStartTimes = [];
var allEndTimes = [];

var masterDate;
var unitmapping = {"days":24*60*60*1000,
                   "hours":60*60*1000,
                   "minutes":60*1000,
                   "seconds":1000};

function isInArray(array, value) {
  return !!array.find(item => {return item.getTime() == value.getTime()});
}


function consolidateAllBusyTimes(startTimes, endTimes) {
// Assume input list is sorted by start time
// startTimessorted
// endTimes

// combine  the list:

appendPre("running this new method");
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


    // STEP 2
    //appendPre("TIMES WITH OVERLAPPING BLOCKS REMOVED: " + newertimes);
    for (k=0; k<newertimes.length;k++){
      data = newertimes[k];
      start = data[0];
      end = data[1];

      start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
      end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });

    }

    // STEP  3 FINAL STEP
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

    for (k=0; k<newesttimes.length; k++){
      data = newesttimes[k];
      start = data[0];
      end = data[1];

      start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
      end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });

    }

    for (k=0; k<removedtimes.length; k++){
      data = removedtimes[k];
      start = data[0];
      end = data[1];

      start2 = new Date(start).toLocaleString('en-US', { timeZone: 'EST' });
      end2 = new Date(end).toLocaleString('en-US', { timeZone: 'EST' });
    }

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

//    appendPre("FINISHED!!! allstarttimes3 and allendtimes3, also access altogether with finalmasterArray");

    var awesomeArray = [];
    for (x = 0; x < finalmasterArray.length-1; x++){
      var times = finalmasterArray[x];
      var curstart = times[0];
      var curend = times[1];

      var times = finalmasterArray[x+1];

      var nextstart = times[0];
      var nextend = times[1];

      diff = nextstart - curend;

      if (diff > 0) {
        appendPre("looks like theres a free slot here");

        beginfreeslot = curend;
        endfreeslot = nextstart + diff;

        prettyStart = new Date(beginfreeslot);
        prettyEnd = new Date(endfreeslot);

        prettyStartTime = prettyStart.toLocaleString('en-US', { timeZone: 'EST' });
        prettyEndTime = prettyEnd.toLocaleString('en-US', { timeZone: 'EST' });


        appendPre("FREE START: " + prettyStartTime);
        appendPre("FREE END: " + prettyEndTime);

        splitStart = prettyStartTime.split(" ");
        splitEnd = prettyEndTime.split(" ");

        ogStart = splitStart[1];
        ogEnd = splitEnd[1];
        awesomeArray.push([ogStart, ogEnd]);
      }

      // timeStartDateFormat = new Date(startTime);
      // timeEndDateFormat = new Date(endTime);
    }

    appendPre("AWESOME ARRAY you can paste into email:")
    appendPre("      ")
    appendPre("[userIDs] are available at the following time(s) on [inputDate]: ")

    for (x = 0; x < awesomeArray.length; x++){
      var times = awesomeArray[x];
      var curstart = times[0];
      var curend = times[1];

      appendPre("[inputDate]: " + curstart + " to " + curend);

    }



}



function floor(value)
{
    return Math.floor(value)
}

function getHumanizedDiff(diff)
{
    return floor(diff/unitmapping.days)+" days "+
           floor((diff%unitmapping.days)/unitmapping.hours)+" hours "+
           floor((diff%unitmapping.hours)/unitmapping.minutes)+" minutes "+
           floor((diff%unitmapping.minutes)/unitmapping.seconds)+" seconds "+
           floor((diff%unitmapping.seconds))+" milliseconds";
}
//                  1000 ms * 60 secs in a minute * 60 minutes in an hour * 24 hours in day
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  console.log("FULL YEAR", a.getFullYear());
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function diff_minutes(dt2, dt1)
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60);
  return Math.abs(Math.round(diff));

 }

// console.log(getHumanizedDiff(new Date("2018-09-16T00:18:00.000Z") - new Date("2018-09-04T00:20:02.630Z")));
// console.log(getHumanizedDiff(new Date("2018-09-17T00:16:04.000Z") - new Date("2018-09-14T00:20:12.240Z")));
function fn2 () {
      //      appendPre("- - - - - - - Sort all times:")

            allBusyTimes.sort(function(a, b) {
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c-d;
          });

      //    appendPre("- - - - - - - Sorting start times")

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

          //  appendPre("- - - - - - - sort finished, now removing dupes ALL TIMES:")

            allBusyTimes2 = allBusyTimes.filter(function(item, pos) {
                return allBusyTimes.indexOf(item) == pos;
            })

            allBusyTimes2 = allBusyTimes2.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })

    //        appendPre("- - - - - - - sort finished, now removing dupes Start Times:")

            allStartTimes2 = allStartTimes.filter(function(item, pos) {
                return allStartTimes.indexOf(item) == pos;
            })

            allStartTimes2 = allStartTimes2.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })

            //  appendPre("- - - - - - - sort finished, now removing dupes End Times:")

              allEndTimes2 = allEndTimes.filter(function(item, pos) {
                  return allEndTimes.indexOf(item) == pos;
              })

              allEndTimes2 = allEndTimes2.filter(function(item, pos, self) {
                  return self.indexOf(item) == pos;
              })

          //
          //
          //appendPre("- - - - - - - - Printing ALL times sorted array!! !!! ");
          for (yolo = 0; yolo < allBusyTimes2.length; yolo++){
            time = allBusyTimes2[yolo].date;
            timeDateFormat = new Date(time);
            prettyTime = timeDateFormat.toLocaleString('en-US', { timeZone: 'EST' });
          //  appendPre("SORTED All Times " + yolo + ": " + prettyTime);
          }

          //appendPre("- - - - - - - - Passing sorted starttimes and endttimes to new function");
          consolidateAllBusyTimes(allStartTimes2, allEndTimes2);
}

function fn1 () {

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


function myFunction() {
  return freeRequest = gapi.client.calendar.freebusy.query({

        items: inputCals,
        // 8 am EST to 6 pm EST
        timeMin: "2020-12-07T05:00:00-00:00",
        timeMax: "2020-12-07T23:00:00-00:00",
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
              allBusyTimes.push(data);
              allBusyTimes.push(data2);

              allStartTimes.push(data);
              allEndTimes.push(data2);

              // var starttime2 = new Date(data.date);
              // var endtime2 = new Date(data2.date);
              //
              // appendPre("Start time: " + starttime2.toLocaleString('en-US', { timeZone: 'EST' }));
              // appendPre("End time:   " + endtime2.toLocaleString('en-US', { timeZone: 'EST' }));
              //
              // allStartTimes.push(data);
              // allEndtimes.push(data2);
              // if startime - endtime greater than 6 hours ignore it (i.e. OOO)
            }
          }

          // var calendars2 = response.result.calendars;
          // if (calendars2.length > 0) {
          //   for (i = 0; i < calendars2.length; i++) {
          //     var usersCalendar = calendars2[i];
          //
          //     console.log("Users calendar (should be a list but i want the name)", usersCalendar);
          //     var busyTimes = usersCalendar.busy;
          //
          //     for (j = 0; j < busyTimes.length; j++) {
          //         var busyBlock = busyTimes[j];
          //         console.log("Busy block: ", busyBlock);
          //         }
          //       }
          //
          //   }


        },
        function(err) { console.error("Execute error", err); });
}




function getCalendarIDs() {
  return gapi.client.calendar.calendarList.list({})
      .then(function(response) {
        localStorage.clear();


              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);

              console.log("YEEEET", response.result.items[0].id);


              var calendars = response.result.items;
              appendPre('Upcoming events:');

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
                  }
                }


              } else {
                appendPre('No upcoming events found.');
              }

            },
            function(err) { console.error("Execute error", err); });
}
