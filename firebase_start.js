// FB v1.x library

var fb_url = 'https://sample-firebase.firebaseio.com';
var fb = new Firebase(fb_url);
var authData = fb.getAuth();
var logged_in = (authData ? true : false);
vm.logout = function(){
  logged_in = false
  fb.unauth();
};

vm.login  = function(){
  fb.authWithPassword({
    email    : $('#login_user').val(),
    password : $('#login_pass').val()
  }, function (error, authData){
      console.log("xx");
      if (error) return alert("Error user-login: " + error);
      console.log("Autenticato");
      vm.logged_in = true; vm.authData = authData;
      setTimeout($scope.$apply, 250);
    });
  };
  
var fb_url = 'https://sample-firebase.firebaseio.com';
var fb = new Firebase(fb_url);
var authData = fb.getAuth();

if (authData)
  $('#loginform').hide();
else
  $('#loginform').show();

$('#loginform').on('submit', function(e){
  $('#loginform').disable();
  
  fb.authWithPassword({
    email: $('#loginform email').val(),
    password: $('#loginform password').val()
  }, function (error, authData){
    if (error)
      alert(error);
    else {
      $('#loginform').hide();
      authData = fb.getAuth();
    }
  });
  e.preventDefault();
});

// send to server:
fb.getAuth().token

// on server side use token to authenticate
  firebase.auth().signInWithCustomToken(token).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

undefined
authData
null
fb.authWithPassword({email: 'oba.seward@gmail.com', password: 'oba.seward'}, function (error, authData){ console.log(error); alert("ok"); })
Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}