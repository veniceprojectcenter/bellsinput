

$("#editGeneral").click(function(){
	hideAllData();
	$("#dataCategorySpan").text('General');
	$("#generalData").show();
});

$("#editExterior").click(function(){
	hideAllData();
	$("#dataCategorySpan").text('Exterior');
	$("#exteriorData").show();

});

$("#editInterior").click(function(){
	hideAllData();
	$("#dataCategorySpan").text('Interior');
	$("#interiorData").show();

});

$("#editBells").click(function(){
	hideAllData();
	$("#dataCategorySpan").text('Bells');
	$("#bellsData").show();

});

function hideAllData(){
	$("#generalData").hide();
	$("#exteriorData").hide();
	$("#interiorData").hide();
	$("#bellsData").hide();
}
