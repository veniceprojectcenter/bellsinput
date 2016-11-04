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
undefined
authData
null
fb.authWithPassword({email: 'oba.seward@gmail.com', password: 'oba.seward'}, function (error, authData){ console.log(error); alert("ok"); })
Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}