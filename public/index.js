// Leaflet integration

var tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 5,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }),
  latlng = L.latLng(46.90296, 1.90925);

var map = L.map("map", {
  center: latlng,
  zoom: 6,
  layers: [tiles],
  tap: false
});

var markersCluster = new L.MarkerClusterGroup();

// Pour FMP
//var geojson = $$DATA;
for (var i = 0; i < geojson.length; i++) {
  var latLng = new L.LatLng(
    geojson[i].geometry.coordinates[1],
    geojson[i].geometry.coordinates[0]
  );

  var myID = geojson[i].recordid;
  var myTitle = geojson[i].fields.titre;
  var myIcon = L.icon({
    iconUrl:
      "https://jpalpha.github.io/leaflet-fm/public/" +
      getIcon(
        geojson[i].fields.categorie1,
        geojson[i].fields.categorie2,
        geojson[i].fields.categorie3
      ),
    iconSize: [33, 44],
    iconAnchor: [16, 44],
    popupAnchor: [-3, -76]
  });

  var marker = new L.Marker(latLng, { icon: myIcon })
    .bindTooltip(myTitle)
    .on("click", onMapClick.bind(myID));

  markersCluster.addLayer(marker);
}

map.addLayer(markersCluster);

function onMapClick(e) {
  typeof FileMaker !== "undefined"
    ? FileMaker.PerformScriptWithOption("FromJS", JSON.stringify(this), 0)
    : console.log(this);
}
