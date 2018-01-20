// Initialize Firebase
var config = {
    apiKey: "AIzaSyDhA40i9F4dnLUb4DJvq0fmkfNfcsiPHm8",
    authDomain: "cabbageauth.firebaseapp.com",
    databaseURL: "https://cabbageauth.firebaseio.com",
    projectId: "cabbageauth",
    storageBucket: "cabbageauth.appspot.com",
    messagingSenderId: "297466138163"
};
firebase.initializeApp(config);

function register(event) {
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).then( function(resp) {
        console.log(resp);
        $("#authRegister").modal('hide');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("there was an error")
        console.log(errorMessage)
        // ...
    });
}
function login(evt) {
    evt.preventDefault();
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(resp) {
        $("#authLogin").modal('hide');
        console.log('signed in');
        console.log(resp);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("there was an error")
        console.log(errorMessage)
    });
}

function logout(evt) {
    evt.preventDefault();
    firebase.auth().signOut();
}

function welcomeUser(user) {
    $('.user-welcome a').show(function() {
        $('.user-welcome a').html(user.email)
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('.auth').hide();
        $('.auth-logout').show();
        welcomeUser(user)
        // User is signed in.
        var email = user.email;
        var displayName = user.displayName;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
    } else {
        $('.auth').show();
        $('.user-welcome a').hide();
        $('.auth-logout').hide();
    }
});


