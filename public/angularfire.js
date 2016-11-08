// var config = {
//   apiKey: "AIzaSyAYZ9Nb200nKhcGyHF11ABGshzcAMy5-k8",
//   authDomain: "sample-firebase-b2d4d.firebaseapp.com",
//   databaseURL: "https://sample-firebase-b2d4d.firebaseio.com",
//   storageBucket: "sample-firebase-b2d4d.appspot.com",
//   messagingSenderId: "875898499054"
// };
var config = {
	apiKey: "AIzaSyC6NAfPU1NV6QJcqL4sg4VJGa9S7nVXP4Q",
	authDomain: "cityknowledge.firebaseapp.com",
	databaseURL: "https://cityknowledge.firebaseio.com",
	storageBucket: "firebase-cityknowledge.appspot.com",
	messagingSenderId: "445655714967"
};
firebase.initializeApp(config);

(function() {
	'use strict';
	var app = angular.module('app', [
		// 'ngRoute',
		'firebase'
	]);
	
	angular.module('app').controller('BellsController', function($scope, $firebaseObject) {
		var bc = this;
		bc.belltowers = {a: 1, b: 2, c: 4};

		firebase.database().ref()
			.child("groups")
			.child("Bell Tower Page Final")
			.child('members')
			.on('value', function(towerIDs) {
				var res = towerIDs.val();
				console.log("Loaded", res);
				for (var property in res) {
					if (res.hasOwnProperty(property)) {
						console.log("res has ", property);
						bc.belltowers[property] = property;
						firebase.database().ref()
							.child("data")
							.child(property).on('value', function(val2){ bc.belltowers[property] = val2.val()['Common name']});
					} else {
						console.log("res does not have ", property);
					}
				}
				console.log("bc.belltowers", bc.belltowers);
		});
		
		bc.chooseTower = function(tower_id){
			$('#bell_list').hide();
			$('#bell_info').show();
			// QUICKSTART
			// https://github.com/firebase/angularfire/blob/master/docs/quickstart.md
			bc.bell_ref = firebase.database().ref()
				.child("data")
				.child(tower_id)
				.child('data');
			bc.bell_info = $firebaseObject(bc.bell_ref);
			// synchronize the object with a three-way data binding
			// click on `index.html` above to see it used in the DOM!
			bc.bell_info.$bindTo($scope, "bell");
		};
	});

})();