/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // When the user clicks on the button, open the modal 
    document.getElementById("buttonToShowLogin").onclick = function() {
        showLoginModal();
        firebase.auth().signOut();
    }
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        /* document.getElementById('quickstart-verify-email').disabled = true; */
        // [END_EXCLUDE]
        if (user) {
            hideErrorMessage();
            // User is signed in.
            var email = user.email;
            var displayName = email.split("@")[0];
            var emailVerified = user.emailVerified;
            // [START_EXCLUDE silent]
            document.getElementById('sign-in-status').textContent = displayName; 
            if (!emailVerified) {
                /* document.getElementById('quickstart-verify-email').disabled = false; */
            }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE silent]
            showLoginModal();
            document.getElementById('sign-in-status').textContent = 'Sign In';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        /* document.getElementById('quickstart-sign-in').disabled = false; */
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
}

/* HELPER FUNCTIONS * HELPER FUNCTIONS * HELPER FUNCTIONS * HELPER FUNCTIONS * */

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        return false;
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            setErrorMessage('Please enter an email address.');
            return false;
        }
        if (password.length < 4) {
            setErrorMessage('Please enter a password.');
            return false;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            // success
        }).catch(function(error) { // unsuccessful login.
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                setErrorMessage('Wrong password.');
            } else {
                setErrorMessage(errorMessage);
            }
            console.log(error);
            showLoginModal(); // show the login screen again
            // [END_EXCLUDE]
        });
        // does not mean successful login due to asynchronous login:
        return true; 
        // [END authwithemail]     
    }
}

function setErrorMessage(message) {
    $("#loginErrorContainer").show();
    $("#loginError").text(message);
}

function hideErrorMessage() {
    $("#loginErrorContainer").hide();
    $("#loginError").text("");
}

function showLoginModal() {
    console.log('showing modal')
    $('#loginModal')
      .modal({
        blurring: true,
        closable  : false,
        onDeny    : function(){
          return false; // do not close.
        },
        onApprove : function() {
            if (toggleSignIn()) {
                return true; // close modal.
            } else {
                return false; // do not close.
            }
        }
    }).modal('show');
}