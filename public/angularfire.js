var config = {
  apiKey: "AIzaSyAYZ9Nb200nKhcGyHF11ABGshzcAMy5-k8",
  authDomain: "sample-firebase-b2d4d.firebaseapp.com",
  databaseURL: "https://sample-firebase-b2d4d.firebaseio.com",
  storageBucket: "sample-firebase-b2d4d.appspot.com",
  messagingSenderId: "875898499054"
};

// var config = {
// 	apiKey: "AIzaSyC6NAfPU1NV6QJcqL4sg4VJGa9S7nVXP4Q",
// 	authDomain: "cityknowledge.firebaseapp.com",
// 	databaseURL: "https://cityknowledge.firebaseio.com",
// 	storageBucket: "firebase-cityknowledge.appspot.com",
// 	messagingSenderId: "445655714967"
// };

var fb = firebase.initializeApp(config);

(function() {
	'use strict';
	var app = angular.module('app', [
		// 'ngRoute',
		'firebase'
	]);
	
	angular.module('app').controller('BellsController', function($scope, $firebaseObject) {
		var bc = this;
		bc.belltowers = {};
		var previousRef;
		
		firebase.database().ref()
			.child("groups")
			.child("Bell Tower Page Final")
			.child('members')
			.on('value', function(towerIDs) {
				var res = towerIDs.val();
				console.log("Loaded", res);
				Object.keys(res).forEach(function(k){
					console.log(k);
					bc.belltowers[k] = k;
				});
				$scope.$apply();
				Object.keys(bc.belltowers).forEach(function(k){
					firebase.database().ref()
						.child("data")
						.child(k)
						.on('value', function(tower){
						// console.log("Fetch key", k, tower.val()['data']['Common name']);	
						bc.belltowers[k] = tower.val()['data']['Common name'];
						$scope.$apply();
					});
				});
			});

		$scope.$on('$includeContentLoaded', function () {
    		initApp();
		});

		bc.index = function(){
			bc.unbind();
			bc.hideAll();
			$('#index').show();
		};

		bc.showTower = function(tower_id){
			bc.unbind();
			bc.hideAll();
			$('#show').show();
			console.log(tower_id);
			
			bc.bell_ref = firebase.database().ref()
				.child('data')
				.child(tower_id)
				.child('data');
			bc.bell_info = $firebaseObject(bc.bell_ref);
			previousRef = bc.bell_info;
			// synchronize the object with a three-way data binding
			// click on `index.html` above to see it used in the DOM!
			bc.bell_info.$bindTo($scope, "bellTower");
		};
		
		bc.editTower = function(tower_id){
			bc.unbind();
			bc.hideAll();
			$('#edit').show();
			console.log(tower_id);
			setUpCategoryClicks(); // from edit.js
			
			if (tower_id) { // TODO: send tower_id from index to show and from show to bc.editTower(tower_id)
			bc.bell_ref = firebase.database().ref()
				.child('data')
				.child(tower_id)
				.child('data');
				bc.bell_info = $firebaseObject(bc.bell_ref);
				previousRef = bc.bell_info;
				// synchronize the object with a three-way data binding
				// click on `index.html` above to see it used in the DOM!
				bc.bell_info.$bindTo($scope, "bellTower");
			}
		};

		bc.hideAll = function() {
			$('#index').hide();
			$('#edit').hide();
			$('#show').hide();
		};

		bc.unbind = function() {
			/* 
			unbind fireAngular and inputs from the previousRef.
			*/

			if (previousRef) { // undbind
				previousRef.$destroy();
			}
		}
	});
})();