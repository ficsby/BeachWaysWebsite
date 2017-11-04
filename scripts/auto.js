/*Autocomplete and Search Bars
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready( function() {
  var locations = [
    { value:"49er Pool", data:"POOL"},
    "49er Softball Complex","SC",
    "Academic Services", "AS",
    "Barrett Athletic Administration Center", "BAC",
    "Bookstore", "BKS",
    "Brotman Hall", "BH",
    "Carpenter Performing Arts Center", "CPAC",
     "Central Plant", "CP", "College of Business Administration", "CBA", "Child Development Center", "CDC", "Coporation Yard", "CORP",
    "Dance Center", "DC", "Design", "DESN", "Education 1", "ED1", "Education 2", "ED2", "Engineering 2", "EN2", "Engineering 3", "EN3", "Engineering 4", "EN4", "Engineering/Computer Sciences", "ECS",
    "Engineering Techonology", "ET", "Facilities Management", "FM", "Faculty Office 2", "FO2", "Faculty Office 3", "FO3", "Faculty Office 4", "FO4", "Faculty Office 5", "FO5", "Family & Consumer Sciences", "FCS",
    "Fine Arts 1", "FA1", "Fine Arts 2", "FA2", "Fine Arts 3", "FA3", "Fine Arts 4", "FA4", "Foundation", "FND", "Hall of Science", "HSCI", "Health & Human Services 1 Classrooms", "HHS1",
    "Health & Human Services 2 Offices", "HHS2", "Horn Center", "HC", "Housing & Residential Life", "HRL", "Human Services and Design", "HSD", "Japanese Garden", "JG", "Kinesology", "KIN", "KKJZ/FM", "KKJZ",
    "Language Arts Building", "LAB", "Lecture Halls 150/151", "LH", "Liberal Arts 1", "LA1", "Liberal Arts 2", "LA2", "Liberal Arts 3", "LA3", "Liberal Arts 4", "LA4", "Liberal Arts 5", "LA5", "Library", "LIB",
    "Mail Services", "MS", "McIntosh Humanities Bldg", "MHB", "Microbiology", "MIC", "Mike & Airline Walter Pyramid", "PYR", "Molecular & Life Sciences Center", "MLSC", "Multi-Media Center", "MMC",
    "Nursing", "NUR", "Outdoor Beach Course", "OUTBACK", "Outpost Food Service", "OP", "Parking and Transportation Svc", "PTS", "Peterson Hall 1", "PH1", "Peterson Hall 2", "PH2", "Psychology", "PSY",
    "Receiving", "REC", "Recylcing Center", "RC", "International House", "IH", "Los Alamitos Hall", "LAH", "Los Cerritos Hall", "LCH", "Residence Commons and Housing", "RH", "Parkside Commons and Housing", "PCH",
    "Social Sciences/Public Administration", "SS/PA", "Soroptomist House", "SOR", "Student Health Services", "SHS", "Student Recreation | Wellness Center", "SRWC", "Tennis Courts", "Theater Arts", "TA",
    "University Art Museum", "UAM", "University Bookstore", "BKS", "University Dining Plaza", "UDP", "University Music Center", "UMC", "University Police Department", "UP", "University Print Shop", "UPS",
    "University Student Union", "USU", "University Telecommunications", "UTC", "Visitor Information Center", "VIC", "Vivian Engineering Center", "VEC"
  ];

  $("#start").autocomplete({
    lookup: locations,
    onSelect: function(suggestion){

    }
  });

  // $("#end").autocomplete({
  //   lookup: locations
  // });
});
