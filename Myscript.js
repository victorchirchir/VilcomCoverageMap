var map=L.map('map').setView([-0.4564, 36.0763],6)



//setting coordinates to display when mouse hovers around
map.on('mousemove',function(e){
 $('#coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
})

//adding scale
L.control.scale({position:'bottomleft'}).addTo(map)

//changing zoom controls from its default position
map.zoomControl.setPosition('topright')

//adding the browser print button
L.control.browserPrint({position:"topleft",title:'print...'}).addTo(map)

//adding style for maps
var KenyaMapStyle={
  color:'black',
  opacity:1,
}

var CoverageStyle = {
  color:'blue',
  opacity:1,
}
var VilcomPoint={
  color: '#0000',
  radius:10,
  fillcolor:'red',


}

var EldoreCoverage = L.geoJson(EldoreCoverage,
  {
    style:CoverageStyle
  })


//adding data from json files

var Ken01 = L.geoJson(Ken01,
  {
      style:KenyaMapStyle
  })

var Nairobi = L.geoJson(Nairobi,
  {
    style:VilcomPoint
  }).bindPopup("Nairobi")
var NakuruPoint = L.geoJson(NakuruPoint,
  {
    style:VilcomPoint
  }).bindPopup("Nakuru")

var Eldoret = L.geoJson(Eldoret,
  {
    style:VilcomPoint
  }).bindPopup("Eldoret")
var Ongata_Rongai = L.geoJson(Ongata_Rongai,
  {
    style:VilcomPoint
  }).bindPopup("Ongata Rongai")
var Ruiru = L.geoJson(Ruiru,
  {
    style:VilcomPoint
  }).bindPopup("Ruiru")


var points = [Nairobi, NakuruPoint, Eldoret, Ongata_Rongai, Ruiru]
//add point Regions to map
  Ken01.addTo(map)
 

  //add popups
  for (var i = 0;i < points.length;i++){
    points[i].addTo(map)
    points[i].options.icon = L.divIcon({ className: 'leaflet-div-icon red-marker' });
  }

  for (var i = 0;i < points.length;i++){
     // Open the pop-up for each marker on hover
     points[i].on('mouseover', function () {
      this.openPopup();
  });
  }

  //addding layer the layer control

  function AddEldoret(){
    var layer=document.getElementById('eldoret')
    if(layer.checked){
      var polygonBounds =EldoreCoverage.getBounds();
      map.fitBounds(polygonBounds);
      EldoreCoverage.addTo(map)
    }else{
        map.removeLayer(EldoreCoverage)
    }

}


 // add base maps

 var OpenTopoMap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 17,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }
)

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})



//basemaps
var baselayers={
'Google Street':googleStreets,
'OpenTopoMap':OpenTopoMap,
'Google Hybrid':googleHybrid,
'Google Satelite':googleSat,
'Google Terrain':googleTerrain
}


L.control.layers(baselayers).addTo(map)
  