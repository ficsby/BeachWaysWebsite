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
      if(document.getElementById('start').value.length == 0){
        latlngS = currPosition;
      }
      if(document.getElementById('end').value.length == 0){
        latlngE = currPosition;
      }
      /*Autocomplete and Search Bars
      ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      $(function() {
        /*CSULB Locations
        -----------------------------------------------------------------------------------*/
        var locations = [
          {value:"Current Location", data: currPosition},
          {value:"Student Recreation | Wellness Center", data: {lat:33.785211130686655, lng:-118.10900330543518} }, {value:"SRWC", data: "33.785211130686655,-118.10900330543518" },
          {value:"Vivian Engineering Center", data: {lat: 33.782830248878916, lng:-118.11044096946716} }, {value:"VEC", data: "33.782830248878916,-118.11044096946716"}
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
    } //End of success function

    /*Displays geolocation coordinates and location
    -----------------------------------------------------------------------------------*/
    infoWindow.setPosition(currPosition);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(currPosition);
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
