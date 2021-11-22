const axios = require("axios");

async function getInfoFromCoord(lat, lon) {
  const response = await axios.get(
    `https://wms.cartografia.agenziaentrate.gov.it/inspire/ajax/ajax.php?op=getDatiOggetto&lon=${lon}&lat=${lat}`
  );

  if (response.data.length === 0) {
    return null;
  }

  return response.data;
}
let lon = "8.292854";
let lat = "44.926799";

getInfoFromCoord(lat, lon);

//https://github.com/ilmistra/catasto_web/blob/master/catasto.html
//https://medium.com/@p.mistrangelo/visualizzare-le-mappe-del-catasto-terreni-con-google-maps-473a44872962