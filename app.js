var methodOverride = require("method-override"), // allows for put() and delete()
	firebase = require('firebase'),
	express = require('express'),
	bodyParser = require('body-parser');

// FIREBASE * * * * * * * * * * * * * * * * * * * * * 
require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

firebase.initializeApp({
	apiKey: "AIzaSyAYZ9Nb200nKhcGyHF11ABGshzcAMy5-k8",
	authDomain: "sample-firebase-b2d4d.firebaseapp.com",
	databaseURL: "https://sample-firebase-b2d4d.firebaseio.com",
	storageBucket: "sample-firebase-b2d4d.appspot.com",
	messagingSenderId: "875898499054"
 });

// The app only has access to public data as defined in the Security Rules
var db = firebase.database();
var ref = db.ref("/");
var bellTowersRef = ref.child('sampleBellTowers');

// CONFIGURE APP * * * * * * * * * * * * * * * * * * * * * 
app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// RESTFUL ROUTES * * * * * * * * * * * * * * * * * * * * * 
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server is baby listening");
});

app.get("/", function(req, res){
	res.redirect("/towers");
});

// INDEX ROUTE
app.get("/towers", function(req, res){
	bellTowersRef.once("value", function(towersSnapshot) {
		// The callback succeeded.
		res.render("index", {bellTowers: towersSnapshot});
	}, function(error) {
  		// The callback failed.
  		console.error(error);
	});
});

// NEW ROUTE
app.get("/towers/new", function(req, res){
	res.render("new");
});

// EDIT INTERIOR ROUTE
app.get("/towers/:id/interior/edit", function(req, res){
	bellTowersRef.child(req.params.id).once('value', function(towerSnapshot) {
		// The callback succeeded.
		res.render("editInterior", {tower: towerSnapshot});
	}, function(error) {
  		// The callback failed.
  		console.error(error);
	});
});

// CREATE ROUTE
app.post("/towers", function(req, res) {
	var numLandings = parseInt(req.body.bellTower.data.numLandings),
		bellTower = req.body.bellTower,
		newTowerKey = bellTowersRef.push(bellTower).key,
		updateTowerRef = firebase.database().ref('/sampleBellTowers/' + newTowerKey +'/data/landings');

	var floor = {
		field1 : '1',
		field2 : '2'
	};

	for (i = 1; i < numLandings + 1; i++) {
    	updateTowerRef.child('landing' + i).set(floor);
    }

    updateTowerRef.child('belfry').set(floor);
	updateTowerRef.child('groundFloor').set(floor);
	res.redirect("/");
});

// SHOW ROUTE
app.get("/towers/:id", function(req, res){
	bellTowersRef.child(req.params.id).once('value', function(towersSnapshot) {
		// The callback succeeded.
		res.render("show", {tower: towersSnapshot});
	}, function(error) {
  		// The callback failed.
  		console.error(error);
	});
});

// EDIT ROUTE
app.get("/towers/:id/edit", function(req, res){
	bellTowersRef.child(req.params.id).once('value', function(towerSnapshot) {
		// The callback succeeded.
		res.render("edit", {tower: towerSnapshot});
	}, function(error) {
  		// The callback failed.
  		console.error(error);
	});
});

// UPDATE ROUTE
app.put("/towers/:id", function(req, res){ 
	var bellTower = req.body.bellTower;
	var updateTowerRef = firebase.database().ref('/sampleBellTowers/' + req.params.id);
	// The callback succeeded.
	updateTowerRef.update(bellTower)
	res.redirect("/towers/" + req.params.id);
});

// DESTROY ROUTE
app.delete("/towers/:id", function(req, res){
	console.log('delete bro', req.params.id);
	bellTowersRef.child(req.params.id).remove();
	res.redirect("/towers");
});

