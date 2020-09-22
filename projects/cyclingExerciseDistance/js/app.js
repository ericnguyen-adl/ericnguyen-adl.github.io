// Declare the variables: 
var map;
var directionsService;
var directionsDisplay;
var options;
var from;
var fromAutoComplete;
var destination;
var destinationAutocomplete;

// Init the map
function initMap() {
  // Create the map base on the map options (compulsory center and zoom parameter)
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.882893, lng: 138.646250 },
    zoom: 12
  });

  //create autocomplete objects for from and destination inputs
  options = {
    types: ['(cities)']
  };
  // from input autocomplete
  from = document.getElementById("from");
  fromAutoComplete = new google.maps.places.Autocomplete(from, options);
  // destination input autocomplete
  destination = document.getElementById("destination");
  destinationAutocomplete = new google.maps.places.Autocomplete(destination, options);

  //directionsService object is used for the route method and get a result for the request
  directionsService = new google.maps.DirectionsService();

  //directionsRenderer object is used to display the route
  directionsDisplay = new google.maps.DirectionsRenderer();

  //bind the directionsDisplay to our map
  directionsDisplay.setMap(map);
}

function displayDistanceMessage() {
  //create request
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("destination").value,
    // Set the travel mode: could be Driving, Walking, Bicycling, Transit
    travelMode: google.maps.TravelMode.BICYCLING ,
    unitSystem: google.maps.UnitSystem.METRIC
  }

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
    // If the DirectionStatus: status return OK (Valid Direction result) 
    if (status == google.maps.DirectionsStatus.OK) {
      $("#output").show(); 
      var durationInHours = result.routes[0].legs[0].duration.value/3600.0; 
      //Get distance and duration by Jquery
      $("#output").html("<div>The distance from: "
        + document.getElementById("from").value
        + " to: " + document.getElementById("destination").value
        + " is: " + result.routes[0].legs[0].distance.text
        + ".<br />The estimated duration in cycling is: " + result.routes[0].legs[0].duration.text 
        + ".<br />You will burn between " + (durationInHours*450).toFixed(2) + " to " + (durationInHours*750).toFixed(2)
        + " calories for that Exercise" + ".</div>");

      //display route in the map
      directionsDisplay.setDirections(result);
      $("#reloadThePageButton").show(); 
      document.getElementById("output").scrollIntoView();
      

    } else {
      //show error message
      $("#output").show(); 
      $("#output").html("<div class='alert-danger'>Could not retrieve Cycling distance.</div>");
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //Set the center back to default area
      map.setCenter({ lat: -34.882893, lng: 138.646250 });      
    }
  });

}

function reloadThePage(){  
  window.location.reload(true);
  $("#output").hide(); 
  $("#reloadThePageButton").hide(); 
}




