function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,                                                     //Change this to change the map zoom
      center: {lat: 33.7838, lng: -118.1141}
    });
    directionsDisplay.setMap(map); directionsDisplay.setPanel(document.getElementById('right-panel'));
    
    

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

var latlngS = {lat:33.7838, lng:-118.1141};
var latlngE = {lat:33.781395, lng:-118.113499};

test = document.getElementById('start').value.split(",");
console.log(test[0])
latlngS = {lat:parseFloat(test[0]), lng:parseFloat(test[1])};
test2 = document.getElementById('start').value.split(",");
latlngE = {lat:parseFloat(test2[0]), lng:parseFloat(test2[1])};

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
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