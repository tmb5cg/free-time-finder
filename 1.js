function fn1 () {
    alert();
}

var obj = {};

function myFunction() {
  var txt;
  if (confirm("Press a button!")) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
  document.getElementById("demo").innerHTML = txt;
}


function getCalendarIDs() {
  return gapi.client.calendar.calendarList.list({})
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);

              console.log("YEEEET", response.result.items[0].id)

              for (var i=0; i<response.result.items.length; i++) {
                  console.log("Yeet", response.result.items[i].id)

                  checkboxid = "checkbox"
                  id_from_input = checkboxid.concat(i)
                  var newlabel = document.createElement("Label");
                  newlabel.setAttribute("for",id_from_input);
                  newlabel.innerHTML = "Here goes the text";
                  parentDiv.appendChild(newlabel);


                  // checkboxid = "checkbox"
                  // finalstring = checkboxid.concat(i)
                  // document.getElementById(finalstring).innerHTML = test;

                }

              // obj = JSON.parse(response)
              // console.log("Response2", obj)
              //
              // entries = obj.items

            //   console.log("Yeet", response.items)
              // Assign result to obj
             // obj = JSON.parse(response)
             //
             //  jsonresults = obj.items;
             //  console.log("Response", obj)
              // test = jsonresults[0].id;
              // document.getElementById("checkbox1").innerHTML = test;
              //
              //
              // for (var i=0; i<jsonresults.length; i++) {
              //   for (var name in jsonresults[i]) {
              //       console.log(i)
              //         console.log(name)
              //     }
              // }

            },
            function(err) { console.error("Execute error", err); });
}
