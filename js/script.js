var map, infoWindow;
var currPosition;
var latlngS;
var latlngE;
var overlay;

function initMap() {
    CampusOverlay.prototype = new google.maps.OverlayView();

    /** @constructor */
    function CampusOverlay(bounds, image, map) {

      // Initialize all properties.
      this.bounds_ = bounds;
      this.image_ = image;
      this.map_ = map;

      // Define a property to hold the image's div. We'll
      // actually create this div upon receipt of the onAdd()
      // method so we'll leave it null for now.
      this.div_ = null;

      // Explicitly call setMap on this overlay.
      this.setMap(map);
    }

    /**
      * onAdd is called when the map's panes are ready and the overlay has been
      * added to the map.
      */
    CampusOverlay.prototype.onAdd = function() {

      var div = document.createElement('div');
      div.style.borderStyle = 'none';
      div.style.borderWidth = '0px';
      div.style.position = 'absolute';

      // Create the img element and attach it to the div.
      var img = document.createElement('img');
      img.src = this.image_;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.position = 'absolute';
      div.appendChild(img);

      this.div_ = div;

      // Add the element to the "overlayLayer" pane.
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    };

    CampusOverlay.prototype.draw = function() {

      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      var overlayProjection = this.getProjection();

      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
      var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

      // Resize the image's div to fit the indicated dimensions.
      var div = this.div_;
      div.style.left = sw.x + 'px';
      div.style.top = ne.y + 'px';
      div.style.width = (ne.x - sw.x) + 'px';
      div.style.height = (sw.y - ne.y) + 'px';
    };

    // The onRemove() method will be called automatically from the API if
    // we ever set the overlay's map property to 'null'.
    CampusOverlay.prototype.onRemove = function() {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    };

    google.maps.event.addDomListener(window, 'load', initMap);

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,                                                     //Change this to change the map zoom
      center: {lat: 33.7838, lng: -118.1141}
    });

    var bounds = new google.maps.LatLngBounds(
       //southwest coordinate, northeast coordinate
       new google.maps.LatLng(33.774712162958124,-118.12469774857163),
       new google.maps.LatLng(33.78879644733833,-118.10790535993874));

    // The campus map is courtesy of Eric Do.
    var srcImage = '../BeachWaysWebsite/images/csulb_campus_10k.png';

    // The custom CampusOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    overlay = new CampusOverlay(bounds, srcImage, map);

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
