// var methodOverride = require("method-override"), // allows for put() and delete()
// 	bodyParser = require('body-parser'),
// 	firebase = require('firebase');
var	express = require('express');
	

// // FIREBASE * * * * * * * * * * * * * * * * * * * * * 
// require('firebase/app');
// require('firebase/auth');
// require('firebase/database');
// require('firebase/storage');

// firebase.initializeApp({
// 	apiKey: "AIzaSyAYZ9Nb200nKhcGyHF11ABGshzcAMy5-k8",
// 	authDomain: "sample-firebase-b2d4d.firebaseapp.com",
// 	databaseURL: "https://sample-firebase-b2d4d.firebaseio.com",
// 	storageBucket: "sample-firebase-b2d4d.appspot.com",
// 	messagingSenderId: "875898499054"
//  });

// // The app only has access to public data as defined in the Security Rules
// var db = firebase.database();
// var ref = db.ref("/");
// var bellTowersRef = ref.child('sampleBellTowers');

// // CONFIGURE APP * * * * * * * * * * * * * * * * * * * * * 
app = express();
// app.use(methodOverride("_method"));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// app.set("view engine", "ejs");

// RESTFUL ROUTES * * * * * * * * * * * * * * * * * * * * * 
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server is baby listening");
});

app.get("/", function(req, res){
	// res.redirect("/towers");
	res.redirect("/angularfire.html");
});