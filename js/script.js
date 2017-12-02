var map, infoWindow;
var currPosition;
var latlngS, latlngE;
var startLocationName, endLocationName;
var markers = [];
var intervalID = null;
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
      }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
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
      /*Marker for the user, indicating user location
      ------------------------------------------------------------------*/
      var marker = new google.maps.Marker({
        position:currPosition,
        map:map,
        icon:"../images/testMarker.png"
      });
      markers.push(marker);
      if(markers.length == 2){
        if(markers[0].position != markers[1].position){
          markers[0].setMap(null);
          markers[0] = markers.pop();
        }
      }
      latlngS = currPosition;
      // latlngE = currPosition;

      /*Autocomplete and Search Bars
      ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      $(function() {
        /*CSULB Locations
        -----------------------------------------------------------------------------------*/
        var locations = [
          {value:"Your Location", data: currPosition},
          {value:"Student Recreation | Wellness Center", data: new google.maps.LatLng(33.785211130686655, -118.10900330543518) }, {value:"SRWC", data: new google.maps.LatLng(33.785211130686655, -118.10900330543518) },
          {value:"Vivian Engineering Center", data: new google.maps.LatLng(33.782830248878916, -118.11044096946716) }, {value:"VEC", data: new google.maps.LatLng(33.782830248878916, -118.11044096946716)},
          {value:"49er Pool", data: {lat: 33.783919822621115, lng: -118.11224240809679}}, {value:"POOL", data: {lat: 33.783919822621115, lng: -118.11224240809679}},
          {value:"49er Softball Complex", data: {lat: 33.78621429140288, lng: -118.11200335621834}}, {value:"SC", data: {lat: 33.78621429140288, lng: -118.11200335621834}},
          {value:"Academic Services", data: {lat: 33.776778, lng: -118.11374710000001}}, {value:"AS", data: {lat: 33.776778, lng: -118.11374710000001}},
          {value:"Barrett Athletic Administration Center", data: {lat: 33.7864069, lng: -118.11487390000002}}, {value:"BAC", data: {lat: 33.7864069, lng: -118.11487390000002}},
          {value:"Bookstore", data: {lat: 33.7799655233934, lng: -118.11388626694679}}, {value:"BKS", data: {lat: 33.7799655233934, lng: -118.11388626694679}},
          {value:"Brotman Hall", data: {lat: 33.7827432, lng: -118.11536920000003}}, {value:"BH", data: {lat: 33.7827432, lng: -118.11536920000003}},
          {value:"Carpenter Performing Arts Center", data: {lat: 33.7881664, lng: -118.11169769999998}}, {value:"CPAC", data: {lat: 33.7881664, lng: -118.11169769999998}},
          {value:"Central Plant", data: {lat: 33.7816781, lng: -118.1123718}}, {value:"CP", data: {lat: 33.7816781, lng: -118.1123718}},
          {value:"College of Business Administration", data: {lat: 33.7840464, lng: -118.1159414}}, {value:"CBA", data: {lat: 33.7840464, lng: -118.1159414}},
          {value:"Child Development Center", data: {lat: 33.7882209, lng: -118.12051209999998}}, {value:"CDC", data: {lat: 33.7882209, lng: -118.12051209999998}},
          {value:"Corporation Yard", data: {lat: 33.78365843765221, lng: -118.10919038951397}}, {value:"CORP", data: {lat: 33.78365843765221, lng: -118.10919038951397}},
          {value:"Dance Center", data: {lat: 33.78822503594151, lng: -118.11321705579758}}, {value:"DC", data: {lat: 33.78822503594151, lng: -118.11321705579758}},
          {value:"Design", data: {lat: 33.7820633589971, lng: -118.10938954353333}}, {value:"DESN", data: {lat: 33.7820633589971, lng: -118.10938954353333}},
          {value:"Education 1", data: {lat: 33.7762083, lng: -118.11412719999998}}, {value:"ED1", data: {lat: 33.7762083, lng: -118.11412719999998}},
          {value:"Education 2", data: {lat: 33.77578307506809, lng: -118.11414241790771}}, {value:"ED2", data: {lat: 33.77578307506809, lng: -118.11414241790771}},
          {value:"Engineering 2", data: {lat: 33.78317300630764, lng: -118.11078345403075}}, {value:"EN2", data: {lat: 33.78317300630764, lng: -118.11078345403075}},
          {value:"Engineering 3", data: {lat: 33.78361942490185, lng: -118.1111504137516}}, {value:"EN3", data: {lat: 33.78361942490185, lng: -118.1111504137516}},
          {value:"Engineering 4", data: {lat: 33.78363280070398, lng: -118.11066761612892}}, {value:"EN4", data: {lat: 33.78363280070398, lng: -118.11066761612892}},
          {value:"Engineering/Computer Sciences", data: {lat: 33.78359044399007, lng: -118.11026394367218}}, {value:"ECS", data: {lat: 33.78359044399007, lng: -118.11026394367218}},
          {value:"Engineering Techonology", data: {lat: 33.78324044297356, lng: -118.1089898943901}}, {value:"ET", data: {lat: 33.78324044297356, lng: -118.1089898943901}},
          {value:"Facilities Management", data: {lat: 33.78368184529387, lng: -118.10850575566292}}, {value:"FM", data: {lat: 33.78368184529387, lng: -118.10850575566292}},
          {value:"Faculty Office 2", data: {lat: 33.77854092773392, lng: -118.1138688325882}}, {value:"FO2", data: {lat: 33.77854092773392, lng: -118.1138688325882}},
          {value:"Faculty Office 3", data: {lat: 33.7788641948679, lng: -118.11378166079521}}, {value:"FO3", data: {lat: 33.7788641948679, lng: -118.11378166079521}},
          {value:"Faculty Office 4", data: {lat: 33.778231036025645, lng: -118.1120677292347}}, {value:"FO4", data: {lat: 33.778231036025645, lng: -118.1120677292347}},
          // {value:"Faculty Office 5", data: {lat: , lng: }}, {value:"FO5", data: {lat: , lng: }},
          {value:"Faculty Office 5", data: new google.maps.LatLng(33.7790559251434,-118.11232253909111)}, {value:"FO5", data: new google.maps.LatLng(33.7790559251434,-118.11232253909111)},
          {value:"Family & Consumer Sciences", data: new google.maps.LatLng(33.78166653537395,-118.11601728200912)}, {value:"FCS", data: new google.maps.LatLng(33.78166653537395,-118.11601728200912)},
          {value:"Fine Arts 1", data: new google.maps.LatLng(33.77726568272707,-118.11281606554985)}, {value:"FA1", data: new google.maps.LatLng(33.77726568272707,-118.11281606554985)},
          {value:"Fine Arts 2", data: new google.maps.LatLng(33.77754659497087,-118.11267659068108)}, {value:"FA2", data: new google.maps.LatLng(33.77754659497087,-118.11267659068108)},
          {value:"Fine Arts 3", data: new google.maps.LatLng(33.77784088300014,-118.11266049742699)}, {value:"FA3", data: new google.maps.LatLng(33.77784088300014,-118.11266049742699)},
          {value:"Fine Arts 4", data: new google.maps.LatLng(33.77840716166642,-118.11270207166672)}, {value:"FA4", data: new google.maps.LatLng(33.77840716166642,-118.11270207166672)},
          {value:"Foundation", data: new google.maps.LatLng(33.78123404011772,-118.1101405620575)}, {value:"FND", data: new google.maps.LatLng(33.78123404011772,-118.1101405620575)},
          {value:"Hall of Science", data: new google.maps.LatLng(33.779887494510525,-118.1128790974617)}, {value:"HSCI", data: new google.maps.LatLng(33.779887494510525,-118.1128790974617)},
          {value:"Health & Human Services 1 Classrooms", data: new google.maps.LatLng(33.782397759499204,-118.11276108026505)}, {value:"HHS1", data: new google.maps.LatLng(33.782397759499204,-118.11276108026505)},
          {value:"Health & Human Services 2 Offices", data: new google.maps.LatLng(33.782379924838715,-118.11226487159729)}, {value:"HHS2", data: new google.maps.LatLng(33.782379924838715,-118.11226487159729)},
          {value:"Horn Center", data: new google.maps.LatLng(33.7832574,-118.11434220000001)}, {value:"HC", data: new google.maps.LatLng(33.7832574,-118.11434220000001)},
          {value:"Housing & Residential Life", data: new google.maps.LatLng(33.78800211758811,-118.11931103467941)}, {value:"HRL", data: new google.maps.LatLng(33.78800211758811,-118.11931103467941)},
          {value:"Human Services and Design", data: new google.maps.LatLng(33.782803497021895,-118.10969263315201)}, {value:"HSD", data: new google.maps.LatLng(33.782803497021895,-118.10969263315201)},
          {value:"Japanese Garden", data: new google.maps.LatLng(33.785211130686655,-118.11946392059326)}, {value:"JG", data: new google.maps.LatLng(33.785211130686655,-118.11946392059326)},
          {value:"Kinesiology", data: new google.maps.LatLng(33.78263852705225,-118.11247676610947)}, {value:"KIN", data: new google.maps.LatLng(33.78263852705225,-118.11247676610947)},
          {value:"KKJZ/FM", data: new google.maps.LatLng(33.7777501,-118.11414239999999)}, {value:"KKJZ", data: new google.maps.LatLng(33.7777501,-118.11414239999999)},
          {value:"Language Arts Building", data: new google.maps.LatLng(33.77689559058684,-118.11277717351913)}, {value:"LAB", data: new google.maps.LatLng(33.77689559058684,-118.11277717351913)},
          {value:"Lecture Halls 150/151", data: new google.maps.LatLng(33.77817084110336,-118.11401635408401)}, {value:"LH", data: new google.maps.LatLng(33.77817084110336,-118.11401635408401)},
          {value:"Liberal Arts 1", data: new google.maps.LatLng(33.777644691092966,-118.11466544866562)}, {value:"LA1", data: new google.maps.LatLng(33.777644691092966,-118.11466544866562)}
          /*{value:"Liberal Arts 2", data: new google.maps.LatLng(,)}, {value:"LA2", data: new google.maps.LatLng(,)},
          {value:"Liberal Arts 3", data: new google.maps.LatLng(,)}, {value:"LA3", data: new google.maps.LatLng(,)},
          {value:"Liberal Arts 4", data: new google.maps.LatLng(,)}, {value:"LA4", data: new google.maps.LatLng(,)},
          {value:"Liberal Arts 5", data: new google.maps.LatLng(,)}, {value:"LA5", data: new google.maps.LatLng(,)},
          {value:"Library", data: new google.maps.LatLng(,)}, {value:"LIB", data: new google.maps.LatLng(,)},
          {value:"Mail Services", data: new google.maps.LatLng(,)}, {value:"MS", data: new google.maps.LatLng(,)},
          {value:"McIntosh Humanities Bldg", data: new google.maps.LatLng(,)}, {value:"MHB", data: new google.maps.LatLng(,)},
          {value:"Microbiology", data: new google.maps.LatLng(,)}, {value:"MIC", data: new google.maps.LatLng(,)},
          {value:"Mike & Airline Walter Pyramid", data: new google.maps.LatLng(,)}, {value:"PYR", data: new google.maps.LatLng(,)},
          {value:"Molecular & Life Sciences Center", data: new google.maps.LatLng(,)}, {value:"MLSC", data: new google.maps.LatLng(,)},
          {value:"Multi-Media Center", data: new google.maps.LatLng(,)}, {value:"MMC", data: new google.maps.LatLng(,)},
          {value:"Nursing", data: new google.maps.LatLng(,)}, {value:"NUR", data: new google.maps.LatLng(,)},
          {value:"Outdoor Beach Course", data: new google.maps.LatLng(,)}, {value:"OUTBACK", data: new google.maps.LatLng(,)},
          {value:"Outpost Food Service", data: new google.maps.LatLng(,)}, {value:"OP", data: new google.maps.LatLng(,)},
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
          {value:"Visitor Information Center", data: }, {value:"VIC", data: }*/
        ];

        /*Autocomplete
        -----------------------------------------------------------------------------------*/
        $(".searchbar").autocomplete({
          lookup: locations,
          onSelect: function(suggestion){
            latlngS = currPosition;
            latlngE = suggestion.data;
            changeLatLng(latlngS,latlngE);
            updateNames("Your Location", suggestion.value);
            switchToDirectionSearch();
            document.getElementById("start").value = "Your Location";
            document.getElementById("end").value = suggestion.value;
          }
        });

        $("#start").autocomplete({
          lookup: locations,
          onSelect: function(suggestion){
          latlngS = suggestion.data;
          changeLatLng(latlngS,latlngE);
          updateNames(suggestion.value, endLocationName);
          }
        });

        $("#end").autocomplete({
          lookup: locations,
          onSelect: function(suggestion){
            latlngE = suggestion.data;
            changeLatLng(latlngS,latlngE);
            updateNames(startLocationName, suggestion.value);
          }
        });
<<<<<<< HEAD
           window.setInterval(function(){
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      }, 1000);
=======

>>>>>>> beta1
      }); //End of jQuery function


      infoWindow.setPosition(currPosition);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(currPosition);
      // console.log(startLocationName);
<<<<<<< HEAD
=======

      window.setInterval(function(){
          // console.log("START");
          // console.log("HI");
          // intervalID = setInterval(calculateAndDisplayRoute(directionsService, directionsDisplay), 1000);
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      }, 1000);



>>>>>>> beta1
    } //End of success function

    /*Displays geolocation coordinates and location
    -----------------------------------------------------------------------------------*/
    directionsDisplay.setMap(map); directionsDisplay.setPanel(document.getElementById('direction-panel'));
}
function changeLatLng(latlngS, latlngE){
  this.latlngS = latlngS;
  this.latlngE = latlngE;
}

function updateNames(sName, eName){
  startLocationName = sName;
  endLocationName = eName;
}

function switchToMainSearch(){
  var searchDirections, mainSearch;
  searchDirections = document.getElementById("search-directions");
  mainSearch = document.getElementById("mainSearch");
  searchDirections.style.display = "none";
  mainSearch.style.display = "block";
}

function switchToDirectionSearch(){
  var searchDirections, mainSearch;
  searchDirections = document.getElementById("search-directions");
  mainSearch = document.getElementById("mainSearch");
  mainSearch.style.display = "none";
  searchDirections.style.display = "block";
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
      origin: latlngS,
      destination: latlngE,
      travelMode: 'WALKING'
    }, function(response, status) {
          if (status === 'OK') {
            if(latlngS === currPosition){
              directionsDisplay.setOptions({ preserveViewport: true });
<<<<<<< HEAD
              map.setZoom(17);
=======
              map.setZoom(18);
>>>>>>> beta1
              map.setCenter(currPosition);
              // directionsDisplay.setDirections(response);
            }
            else{
              directionsDisplay.setOptions({ preserveViewport: false });
            }
            directionsDisplay.setDirections(response);
          }
        });
}

$('a').click(function(e)
{
    // Cancel the default action
    e.preventDefault();
});

/*Icon Bar Functionality
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function openIconTab(evt, iconName){
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="icon-content" and hide them
  tabcontent = document.getElementsByClassName("icon-content");
  for(i = 0; i < tabcontent.length; i++){
    tabcontent[i].style.display = "none";
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
