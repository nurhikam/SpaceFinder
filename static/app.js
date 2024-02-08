import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

function sendToFlask(snapshot) {
  // Format the time and day data as required
  var formattedData = {
    time: formatTime(snapshot.time), // Implement this function as needed
    day: snapshot.day
  };

  fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedData)
  })
  .then(response => response.json())
  .then(predictions => {
    // Handle predictions
  })
  .catch(error => console.error('Error:', error));
}


// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFl10puGolr4eyo7p5UUHpmHWLR1fYrj0",
  authDomain: "tesfb-e0dc8.firebaseapp.com",
  databaseURL: "https://tesfb-e0dc8-default-rtdb.firebaseio.com",
  projectId: "tesfb-e0dc8",
  storageBucket: "tesfb-e0dc8.appspot.com",
  messagingSenderId: "265412901817",
  appId: "1:265412901817:web:baebf0ea165732900f1468",
  measurementId: "G-ZRSF1E7KZN",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const connect_db = ref(db, "/");

var value1, value2, value3, value4, value5, value6, value7;

// function get data firebase
function readFire() {
  onValue(connect_db, (snapshot) => {
    var retrieve_data = snapshot.val();

    //slot1
    var r1 = 1;
    var key1 = Object.keys(retrieve_data)[r1];
    var value = retrieve_data[key1];
    updateSlotSatu(value);
    consoleReadSatu(value);

    //slot2
    var r2 = 2;
    var key2 = Object.keys(retrieve_data)[r2];
    var value = retrieve_data[key2];
    updateSlotDua(value);
    consoleReadDua(value);

    //slot3
    var r3 = 3;
    var key3 = Object.keys(retrieve_data)[r3];
    var value = retrieve_data[key3];
    updateSlotTiga(value);
    consoleReadTiga(value);

    //slot4
    var r4 = 4;
    var key4 = Object.keys(retrieve_data)[r4];
    var value = retrieve_data[key4];
    updateSlotEmpat(value);
    consoleReadEmpat(value);

    //slot5
    var r5 = 5;
    var key5 = Object.keys(retrieve_data)[r5];
    var value = retrieve_data[key5];
    updateSlotLima(value);
    consoleReadLima(value);

    //slot6
    var r6 = 6;
    var key6 = Object.keys(retrieve_data)[r6];
    var value = retrieve_data[key6];
    updateSlotEnam(value);
    consoleReadEnam(value);

    //slot7
    var r7 = 7;
    var key7 = Object.keys(retrieve_data)[r7];
    var value = retrieve_data[key7];
    updateSlotTujuh(value);
    consoleReadTujuh(value);
  });
}

//function console read slot
function consoleReadSatu(value) {
  value1 = value;
  console.log("Data yang diambil dari Database : ", value1);
}
function consoleReadDua(value) {
  value2 = value;
  console.log("Data yang diambil dari Database : ", value2);
}
function consoleReadTiga(value) {
  value3 = value;
  console.log("Data yang diambil dari Database : ", value3);
}
function consoleReadEmpat(value) {
  value4 = value;
  console.log("Data yang diambil dari Database : ", value4);
}
function consoleReadLima(value) {
  value5 = value;
  console.log("Data yang diambil dari Database : ", value5);
}
function consoleReadEnam(value) {
  value6 = value;
  console.log("Data yang diambil dari Database : ", value6);
}
function consoleReadTujuh(value) {
  value7 = value;
  console.log("Data yang diambil dari Database : ", value7);
}

// function update slot
function updateSlotSatu(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot1");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 1: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotSatu(1);

function updateSlotDua(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot2");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 2: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotDua(1);

function updateSlotTiga(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot3");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 3: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotTiga(1);

function updateSlotEmpat(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot4");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 4: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotEmpat(1);

function updateSlotLima(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot5");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 5: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotLima(1);

function updateSlotEnam(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot6");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 6: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotEnam(1);

function updateSlotTujuh(textslot) {
  var value = textslot;
  var slotElement = document.getElementById("slot7");

  // Menghapus kelas warna sebelumnya
  slotElement.classList.remove("red", "default");

  // Menambahkan kelas warna berdasarkan nilai
  if (value == 1) {
      slotElement.classList.add("red");
  } else {
      slotElement.classList.add("default");
  }

  // Memperbarui teks di dalam elemen
  slotElement.innerHTML = "Slot 7: " + value;
  console.log("Hasil: " + value);
}

// Contoh pemanggilan fungsi
updateSlotTujuh(1);

//tombol prediksi manual
function predictManually() {
  const statusParking = document.getElementById("parkingStatus");
  if (statusParking.textContent === "Loading...") {
    statusParking.textContent = "on";
  } else {
    statusParking.textContent = "Daftar Area Parkir Tersedia";
  }
}

readFire();
setInterval(readFire, 1000);
var predinterval = setInterval(readFire, 1000);
consoleReadSatu();
setInterval(consoleReadSatu, 1000);
var predinterval = setInterval(consoleReadSatu, 1000);
consoleReadDua();
setInterval(consoleReadDua, 1000);
var predinterval = setInterval(consoleReadDua, 1000);
consoleReadTiga();
setInterval(consoleReadTiga, 1000);
var predinterval = setInterval(consoleReadTiga, 1000);
consoleReadEmpat();
setInterval(consoleReadEmpat, 1000);
var predinterval = setInterval(consoleReadEmpat, 1000);
consoleReadLima();
setInterval(consoleReadLima, 1000);
var predinterval = setInterval(consoleReadLima, 1000);
consoleReadEnam();
setInterval(consoleReadEnam, 1000);
var predinterval = setInterval(consoleReadEnam, 1000);
consoleReadTujuh();
setInterval(consoleReadTujuh, 1000);
var predinterval = setInterval(consoleReadTujuh, 1000);
predictManually();
