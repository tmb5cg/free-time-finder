var allBusyTimes = [];
var inputEmails;
var inputCals = [];


var unitmapping = {"days":24*60*60*1000,
                   "hours":60*60*1000,
                   "minutes":60*1000,
                   "seconds":1000};

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
  //console.log(getHumanizedDiff(new Date(start2) - new Date(end)));

          // print it
            for (q = 0; q < allBusyTimes.length; q++){
              time = allBusyTimes[q].date;
              appendPre(time);
            }
            appendPre("- - - - - - - Attempted sort:")

            allBusyTimes.sort(function(a, b) {
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c-d;
          });

          appendPre("- - - - - - - sort finished, now removing dupes:")

          uniqueArray = allBusyTimes.filter(function(item, pos) {
              return allBusyTimes.indexOf(item) == pos;
          })

          uniqueArray = allBusyTimes.filter(function(item, pos, self) {
              return self.indexOf(item) == pos;
          })
          console.log("are you confused?");

          console.log("haa", uniqueArray);
          appendPre("Pizzaaaaaaaaaaaaaaaa! " + uniqueArray);
          for (qas = 0; qas < uniqueArray.length-1; qas++){
              slot1 = uniqueArray[qas].date;
              slot2 = uniqueArray[qas+1].date;

                var f1 = new Date(slot1);
                var g1 = new Date(slot2);
                //var diff = f1-g1;

              var difference = diff_minutes(f1, g1);

                    if (difference > 60) {
                        appendPre("og date 1: " + f1);//.toLocaleString('en-US', { timeZone: 'EST' }));
                        appendPre("og date 2: " + g1);// .toLocaleString('en-US', { timeZone: 'EST' }));
                        appendPre("Difference: " + difference);
                    }

            }
          }




  //
  // time2 = uniqueArray[qas].date;
  // var difference = diff_minutes(g1, f1);
  //
  //       if (difference > 60) {
  //           appendPre("Pretty date 1:" + f1);//.toLocaleString('en-US', { timeZone: 'EST' }));
  //           appendPre("Pretty date 2: " + g1);// .toLocaleString('en-US', { timeZone: 'EST' }));
  //           appendPre("Difference: " + difference);
  //       }



// for (qasa = 0; qasa < allBusyTimes.length-1; qasa++){
//   slot1 = allBusyTimes[qasa].date;
//   slot2 = allBusyTimes[qasa+1].date;
//
//   casayouth = qasa+1;
//   appendPre("Slot " + qasa + "    " + slot1);
//   appendPre("Slot " + casayouth + "    " + slot2);
//
//   var f1 = new Date(slot1);
//   var g1 = new Date(slot2);
//   var diff = f1-g1;
//
//   var qasa2 = qasa+1;
//   // appendPre("Time " + qasa + ":   " +slot1);
//   // appendPre("Time " + qasa2 + ":   " +slot2);

// //  var difference = dateDiffInDays(g1, f1);
// var difference = diff_minutes(g1, f1);
//
//       if (difference > 60) {
//           appendPre("Pretty date 1:" + f1);//.toLocaleString('en-US', { timeZone: 'EST' }));
//           appendPre("Pretty date 2: " + g1);// .toLocaleString('en-US', { timeZone: 'EST' }));
//           appendPre("Difference: " + difference);
//       }
//
//   //appendPre("Difference: " + getHumanizedDiff(diff));


  // for (aa = 0; aa < allBusyTimes.length-1; aa++){
  //   timeOne = allBusyTimes[aa];
  //   timeTwo = allBusyTimes[aa+1]
  //
  //   allBusyTimes.sort((a,b)=>a.getTime()-b.getTime());
  //
  //
  // }
  // allBusyTimes.sort((a,b)=>a.getTime()-b.getTime());
  //
  // appendPre("- - - - - - - Attempted sort final:")
  // for (aa1 = 0; aa1 < allBusyTimes.length; aa1++){
  //   timeOne = allBusyTimes[aa1];
  //
  //   appendPre(timeOne);
  // }
  // // attempt to sort
//  allBusyTimes.sort(function(a,b){return a.getTime() - b.getTime()});
  //allBusyTimes.sort((a,b)=>a.getTime()-b.getTime());


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
        timeMin: "2020-12-17T00:00:00-00:00",
        timeMax: "2020-12-18T23:00:00-00:00",
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
              // appendPre(startTime);
              // appendPre(endTime);
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
