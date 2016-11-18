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
				Object.keys(res).forEach(function(key){
					console.log(key);
					bc.belltowers[key] = key;
				});
				$scope.$apply();
				Object.keys(bc.belltowers).forEach(function(key){
					firebase.database().ref()
						.child("data")
						.child(key)
						.on('value', function(tower){
						// console.log("Fetch key", k, tower.val()['data']['Common name']);	
						bc.belltowers[key] = tower.val()['data']['Common name'];
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
			
			bc.bellTower_ref = firebase.database().ref()
				.child('data')
				.child(tower_id)
				.child('data');
			bc.bellTower_info = $firebaseObject(bc.bellTower_ref);
			previousRef = bc.bellTower_info;
			
			bc.bellTower_info.child('bells').on('value', function(bells_list){
				bc.bell_keys = Object.keys(bells_list.val());
				bc.bells = {};
				bc.bells_ref = {};
				bc.bell_keys.forEach(function(bk){
					bc.bells_ref[bk] = firebase.database().ref()
						.child('data')
						.child(bk)
						.child('data');
					bc.bells[bk] = $firebaseObject(bc.bells_ref[bk]);
					bc.bells[bk].$bindTo($scope, "bells[" + bk + "]");
				});
			});
			// synchronize the object with a three-way data binding
			// click on `index.html` above to see it used in the DOM!
			bc.bellTower_info.$bindTo($scope, "bellTower");
		};
		
		bc.editTower = function(tower_id){
			bc.unbind();
			bc.hideAll();
			$('#edit').show();
			console.log(tower_id);
			setUpCategoryClicks(); // from edit.js
			
			if (tower_id) { // TODO: send tower_id from index to show and from show to bc.editTower(tower_id)
			bc.tower_id = tower_id;
			console.log("TowerId", tower_id);
			bc.bellTower_ref = firebase.database().ref()
				.child('data')
				.child(tower_id)
				.child('data');
				bc.bellTower_info = $firebaseObject(bc.bellTower_ref);
				previousRef = bc.bellTower_info;
				// synchronize the object with a three-way data binding
				// click on `index.html` above to see it used in the DOM!
				bc.bellTower_info.$bindTo($scope, "bellTower");
			}
		};
		
		bc.addBell = function(){
			var groupName = 'Bells';
			
			// CREATE NEW KEY
			var newBellKey = firebase.database().ref().child('data').push().key;
			console.log("New Key", newBellKey);
			
			// save birth_certificate
			firebase.database().ref().child('data').child(newBellKey).update({
				birth_certificate: {
					birthID: newBellKey,
					ckID: newBellKey,
					// dor: (new Date()),
					recorder: 'oba',
					type: groupName
				},
				data: {
					ckID: newBellKey,
					tower_id: bc.tower_id
				}
			}).then(function(){
				// add element to group
				firebase.database().ref().
					child('groups').
					child(groupName).
					child('members').
					child(newBellKey).
					set(newBellKey);
				
				// add bell to belltower
				firebase.database().ref().
					child('data').
					child(bc.tower_id).
					child('data').
					child('bells').
					child(newBellKey).
					update({
						bellTower_ckId: newBellKey,
						name: "newBell"
					});
			});
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