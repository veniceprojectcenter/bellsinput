$("#editGeneral").click(function(){
	var category = "general";
	hideAllData();
	showCategory(category);
});

$("#editExterior").click(function(){
	var category = "exterior";
	hideAllData();
	showCategory(category);
});

$("#editInterior").click(function(){
	var category = "interior";
	hideAllData();
	showCategory(category);
});

$("#editBells").click(function(){
	var category = "bells";
	hideAllData();
	showCategory(category);
});

function showCategory(category){
	$("#" + category + "Data").show();
	$("#dataCategorySpan").text(category.capitalize());
}

function hideAllData(){
	$("#generalData").hide();
	$("#exteriorData").hide();
	$("#interiorData").hide();
	$("#bellsData").hide();
}

// capitalize first word of string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
