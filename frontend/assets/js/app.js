let map = L.map("map").setView([42.3, 12.8], 6);

function setUpProj4() {
  proj4.defs("WGS84", "+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  proj4.defs(
    "EPSG:6706",
    "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs"
  );
}

function setUpLayers() {
  let osm = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "<a href='https://operations.osmfoundation.org/policies/tiles/'>&copy; OSM</a>",
    maxZoom: 18,
  }).addTo(map);

  let mapbox = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/satellite-streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoidGgzYzBweXIxZ2h0IiwiYSI6ImNrd2F0NjJ3aTE1aGkydXFtMXlyMTFyd28ifQ.13niSyevQE4Y6mJxRiPgZA",
    }
  );

  L.TileLayer.Catasto = L.TileLayer.extend({
    getTileUrl: function (coords) {
      return (
        "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php?language=ita&service=WMS&version=1.3.0&request=GetMap&bbox=" +
        bbox(coords.x, coords.y, coords.z) +
        "&crs=EPSG:6706&width=256&height=256&layers=province,CP.CadastralZoning,acque,CP.CadastralParcel,fabbricati,codice_plla,simbolo_graffa&styles=default&format=image/png&DPI=96&map_resolution=96&format_options=dpi:96&transparent=true"
      );
    },
    getAttribution: function () {
      return "<a href='https://www.agenziaentrate.gov.it/portale/it/web/guest/schede/fabbricatiterreni/consultazione-cartografia-catastale/servizio-consultazione-cartografia'>Agenzie delle Entrate</a>";
    },
  });

  L.tileLayer.catasto = function () {
    return new L.TileLayer.Catasto();
  };

  L.tileLayer.catasto().addTo(map).setOpacity(0.5);

  L.control
    .layers(
      {
        OSM: osm,
        Satellite: mapbox,
      },
      {
        Catasto: L.tileLayer.catasto,
      }
    )
    .addTo(map);
}

document.addEventListener("DOMContentLoaded", function () {
  setUpProj4();
  setUpLayers();
});
