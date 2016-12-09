var	express = require('express');

// // CONFIGURE APP * * * * * * * * * * * * * * * * * * * * * 
app = express();
app.use(express.static("public"));

// ROUTES * * * * * * * * * * * * * * * * * * * * * 
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server is baby listening to port", port);
});

// index
app.get("/", function(req, res){
	res.redirect("/angularfire.html");
});
