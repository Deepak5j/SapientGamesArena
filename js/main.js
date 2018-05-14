var dataStoredSuccessful = 0;
function loadData() {
      var url = "http://starlord.hackerearth.com/gamesext";
      fetch(url)
      .then(function(response) {
      return response.json();
      })
      .then(function(myJson) {
            if (typeof(Storage) != undefined) {
                  var dataToStore = JSON.stringify(myJson); 
                  localStorage.setItem('items', dataToStore);               
                  dataStoredSuccessful = 1;
            } else {
                  alert("Your browser does not support Web Storage.");

                  dataStoredSuccessful = 0;
            }
            if(dataStoredSuccessful == 0) {
                  alert("Allow 3rd party cookies and update your browser.");
            }  

      });
}
function listit() {
      var myJson = JSON.parse(localStorage.getItem('items')); 
      var table = document.createElement("table");            
      table.setAttribute('align', 'center');
      table.setAttribute('class', 'table table-sm');
      table.setAttribute('id', 'gameTableId');
      var row = document.createElement("tr");
      var clm = document.createElement("th"); clm.innerHTML = "S.No."; row.appendChild(clm);
      var clm = document.createElement("th"); clm.innerHTML = "Title"; row.appendChild(clm);
      var clm = document.createElement("th"); clm.innerHTML = "Platform"; row.appendChild(clm);
      var clm = document.createElement("th"); clm.innerHTML = "Score"; row.appendChild(clm);
      var clm = document.createElement("th"); clm.innerHTML = "Genre"; row.appendChild(clm);
      var clm = document.createElement("th"); clm.innerHTML = "Editors Choice"; row.appendChild(clm);
      var clm = document.createElement("th"); clm.innerHTML = "Release Year"; row.appendChild(clm);
      table.appendChild(row);
      for(var i=0; i<myJson.length; i++) {
            var row = document.createElement("tr");
            var clm = document.createElement("td"); clm.innerHTML = i+1 ; row.appendChild(clm);
            var clm = document.createElement("td"); clm.innerHTML = myJson[i].title; row.appendChild(clm);
            var clm = document.createElement("td"); clm.innerHTML = myJson[i].platform; row.appendChild(clm);
            var clm = document.createElement("td"); clm.innerHTML = myJson[i].score; row.appendChild(clm);
            var clm = document.createElement("td"); clm.innerHTML = myJson[i].genre; row.appendChild(clm);
            var clm = document.createElement("td"); clm.innerHTML = myJson[i].editors_choice; row.appendChild(clm);
            var clm = document.createElement("td"); clm.innerHTML = myJson[i].release_year; row.appendChild(clm);
            table.appendChild(row);
      }
      var ele = document.getElementById("listHere");
      ele.appendChild(table);
}

function searchGame() {
      var input, filter, table, tr, td, i;
      input = document.getElementById("gameSearch");
      filter = input.value.toUpperCase();
      table = document.getElementById("gameTableId");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
}

function sortGameAscending () {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("gameTableId");
      switching = true;
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < 50/*(rows.length - 1)*/; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[3];
          y = rows[i + 1].getElementsByTagName("td")[3];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
}

function sortGamedescending() {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("gameTableId");
      switching = true;
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < 50/*(rows.length - 1)*/; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[3];
          y = rows[i + 1].getElementsByTagName("td")[3];
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
}