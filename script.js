// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpAtcM4SInZkjY5FkdDsKCJsecZyvXWhU",
  authDomain: "sync-up-eddf8.firebaseapp.com",
  projectId: "sync-up-eddf8",
  storageBucket: "sync-up-eddf8.appspot.com",
  messagingSenderId: "693275590106",
  appId: "1:693275590106:web:892cf8605a66a1599a54e3",
  measurementId: "G-FNT5S755R9",
  databaseURL: "https://sync-up-eddf8-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const isPlayingRef = ref(database, `sync/isPlaying`);

// dom elements
const audioPlayer = document.getElementById("audio-player");

const syncWithFirebase = (fbRef) => {
  onValue(fbRef, (snapshot) => {
    if (!!snapshot.val()) {
      return audioPlayer.play();
    }
    audioPlayer.pause();
  });
};

const setDataInFirebase = (fbRef, data) => {
  set(fbRef, data);
};

audioPlayer.onplay = () => {
  setDataInFirebase(isPlayingRef, true);
};

audioPlayer.onpause = () => {
  setDataInFirebase(isPlayingRef, false);
};

syncWithFirebase();
