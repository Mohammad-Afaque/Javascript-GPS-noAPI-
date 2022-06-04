let CURRENT_LOCATION = null;
let A = null;
let B = null;

function main() {
  let geolocation = null;
  if (window.navigator && window.navigator.geolocation) {
    geolocation = window.navigator.geolocation;
  }
  if (geolocation) {
    geolocation.watchPosition(onLocationUpdate, onError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
    });
  } else {
    alert("Cannot get location");
  }
}
function onLocationUpdate(event) {
  CURRENT_LOCATION = event.coords;
  document.getElementById("loc").innerHTML =
    "Your Location : <br> Lat: " +
    CURRENT_LOCATION.latitude +
    "<br> Lon: " +
    CURRENT_LOCATION.longitude;
}
function onError(err) {
  alert("Cannot get location", err);
}
function setA() {
  A = CURRENT_LOCATION;
  updateInfo();
}
function setB() {
  B = CURRENT_LOCATION;
  updateInfo();
}
function updateInfo() {
  if (A != null) {
    document.getElementById("aBtn").innerHTML =
      A.latitude + "<br>" + A.longitude;
  }

  if (B != null) {
    document.getElementById("bBtn").innerHTML =
      B.latitude + "<br>" + B.longitude;
  }

  if (A != null && B != null) {
    let dist = getDistance(A, B);
    document.getElementById("info").innerHTML =
      "|<br>|<br>|<br>|<br>|<br>distance: " +
      dist +
      " meters.<br>|<br>|<br>|<br>|<br>|<br>";
  }
}
function getDistance(locton1, locton2) {
  const R = 6371000;
  const xyz1 = latLonXYZ(locton1, R);
  const xyz2 = latLonXYZ(locton2, R);
  const euc1 = euclidean(xyz1, xyz2);
  return euc1;
}

function latLonXYZ(lacton, R) {
  const xyz = { x: 0, y: 0, z: 0 };
  xyz.y = Math.sin(degToRad(lacton.latitude)) * R;
  const r = Math.cos(degToRad(lacton.latitude)) * R;
  xyz.x = Math.sin(degToRad(lacton.longitude)) * r;
  xyz.z = Math.cos(degToRad(lacton.longitude)) * r;
  return xyz;
}
function degToRad(degree) {
  return (degree * Math.PI) / 180;
}
function euclidean(p1, p2) {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) +
      (p1.y - p2.y) * (p1.y - p2.y) +
      (p1.z - p2.z) * (p1.z - p2.z)
  );
}
