var map, infoWindow;
var currPosition;
var latlngS, latlngE;
var startLocationName, endLocationName;
var markers = [];
var intervalID = null;
var watchID;


function initMap() {
  // SIDEBAR SLIDE-OUT FUNCITONALITY
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,                                                     //Change this to change the map zoom
      center: {lat: 33.7838, lng: -118.1141}
    });
    map.setOptions({draggable:true});
    // Try HTML5 geolocation.
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
      $(document).ready(function(){
        $("input").select(function(){
          watchID = navigator.geolocation.getCurrentPosition(displayAndWatch, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
        });
        navigator.geolocation.clearWatch(watchID);
        $("option").click(function(){
            $("input").trigger("select");
            navigator.geolocation.clearWatch(watchID);
        });
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
      routes(position, directionsService, directionsDisplay);
    } //End of success function


    function displayAndWatch(position){
      let userPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let startSearch = document.getElementById("start").value;
      let endSearch = document.getElementById("end").value;
      var watchID;
      if(startSearch == "Current Location"){
          watchID = navigator.geolocation.watchPosition(
          function(position){
            startSearch = document.getElementById("start").value;
            routes(position, directionsService, directionsDisplay);
            if(startSearch != "Current Location"){
              prompt("Test me");
              navigator.geolocation.clearWatch(watchID);
            }
          });
      }
      else{
        navigator.geolocation.clearWatch(watchID);
        routes(position, directionsService, directionsDisplay);
      }
    }
    /*Displays geolocation coordinates and location
    -----------------------------------------------------------------------------------*/
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('direction-panel'));
}




function routes(position, directionsService, directionsDisplay){
  currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  $(function() {
    /*CSULB Locations
    -----------------------------------------------------------------------------------*/
    var locations = [
          {value:"Current Location", data: currPosition},
          {value:"Student Recreation | Wellness Center", data: {lat:33.785211130686655, lng:-118.10900330543518} }, {value:"SRWC", data: "33.785211130686655,-118.10900330543518" },
          {value:"Vivian Engineering Center", data: {lat: 33.782830248878916, lng:-118.11044096946716} }, {value:"VEC", data: "33.782830248878916,-118.11044096946716"},
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
          {value:"Faculty Office 1", data: {lat: 33.77854092773392, lng: -118.1138688325882}}, {value:"FO2", data: {lat: 33.77854092773392, lng: -118.1138688325882}},
          {value:"Faculty Office 2", data: {lat: 33.77854092773392, lng: -118.1138688325882}}, {value:"FO2", data: {lat: 33.77854092773392, lng: -118.1138688325882}},
          {value:"Faculty Office 3", data: {lat: 33.7788641948679, lng: -118.11378166079521}}, {value:"FO3", data: {lat: 33.7788641948679, lng: -118.11378166079521}},
          {value:"Faculty Office 4", data: {lat: 33.778231036025645, lng: -118.1120677292347}}, {value:"FO4", data: {lat: 33.778231036025645, lng: -118.1120677292347}},
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
          {value:"Liberal Arts 1", data: new google.maps.LatLng(33.777644691092966,-118.11466544866562)}, {value:"LA1", data: new google.maps.LatLng(33.777644691092966,-118.11466544866562)},
          {value:"Liberal Arts 2", data: new google.maps.LatLng(33.777975764675666,-118.114552795887)}, {value:"LA2", data: new google.maps.LatLng(33.777975764675666,-118.114552795887)},
          {value:"Liberal Arts 3", data: new google.maps.LatLng(33.77827228067021,-118.11445087194443)}, {value:"LA3", data: new google.maps.LatLng(33.77827228067021,-118.11445087194443)},
          {value:"Liberal Arts 4", data: new google.maps.LatLng(33.77857548393407,-118.1143569946289)}, {value:"LA4", data: new google.maps.LatLng(33.77857548393407,-118.1143569946289)},
          {value:"Liberal Arts 5", data: new google.maps.LatLng(33.77892327459156,-118.11418533325195)}, {value:"LA5", data: new google.maps.LatLng(33.77892327459156,-118.11418533325195)},
          {value:"Library", data: new google.maps.LatLng(33.7772028,-118.11440870000001)}, {value:"LIB", data: new google.maps.LatLng(33.7772028,-118.11440870000001)},
          {value:"Mail Services", data: new google.maps.LatLng(33.78337122899271,-118.10978466644883)}, {value:"MS", data: new google.maps.LatLng(33.78337122899271,-118.10978466644883)},
          {value:"McIntosh Humanities Bldg", data: new google.maps.LatLng(33.776865864252485,-118.11320720706135)}, {value:"MHB", data: new google.maps.LatLng(33.776865864252485,-118.11320720706135)},
          {value:"Microbiology", data: new google.maps.LatLng(33.7793833,-118.11173050000002)}, {value:"MIC", data: new google.maps.LatLng(33.7793833,-118.11173050000002)},
          {value:"Mike & Airline Walter Pyramid", data: new google.maps.LatLng(33.7873979,-118.1143892)}, {value:"PYR", data: new google.maps.LatLng(33.7873979,-118.1143892)},
          {value:"Molecular & Life Sciences Center", data: new google.maps.LatLng(33.7801163790774,-118.11222011223435)}, {value:"MLSC", data: new google.maps.LatLng(33.7801163790774,-118.11222011223435)},
          {value:"Multi-Media Center", data: new google.maps.LatLng(33.77676925356907,-118.11454650945961)}, {value:"MMC", data: new google.maps.LatLng(33.77676925356907,-118.11454650945961)},
          {value:"Nursing", data: new google.maps.LatLng(33.78170666368906,-118.1173825263977)}, {value:"NUR", data: new google.maps.LatLng(33.78170666368906,-118.1173825263977)},
          //{value:"Outdoor Beach Course", data: new google.maps.LatLng(,)}, {value:"OUTBACK", data: new google.maps.LatLng(,)},
          {value:"Outpost Food Service", data: new google.maps.LatLng(33.7823191,-118.1104403)}, {value:"OP", data: new google.maps.LatLng(33.7823191,-118.1104403)},
          {value:"Parking and Transportation Svc", data: new google.maps.LatLng(33.785283953164765,-118.11625415459275)}, {value:"PTS", data: new google.maps.LatLng(33.785283953164765,-118.11625415459275)},
          {value:"Peterson Hall 1", data: new google.maps.LatLng(33.7788812,-118.11255030000001)}, {value:"LIB", data: new google.maps.LatLng(33.7788812,-118.11255030000001)},
          {value:"Peterson Hall 2", data: new google.maps.LatLng(33.7792966,-118.11250669999998)}, {value:"PH2", data: new google.maps.LatLng(33.7792966,-118.11250669999998)},
          {value:"Psychology", data: new google.maps.LatLng(33.7794761,-118.11437920000003)}, {value:"PSY", data: new google.maps.LatLng(33.7794761,-118.11437920000003)},
          {value:"Receiving", data: new google.maps.LatLng(33.78340169629622,-118.10934838838875)}, {value:"REC", data: new google.maps.LatLng(33.78340169629622,-118.10934838838875)},
          {value:"Recycling Center", data: new google.maps.LatLng(33.78815370213155,-118.11839640140533)}, {value:"RC", data: new google.maps.LatLng(33.78815370213155,-118.11839640140533)},
          {value:"International House", data: new google.maps.LatLng(33.78179137895924,-118.12099277973175)}, {value:"IH", data: new google.maps.LatLng(33.78179137895924,-118.12099277973175)},
          {value:"Los Alamitos Hall", data: new google.maps.LatLng(33.7833166,-118.118743)}, {value:"LAH", data: new google.maps.LatLng(33.7833166,-118.118743)},
          {value:"Los Cerritos Hall", data: new google.maps.LatLng(33.782478015425426,-118.1190937757492)}, {value:"LCH", data: new google.maps.LatLng(33.782478015425426,-118.1190937757492)},
          //{value:"Residence Commons and Housing", data: new google.maps.LatLng(,)}, {value:"RH", data: new google.maps.LatLng(,)},
          //{value:"Parkside Commons and Housing", data: new google.maps.LatLng(,)}, {value:"PCH", data: new google.maps.LatLng(,)},
          {value:"Social Sciences/Public Administration", data: new google.maps.LatLng(33.782005396110634,-118.11057776212692)}, {value:"SS/PA", data: new google.maps.LatLng(33.782005396110634,-118.11057776212692)},
          {value:"Soroptimist House", data: new google.maps.LatLng(33.78176314056783,-118.11682906933129)}, {value:"SOR", data: new google.maps.LatLng(33.78176314056783,-118.11682906933129)},
          {value:"Student Health Services", data: new google.maps.LatLng(33.7823276,-118.11786059999997)}, {value:"SHS", data: new google.maps.LatLng(33.7823276,-118.11786059999997)},
          {value:"Tennis Courts", data: new google.maps.LatLng(33.7845244,-118.11062190000001)},
          {value:"Theater Arts", data: new google.maps.LatLng(33.776459,-118.11263689999998)}, {value:"TA", data: new google.maps.LatLng(33.776459,-118.11263689999998)},
          {value:"University Art Museum", data: new google.maps.LatLng(33.783516,-118.114711)}, {value:"UAM", data: new google.maps.LatLng(33.783516,-118.114711)},
          {value:"University Bookstore", data: new google.maps.LatLng(33.77998112916145,-118.11430871486664)}, {value:"BKS", data: new google.maps.LatLng(33.77998112916145,-118.11430871486664)},
          {value:"University Dining Plaza", data: new google.maps.LatLng(33.78137671920652,-118.11346650123596)}, {value:"UDP", data: new google.maps.LatLng(33.78137671920652,-118.11346650123596)},
          {value:"University Music Center", data: new google.maps.LatLng(33.7873972628642,-118.11227375641465)}, {value:"UMC", data: new google.maps.LatLng(33.7873972628642,-118.11227375641465)},
          {value:"University Police Department", data: new google.maps.LatLng(33.78435211851833,-118.1091302074492)}, {value:"UP", data: new google.maps.LatLng(33.78435211851833,-118.1091302074492)},
          {value:"University Print Shop", data: new google.maps.LatLng(33.78527549999999,-118.11981550000002)}, {value:"UPS", data: new google.maps.LatLng(33.78527549999999,-118.11981550000002)},
          {value:"University Student Union", data: new google.maps.LatLng(33.78137671920652,-118.11346650123596)}, {value:"USU", data: new google.maps.LatLng(33.78137671920652,-118.11346650123596)},
          {value:"University Telecommunications", data: new google.maps.LatLng(33.7766669,-118.11158339999997)}, {value:"UTC", data: new google.maps.LatLng(33.7766669,-118.11158339999997)},
          {value:"Visitor Information Center", data: new google.maps.LatLng(33.7819505,-118.11929709999998) }, {value:"VIC", data: new google.maps.LatLng(33.7819505,-118.11929709999998) }
        ];


    /*Autocomplete
    -----------------------------------------------------------------------------------*/
    $(".searchbar").autocomplete({
      lookup: locations,
      onSelect: function(suggestion){
        latlngS = currPosition;
        latlngE = suggestion.data;
        changeLatLng(latlngS,latlngE);
        updateNames("Current Location", suggestion.value);
        switchToDirectionSearch();
        document.getElementById("start").value = "Your Location";
        document.getElementById("end").value = suggestion.value;
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      }
    });

    $("#start").autocomplete({
      lookup: locations,
      onSelect: function(suggestion){
      let startSearch = document.getElementById("start").value;
      latlngS = suggestion.data;
      if(startSearch == 'Current Location'){
        navigator.geolocation.clearWatch(watchID);
      }
      changeLatLng(latlngS,latlngE);
      updateNames(suggestion.value, endLocationName);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      }
    });

    $("#end").autocomplete({
      lookup: locations,
      onSelect: function(suggestion){
      latlngE = suggestion.data;
      changeLatLng(latlngS,latlngE);
      updateNames(startLocationName, suggestion.value);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      }
    });
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }); //End of jQuery function
}
function changeLatLng(latlngS, latlngE){
  this.latlngS = latlngS;
  this.latlngE = latlngE;
}

function updatePosition(position){
  this.currPosition = position;
  prompt(currPosition);
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

/* Markers Functionality
----------------------------------------------------------------------------------------------------------------------*/
// Toggle switch
function toggleFoodMarkers(){
  document.getElementById("toggleFood").classList.toggle("on");
  document.getElementById("toggleFood").classList.contains("on")? showFoodMarkers() : hideFoodMarkers();
}

// Shows the food markers
function showFoodMarkers(){
  for (var i = 0; i < foodMarkers.length; i++) {
     foodMarkers[i].setMap(map);
  }
}

// Hides the food markers
function hideFoodMarkers() {
  for (var i = 0; i < foodMarkers.length; i++) {
    foodMarkers[i].setMap(null);
  }
}

var foodMarkers = []; // Stores the food markers
// Creates the markers and stores them inside the 'foodMarkers' set
function setFoodMarkers(){
  var img_usu = '../BeachWaysWebsite/symbols/usu.png';   // Located at the USU
  var img_outpost = '../BeachWaysWebsite/symbols/outpost.png'; //Located near the ECS
  var img_nugget = '../BeachWaysWebsite/symbols/nugget.png'; // Located next to the USU
  var img_starbucks= '../BeachWaysWebsite/symbols/starbucks.png'; // Located at both the Library and the USU
  var img_cbean = '../BeachWaysWebsite/symbols/cbean.png'; // Located at the USU
  var img_robeks = '../BeachWaysWebsite/symbols/robeks.png'; // Located at both the USU and the Rec Center

  // Initializes the food markers; Default display is hidden (map: null)
  // Note: Current coordinates are incorrect, needs to be changed  */
  var usuMarker = new google.maps.Marker({ position: {lat: 33.7788641948679, lng: -118.11378166079521}, map: null, icon: img_usu });
  var outpostMarker = new google.maps.Marker({ position: {lat: 33.7882209, lng: -118.12051209999998}, map: null, icon: img_outpost });
  var nuggetMarker = new google.maps.Marker({ position: {lat: 33.78368184529387, lng: -118.10850575566292}, map: null, icon: img_nugget });
  var starbucksMarker = new google.maps.Marker({ position: {lat: 33.778231036025645, lng: -118.12051209999998}, map: null, icon: img_starbucks });
  var cbeanMarker = new google.maps.Marker({ position: {lat: 33.77840716166642, lng: -118.11270207166672}, map: null, icon: img_cbean });
  var robeksMarker = new google.maps.Marker({ position: {lat: 33.77784088300014, lng: -118.11266049742699}, map: null, icon: img_robeks });

  // Store into foodMarkers array
  foodMarkers.push(usuMarker);
  foodMarkers.push(outpostMarker);
  foodMarkers.push(nuggetMarker);
  foodMarkers.push(starbucksMarker);
  foodMarkers.push(cbeanMarker);
  foodMarkers.push(robeksMarker);
}

$(document).ready(function(){

    var col1_data,col2_data;

    col1_data = $(".footer-col:nth-child(1)").html();
    col2_data = $(".footer-col:nth-child(2)").html();

    var w = $(window).width();

    if (w < 768)
    swap_columns();

    function swap_columns()
    {
        var w = $(window).width();
        if (w < 768)
        {
            $(".footer-col:nth-child(2)").html(col1_data);
            $(".footer-col:nth-child(1)").html(col2_data);
        }
        else
        {
            $(".footer-col:nth-child(1)").html(col1_data);
            $(".footer-col:nth-child(2)").html(col2_data);
        }
    }


    $(window).resize(function() {
        swap_columns();
    });
});
