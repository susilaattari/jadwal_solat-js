function jadwalSolatAPI(latitude, longtitude) {
  fetch(
    `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longtitude}&method=4`
  )
    .then((response) => response.json())
    .then((response) => {
      //Mengambil tanggal di komputer user
      const date = new Date();
      const today = date.getDate() - 1; //tanggal sekarang - 1 karena mengikuti array yang di API
      const data = response.data[today].timings;

      let app = document.getElementById("app");
      let table = document.createElement("table");
      let tbody = document.createElement("tbody");

      //   Pemaggilan object data dengan For in
      for (i in data) {
        let row = tbody.insertRow(); //membuat row
        let name = row.insertCell(0); //membuat columnt
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i]; //data dengan key nama
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
      app.appendChild(table);
    });
}

function success(position) {
  jadwalSolatAPI(position.coords.latitude, position.coords.longitude);
}

function error() {
  jadwalSolatAPI("-6.200000", "106.816666");
}

function userLocation() {
  if (!navigator.geolocation) {
    alert("Browser Anda Tidak didukung Oleh Lokasi ini");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function index() {
  const app = document.getElementById("app");
  const h3 = document.createElement("h3");
  h3.innerHTML = "Jadwal Solat";

  app.append(h3);

  userLocation();
}

index();
