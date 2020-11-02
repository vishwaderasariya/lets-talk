import firebase from "firebase";

{
  /* <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-analytics.js"></script> */
}

const firebaseConfig = {
  apiKey: "AIzaSyACaes69RzWJlz880QGLXaOAJzcnu_xt9w",
  authDomain: "let-stalk-3ea1b.firebaseapp.com",
  databaseURL: "https://let-stalk-3ea1b.firebaseio.com",
  projectId: "let-stalk-3ea1b",
  storageBucket: "let-stalk-3ea1b.appspot.com",
  messagingSenderId: "766968570467",
  appId: "1:766968570467:web:255c7df08a04d79ea80e56",
  measurementId: "G-YLX8EMPCPD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();
