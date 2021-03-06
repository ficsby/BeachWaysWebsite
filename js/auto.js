/*Autocomplete and Search Bars
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var lat;
$(function() {
  var locations = [
    {value:"Student Recreation | Wellness Center", data: "33.785211130686655, -118.10900330543518" }, {value:"SRWC", data: "33.785211130686655,-118.10900330543518" },
    {value:"Vivian Engineering Center", data:"33.782830248878916,-118.11044096946716" }, {value:"VEC", data: "33.782830248878916,-118.11044096946716"}
  ];

  $("#start").autocomplete({
    lookup: locations,
    onSelect: function(suggestion){
      var thehtml = suggestion.data;
      var newhtml = thehtml.split(',');
      lat = {lat: parseFloat(newhtml[0]), lng: parseFloat(newhtml[1])};
      prompt(jQuery.type(lat));
      $('#start-lat').html(thehtml);
    }
  });

  $("#end").autocomplete({
    lookup: locations,
    onSelect: function(suggestion){
      var thehtml = suggestion.data;
     $('#end-lat').html(thehtml);
    }
  });
});
// prompt(jQuery.type(lat));
/*
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
{value:"Student Recreation | Wellness Center", data: {lat:33.785211130686655, lng:-118.10900330543518} }}, {value:"SRWC", data: {lat:33.785211130686655, lng:-118.10900330543518} }},
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
{value:"Visitor Information Center", data: }, {value:"VIC", data: },
*/
