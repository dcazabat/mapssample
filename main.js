const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const maxzoom = 18
const viewzoom= 15
let osm = L.tileLayer(osmUrl, { maxZoom: maxzoom, attribution: osmAttrib })

// Setea el mapa
let map = L.map('map').setView([-36.2166, -61.1158], viewzoom).addLayer(osm);

// Agrega un punto en el mapa con la referencia
L.marker([-36.21768, -61.11467])
    .addTo(map)
    .bindPopup('Ciba Arqueria')
    .openPopup();

// Poligonos que delimitarian las zonas
let states = [{
    "type": "Feature",
    "properties": { "party": "Campo1" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-61.1042,-36.2023],
            [-61.1112,-36.2086],
            [-61.1078,-36.2115],
            [-61.1002,-36.2054],
            [-61.1042,-36.2023]
        ]]
    }
}, {
    "type": "Feature",
    "properties": { "party": "Campo2" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-61.1078,-36.2115],
            [-61.1002,-36.2054],
            [-61.0966,-36.2083],
            [-61.1038,-36.2143],
            [-61.1078,-36.2115]
        ]]
    }
}];

L.geoJSON(states, {
    style: function (feature) {
        switch (feature.properties.party) {
            case 'Campo1': return { color: "#ff0000" };
            case 'Campo2': return { color: "#0000ff" };
        }
    }
}).addTo(map);