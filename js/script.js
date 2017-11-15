var map, infoWindow;
var currPosition;
var latlngS;
var latlngE;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,                                                     //Change this to change the map zoom
      center: {lat: 33.7838, lng: -118.1141}
    });

    // Try HTML5 geolocation.
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    /*Handles error in case geolocation isn't supported
    -----------------------------------------------------------------------------------*/
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
    /*Success function, needed for geolocation service
    -----------------------------------------------------------------------------------*/
    function success(position){
      currPosition = new google.maps.LatLng(position.coords.latitude,
    						position.coords.longitude);
      latlngS = currPosition;
      latlngE = currPosition;

      /*Autocomplete and Search Bars
      ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      $(function() {
        /*CSULB Locations
        -----------------------------------------------------------------------------------*/
        var locations = [
          {value:"Current Location", data: currPosition},
          {value:"Student Recreation | Wellness Center", data: {lat:33.785211130686655, lng:-118.10900330543518} }, {value:"SRWC", data: "33.785211130686655,-118.10900330543518" },
          {value:"Vivian Engineering Center", data: {lat: 33.782830248878916, lng:-118.11044096946716} }, {value:"VEC", data: "33.782830248878916,-118.11044096946716"},
          {value:"49er Pool", data: 'd'}, {value:"POOL", data: 'tool'},
          {value:"49er Softball Complex", data: }, {value:"SC", data: },
          {value:"Academic Services", data: }, {value:"AS", data: },
          {value:"Barrett Athletic Administration Center", data: }, {value:"BAC", data: },
          {value:"Bookstore", data: }, {value:"BKS", data: },
          {value:"Brotman Hall", data: }, {value:"BH", data: },
          {value:"Carpenter Performing Arts Center", data: }, {value:"CPAC", data: },
          {value:"Central Plant", data: }, {value:"CP", data: },
          {value:"College of Business Administration", data: }, {value:"CBA", data: },
          {value:"Child Development Center", data: }, {value:"CDC", data: },
          {value:"Coporation Yard", data: }, {value:"CORP", data: },
          {value:"Dance Center", data: }, {value:"DC", data: },
          {value:"Design", data: }, {value:"DESN", data: },
          {value:"Education 1", data: }, {value:"ED1", data: },
          {value:"Education 2", data: }, {value:"ED2", data: },
          {value:"Engineering 2", data: }, {value:"EN2", data: },
          {value:"Engineering 3", data: }, {value:"EN3", data: },
          {value:"Engineering 4", data: }, {value:"EN4", data: },
          {value:"Engineering/Computer Sciences", data: }, {value:"ECS", data: },
          {value:"Engineering Techonology", data: }, {value:"ET", data: },
          {value:"Facilities Management", data: }, {value:"FM", data: },
          {value:"Faculty Office 2", data: }, {value:"FO2", data: },
          {value:"Faculty Office 3", data: }, {value:"FO3", data: },
          {value:"Faculty Office 4", data: }, {value:"FO4", data: },
          {value:"Faculty Office 5", data: }, {value:"FO5", data: },
          {value:"Faculty Office 5", data: }, {value:"FO5", data: },
          {value:"Family & Consumer Sciences", data: }, {value:"FCS", data: },
          {value:"Fine Arts 1", data: }, {value:"FA1", data: },
          {value:"Fine Arts 2", data: }, {value:"FA2", data: },
          {value:"Fine Arts 3", data: }, {value:"FA3", data: },
          {value:"Fine Arts 4", data: }, {value:"FA4", data: },
          {value:"Foundation", data: }, {value:"FND", data: },
          {value:"Hall of Science", data: }, {value:"HSCI", data: },
          {value:"Health & Human Services 1 Classrooms", data: }, {value:"HHS1", data: },
          {value:"Health & Human Services 2 Offices", data: }, {value:"HHS2", data: },
          {value:"Horn Center", data: }, {value:"HC", data: },
          {value:"Housing & Residential Life", data: }, {value:"HRL", data: },
          {value:"Human Services and Design", data: }, {value:"HSD", data: },
          {value:"Japanese Garden", data: }, {value:"JG", data: },
          {value:"Kinesology", data: }, {value:"KIN", data: },
          {value:"KKJZ/FM", data: }, {value:"KKJZ", data: },
          {value:"Language Arts Building", data: }, {value:"LAB", data: },
          {value:"Lecture Halls 150/151", data: }, {value:"LH", data: },
          {value:"Liberal Arts 1", data: }, {value:"LA1", data: },
          {value:"Liberal Arts 2", data: }, {value:"LA2", data: },
          {value:"Liberal Arts 3", data: }, {value:"LA3", data: },
          {value:"Liberal Arts 4", data: }, {value:"LA4", data: },
          {value:"Liberal Arts 5", data: }, {value:"LA5", data: },
          {value:"Library", data: }, {value:"LIB", data: },
          {value:"Mail Services", data: }, {value:"MS", data: },
          {value:"McIntosh Humanities Bldg", data: }, {value:"MHB", data: },
          {value:"Microbiology", data: }, {value:"MIC", data: },
          {value:"Mike & Airline Walter Pyramid", data: }, {value:"PYR", data: },
          {value:"Molecular & Life Sciences Center", data: }, {value:"MLSC", data: },
          {value:"Multi-Media Center", data: }, {value:"MMC", data: },
          {value:"Nursing", data: }, {value:"NUR", data: },
          {value:"Outdoor Beach Course", data: }, {value:"OUTBACK", data: },
          {value:"Outpost Food Service", data: }, {value:"OP", data: },
          {value:"Parking and Transportation Svc", data: }, {value:"PTS", data: },
          {value:"Peterson Hall 1", data: }, {value:"LIB", data: },
          {value:"Peterson Hall 2", data: }, {value:"PH2", data: },
          {value:"Psychology", data: }, {value:"PSY", data: },
          {value:"Receiving", data: }, {value:"REC", data: },
          {value:"Recylcing Center", data: }, {value:"RC", data: },
          {value:"International House", data: }, {value:"IH", data: },
          {value:"Los Alamitos Hall", data: }, {value:"LAH", data: },
          {value:"Los Cerritos Hall", data: }, {value:"LCH", data: },
          {value:"Residence Commons and Housing", data: }, {value:"RH", data: },
          {value:"Parkside Commons and Housing", data: }, {value:"PCH", data: },
          {value:"Social Sciences/Public Administration", data: }, {value:"SS/PA", data: },
          {value:"Soroptomist House", data: }, {value:"SOR", data: },
          {value:"Student Health Services", data: }, {value:"SHS", data: },
          {value:"Tennis Courts", data: },
          {value:"Theater Arts", data: }, {value:"TA", data: },
          {value:"University Art Museum", data: }, {value:"UAM", data: },
          {value:"University Bookstore", data: }, {value:"BKS", data: },
          {value:"University Dining Plaza", data: }, {value:"UDP", data: },
          {value:"University Music Center", data: }, {value:"UMC", data: },
          {value:"University Police Department", data: }, {value:"UP", data: },
          {value:"University Print Shop", data: }, {value:"UPS", data: },
          {value:"University Student Union", data: }, {value:"USU", data: },
          {value:"University Telecommunications", data: }, {value:"UTC", data: },
          {value:"Visitor Information Center", data: }, {value:"VIC", data: }
        ];

        /*Autocomplete
        -----------------------------------------------------------------------------------*/
        $("#start").autocomplete({
          lookup: locations,
          onSelect: function(suggestion){
          latlngS = suggestion.data;
          calculateAndDisplayRoute(directionsService, directionsDisplay);
          console.log("In autocomplete: " + latlngS);
          }
        });

        $("#end").autocomplete({
          lookup: locations,
          onSelect: function(suggestion){
            latlngE = suggestion.data;
            calculateAndDisplayRoute(directionsService, directionsDisplay);
          }
        });
      }); //End of jQuery function
      infoWindow.setPosition(currPosition);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(currPosition);
    } //End of success function

    /*Displays geolocation coordinates and location
    -----------------------------------------------------------------------------------*/


    directionsDisplay.setMap(map); directionsDisplay.setPanel(document.getElementById('direction-panel'));
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      console.log("In displayRoute: " + document.getElementById('start').value);
      directionsService.route({
      origin: latlngS,
      destination: latlngE,
      travelMode: 'WALKING'
    }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          }
        });
}

/*Icon Bar Functionality
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function openIconTab(evt, iconName){
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="icon-content" and hide them
  tabcontent = document.getElementsByClassName("icon-content");
  for(i = 0; i < tabcontent.length; i++){
    tabcontent[i].style.display = "none"
  }

  // Get all elements with class="iconlinks" and remove the class "active"
  tablinks = document.getElementsByClassName("iconlinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(iconName).style.display = "block";
  evt.currentTarget.className += " active";
}

/*Key Tabs Functionality
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function openKey(evt, keyName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("key-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(keyName).style.display = "block";
    evt.currentTarget.className += " active";
}
