RegExp.quote = function(str) {
    return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

var text = "";

$("#searchTower").keyup( function(param) {
	var _this = this;
	var searchString = $(_this).val();

	$(".towerContainer").each(function(div) {
		$(this).hide();
	});


	if (searchString == "" || searchString == " ") {
		console.log("piss");
	} else {
		console.log("yes");
		$(".towerContainer").each(function(div) {
			towerNameStr = $(this).find(".towerName").text();

			// console.log(this);
			// console.log(searchString);
			// console.log(towerNameStr);

			
			// filter tower which contains the input text
			if (searchString.length > 0 && !towerNameStr.toLowerCase().match( searchString.toLowerCase()) ) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	}

	event.stopImmediatePropagation();
});