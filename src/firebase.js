import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAHvCjKTP8xfRVcHn4Li95w9AEhDv_f5uA",
  authDomain: "platsbanket-react-test.firebaseapp.com",
  databaseURL: "https://platsbanket-react-test.firebaseio.com",
  projectId: "platsbanket-react-test",
  storageBucket: "platsbanket-react-test.appspot.com",
  messagingSenderId: "671479302238"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
