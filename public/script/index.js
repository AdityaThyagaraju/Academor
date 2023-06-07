document.querySelector("#city-sub").addEventListener("click", (el) => {
  const city = $("#city-inp").val();
  fetch(`http://localhost:3000/city`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city: city }),
  })
    .then((respons) => respons.text())
    .then((data) => {
      document.body.innerHTML = data;
    });
});

document.querySelector("#lat-long-sub").addEventListener("click", (el) => {
  const lat = $("#lat-inp").val();
  const long = $("#long-inp").val();
  fetch(`http://localhost:3000/latLong`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat:lat,long:long }),
  })
    .then((respons) => respons.text())
    .then((data) => {
      document.body.innerHTML = data;
    });
});

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  const lat = crd.latitude;
  const long = crd.longitude;
  fetch(`http://localhost:3000/latLong`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat:lat,long:long }),
  })
    .then((respons) => respons.text())
    .then((data) => {
      document.body.innerHTML = data;
    });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

document.querySelector("#cur-loc").addEventListener("click",(el)=>{
  navigator.geolocation.getCurrentPosition(success, error, options);
})