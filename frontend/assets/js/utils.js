function bbox(x, y, z) {
  bl_lng = tile2long(x, z);
  tr_lng = tile2long(x + 1, z);
  bl_lat = tile2lat(y + 1, z);
  tr_lat = tile2lat(y, z);
  bl = proj4("WGS84", "EPSG:6706", [bl_lng, bl_lat]);
  tr = proj4("WGS84", "EPSG:6706", [tr_lng, tr_lat]);
  return bl[1] + "," + bl[0] + "," + tr[1] + "," + tr[0];
}

function tile2long(x, z) {
  return (x / Math.pow(2, z)) * 360 - 180;
}

function tile2lat(y, z) {
  let n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}
