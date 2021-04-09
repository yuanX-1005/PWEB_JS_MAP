
// -----------MAP----------
// window.addEventListener('load', init); 

function init(){
  mymap = L.map('mapid').setView([48.862725, 2.287592], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  maxZoom: 19,
  	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
}



var mymap ;
var markA;
var markD;
var markDM;
var markM_lat; 
var markM_lon; 
var markD_lat; 
var markD_lon;
var markA_lat; 
var markA_lon; 

var MarkMonu_lat; 
var MarkMonu_lon; 

// ------- OUVERTURE DES OPTION -------
function options1() {
  mymap.remove();
  init();
  $("#form-destination").css('display', 'block'); 
  $("#img-monument").css('display', 'none'); 
}

function options2() {
  mymap.remove();
  init();
  $("#form-destination").css('display', 'none'); 
  $("#img-monument").css('display', 'none'); 
  $("#dialogSecondOption").dialog();
  firstmarker(); 
}

function options3() {
  mymap.remove();
  init();
  $("#form-destination").css('display', 'none'); 
  $("#img-monument").css('display', 'block'); 
  $("#dialogThirdOption").dialog();
  

}

$(document).ready(function(){

//Initialise la carte
  init(); 

// Ouverture des options
  $(".btn-success").click(function(){
    $("#options").toggle(); 
  });

//option 1 : Entrer deux adresses
  $("#form-destination").submit(function(){
	  mymap.remove();
	  init();
    var dep = $("[name=depart]").val();
    var arr = $("[name=arrivee]").val();
    $.ajax({
      type: 'GET',
      url: "http://nominatim.openstreetmap.org/search",
      dataType: 'json',
      jsonpCallback: 'data',
      data: {format: "json", limit: 1,q: dep},
      error: function(xhr, status, error) {
        alert("ERROR "+error);
      },
      success: function(data){
		markD = L.marker([data[0].lat, data[0].lon]).addTo(mymap)
			.bindPopup("Départ").openPopup();
		markD_lat=data[0].lat;
		markD_lon=data[0].lon;
      }
    });
	$.ajax({
      type: 'GET',
      url: "http://nominatim.openstreetmap.org/search",
      dataType: 'json',
      jsonpCallback: 'data',
      data: {format: "json", limit: 1,q: arr},
      error: function(xhr, status, error) {
        alert("ERROR "+error);
      },
      success: function(data){
		markA = L.marker([data[0].lat, data[0].lon]).addTo(mymap)
			.bindPopup("Arrivée").openPopup();
		markA_lat=data[0].lat;
		markA_lon=data[0].lon;
      }
    });
	$("#dialogFirstOption").dialog();
	mymap.on('click',function(e){
		var nexmarker = L.marker([markA_lat,markA_lon], {icon: car_icon}).addTo(mymap);
      L.Routing.control({
        waypoints: [
            L.latLng([markD_lat, markD_lon]),
            L.latLng([markA_lat,markA_lon])
        ]
      }).on('routesfound', function(e) {
        var routes = e.routes;
        console.log(routes); 
  
        e.routes[0].coordinates.forEach(function(coord, index){
          setTimeout(function(){
            //  marker.setLatLng([coord.lat,coord.lng]);
            nexmarker.setLatLng([coord.lat,coord.lng]);
          },9*index)
        })
      }).addTo(mymap);
	});
	return false;
  });
});  

// ------- OPTION 2   :  placer deux markers -------


car_icon = L.icon({
  iconUrl: './vue/img/car.png',
  iconSize: [50, 50],
  iconAnchor: [10, 29],
  popupAnchor: [0, -29]
});

function firstmarker(){
  mymap.on('click',function firstmarkerOption(a){
      console.log(a)
      var firstmarker = L.marker([a.latlng.lat,a.latlng.lng]).addTo(mymap)
      .bindPopup("Départ").openPopup();
      markM_lat=a.latlng.lat;
      markM_lon=a.latlng.lng;
      mymap.off('click', firstmarkerOption);
     secondmarker();
  })
}

function secondmarker(){
    mymap.on('click',function secondmarkerOption(e){
      console.log(e)
      var nexmarker = L.marker([e.latlng.lat,e.latlng.lng], {icon: car_icon}).addTo(mymap).bindPopup("Arrivé").openPopup();
      L.Routing.control({
        waypoints: [
            L.latLng([markM_lat, markM_lon]),
            L.latLng(e.latlng.lat,e.latlng.lng)
        ]
      }).on('routesfound', function(e) {
        var routes = e.routes;
        console.log(routes); 
  
        e.routes[0].coordinates.forEach(function(coord, index){
          setTimeout(function(){
            nexmarker.setLatLng([coord.lat,coord.lng]);
          },9*index)
        })
      }).addTo(mymap);
      mymap.off('click', secondmarkerOption)
    })
}


// ------- OPTION 3   :  jeu monuments  -------


$(".ui-widget-content").draggable({ revert: "valid" });

$("#mapid" ).droppable({
 drop: function( event, ui ) {
 addMonument(ui);
}
});

function addMonument(ui){
	var monument = ui.draggable.attr("id");
	var img = ui.draggable.attr("src");
    monument_icon = L.icon({
      iconUrl: img,
      iconSize: [30,50],
      popupAnchor: [0, -29]
    });

    var marker_monument = new L.marker([50.896422, -1.148444],{
      draggable: true,
      autoPan: true, 
      icon: monument_icon
    }).addTo(mymap).bindPopup(monument).openPopup();
	$.ajax({	
      type: 'GET',
      url: "http://nominatim.openstreetmap.org/search",
      dataType: 'json',
      jsonpCallback: 'data',
      data: {format: "json", limit: 1,q: monument},
      error: function(xhr, status, error) {
        alert("ERROR "+error);
      },
      success: function(data){
		markMonu_lat=data[0].lat;
		markMonu_lon=data[0].lon;
		var circle_monument = L.circle([markMonu_lat, markMonu_lon], {
		  color: 'transparent',
		  fillColor: 'transparent',
		  fillOpacity: 0.5,
		  radius: 10000
		}).addTo(mymap);

		marker_monument.on('drag', function(e) {
		  var d = mymap.distance(e.latlng, circle_monument.getLatLng());
		  var isInside = d < circle_monument.getRadius();
		  circle_monument.setStyle({
			fillColor: isInside ? 'green' : 'transparent'
		  })
		  if(isInside){
			marker_monument.dragging.disable();
		  }
		});
      }
    });
	
    
 }