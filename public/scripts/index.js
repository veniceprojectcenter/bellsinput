RegExp.quote = function(str) {
    return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

var text = ""

$("input[type = text]").keyup( function(param) {
	var _this = this;

	$(".towerContainer").each(function(div){
		$(this).show();
	});

	console.log("keyup");

	$(".towerContainer").each(function(div){
		text = $(this).find(".towerName").text();
		console.log("text:" + text + ".");

		// filter tower which contains the input text
		if ($(_this).val().length > 0 && !text.toLowerCase().match( $(_this).val().toLowerCase())) {
			$(this).hide();
		}

		// // filter tower which starts with the input text
		// if ($(_this).val().length > 0 && !text.toLowerCase().match( new RegExp("^" + RegExp.quote($(_this).val().toLowerCase())))) {
		// 	$(this).hide();
		// }
	});

	event.stopImmediatePropagation();
});