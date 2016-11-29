var config = {
  apiKey: "AIzaSyAYZ9Nb200nKhcGyHF11ABGshzcAMy5-k8",
  authDomain: "sample-firebase-b2d4d.firebaseapp.com",
  databaseURL: "https://sample-firebase-b2d4d.firebaseio.com",
  storageBucket: "sample-firebase-b2d4d.appspot.com",
  messagingSenderId: "875898499054"
};

var currentTowerID;

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
		'ngRoute',
		'firebase'
	]);
	
	app.config(function($routeProvider) {
	    $routeProvider
	    .when("/towers", { 								// index 
	        templateUrl : "views/partials/index.htm"
	    })
	    .when("/towers/:tower_id", { 					// show 
	        templateUrl : "views/partials/show.htm"
	    })
	    .when("/towers/:tower_id/edit", { 				// edit 
	        templateUrl : "views/partials/edit.htm"
	    })	    
	    .when("/analysis", { 				// edit 
	        templateUrl : "views/partials/analysis.htm"
	    }).otherwise('views/partials/analysis.htm');
	});

	angular.module('app').controller('BellsController', function($scope, $firebaseObject) {
		var bc = this;
		bc.belltowers = {};
		var previousRef;

		// check for route changes
		$scope.$on( "$routeChangeStart", function(event, to, from) {
			if (to.originalPath == null) { return; }

			if (to.originalPath.includes("/towers/:tower_id")) { // show or edit
				bc.loadTower(to.params.tower_id);
			}
		});
		
		firebase.database().ref()
			.child("groups")
			.child("Bell Tower Page Final")
			.child('members')
			.on('value', function(towerIDs) {
				var res = towerIDs.val();
				// console.log("Loaded", res);
				Object.keys(res).forEach(function(key){
					// console.log(key);
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

		// INDEX * INDEX * INDEX * INDEX * INDEX * INDEX
		bc.index = function(){
			bc.unbind();
			// bc.hideAll();
			$('#index').show();
			currentTowerID = null;
		};

		// LOAD * LOAD * LOAD * LOAD * LOAD * LOAD
		bc.loadTower = function(tower_id){
			bc.unbind();
			// bc.hideAll();

			currentTowerID = tower_id;
			$scope.current_tower_id = tower_id;
			
			console.log("TowerId", tower_id);
			bc.bellTower_ref = firebase.database().ref()
				.child('data')
				.child(tower_id)
				.child('data');
			bc.bellTower_info = $firebaseObject(bc.bellTower_ref);
			previousRef = bc.bellTower_info;

			// load up bells
			bc.bellTower_ref.child('bells').on('value', function(bells_list){
				if (bells_list.val()) {
					bc.bell_keys = Object.keys(bells_list.val());
					bc.bells = {};
					bc.bells_ref = {};
					bc.bell_keys.forEach(function(bk){
						bc.bells_ref[bk] = firebase.database().ref()
							.child('data')
							.child(bk)
							.child('data');
						bc.bells[bk] = $firebaseObject(bc.bells_ref[bk]);
						// bc.bells[bk].$bindTo($scope, "bells[" + bk + "]");
						bc.bells[bk].$bindTo($scope, "bells['" + bk + "']");
					});
				} else {
					bc.bells = [];
				}
			});

			// load up landings
			bc.bellTower_ref.child('landings').on('value', function(landings_list){
				if (landings_list.val()) {
					bc.landing_keys = Object.keys(landings_list.val());
					bc.landings = {};
					bc.landings_ref = {};
					bc.landing_keys.forEach(function(lk){
						bc.landings_ref[lk] = firebase.database().ref()
							.child('data')
							.child(lk)
							.child('data');
						bc.landings[lk] = $firebaseObject(bc.landings_ref[lk]);
						// bc.landings[lk].$bindTo($scope, "landings[" + lk + "]");
						bc.landings[lk].$bindTo($scope, "landings['" + lk + "']");
					});
				} else {
					bc.landings = [];
				}

			});
			// synchronize the object with a three-way data binding
			// click on `index.html` above to see it used in the DOM!
			bc.bellTower_info.$bindTo($scope, "bellTower");
		};
		
		// ADD BELL * ADD BELL * ADD BELL * ADD BELL * ADD BELL
		bc.addBell = function(){
			var groupName = 'Bells';
			
			// CREATE NEW KEY
			var newBellKey = firebase.database().ref().child('data').push().key;
			console.log("New Key", newBellKey);
			
			// save bith_certificate
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
					tower_id: currentTowerID,
					name: "new Bell x"
				}
			})
			.then(function(){
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
					child(currentTowerID).
					child('data').
					child('bells').
					child(newBellKey).
					update({
						ckId: newBellKey,
						name: "new Bell x"
					});
			});
		};

		// ADD BELL * ADD BELL * ADD BELL * ADD BELL * ADD BELL
		bc.addLanding = function(){
			var groupName = 'Landings';
			
			// CREATE NEW KEY
			var newLandingKey = firebase.database().ref().child('data').push().key;
			console.log("New Key", newLandingKey);
			
			// save bith_certificate
			firebase.database().ref().child('data').child(newLandingKey).update({
				birth_certificate: {
					birthID: newLandingKey,
					ckID: newLandingKey,
					// dor: (new Date()),
					recorder: 'oba',
					type: groupName
				},
				data: {
					ckID: newLandingKey,
					tower_id: currentTowerID,
					name: "new Landing x"
				}
			})
			.then(function(){
				// add element to group
				firebase.database().ref().
					child('groups').
					child(groupName).
					child('members').
					child(newLandingKey).
					set(newLandingKey);
				
				// add landing to belltower
				firebase.database().ref().
					child('data').
					child(currentTowerID).
					child('data').
					child('landings').
					child(newLandingKey).
					update({
						ckId: newLandingKey,
						name: "new Landing x"
					});
			});
		};

		bc.removeLanding = function(tower_id, landing_id){
			// console.log("trying to remove landing: ", landing_id, " from tower: ", tower_id);
			console.log("TODO: find way to send landing_id to removeLanding function");
			firebase.database().ref().child('data').child(tower_id).child('data').child('landings').child(landing_id).remove();
		}

		bc.removeBell = function(tower_id, bell_id){
			// console.log("trying to remove landing: ", bell_id, " from tower: ", tower_id);
			console.log("TODO: find way to send bell_id to removeLanding function");
			firebase.database().ref().child('data').child(tower_id).child('data').child('bells').child(bell_id).remove();
		}

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