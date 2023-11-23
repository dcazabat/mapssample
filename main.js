const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
let osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib })

// Setea el mapa
let map = L.map('map').setView([-36.2166, -61.1158], 17).addLayer(osm);

// Agrega un punto en el mapa con la referencia
L.marker([-36.21768, -61.11467])
    .addTo(map)
    .bindPopup('Ciba Arqueria')
    .openPopup();
