var MYLIBRARY = MYLIBRARY || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;
            // some other initialising
        },
        helloWorld : function() {
            alert('Hello World! -' + _args[0]);
        }
    };
}());

// $('#interiorData').children('div.ui.fluid.accordion').last().after( text );

$('#addLandingButton').click(function(){
	$('#interiorData').children('div.accordion').css({border:"5px solid red;", background: "red"});
	// after("<h2>New Landing</h2>");
});