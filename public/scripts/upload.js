function showUpload(tower_id) {
    $('#uploadModal')
      .modal({
        blurring: true,
        closable  : true,
        onDeny    : function(){
          return false; // do not close.
        },
        onApprove : function() {
        	upload(tower_id);
            return false; // do not close.
        }
    }).modal('show');
}

function upload(tower_id) {
	console.log('upload');

    // var scope = angular.element($("#body-scope")).scope();
    // scope.$apply(function(){
    //     scope.hello();
    // })

	// Get elements
	var uploader = document.getElementById('uploader');
	var fileButton = document.getElementById('fileButton');

	// Get file
	var file = fileButton.files[0];

	console.log(file)

	// added file.lastModified so that files with the same file name don't overwrite
	var refString = 'Bell_Tower_Media/'+ tower_id + '/' + file.lastModified + '_' + file.name;
	console.log(refString);

	// Create a storage ref
	storageRef = firebase.storage().ref( refString );

	// Upload file
	var uploadTask = storageRef.put(file);

	// Update progress bar
	uploadTask.on('state_changed',
		function progress(snapshot) {
			$('#uploader').show();
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			uploader.value = percentage;
		}, 

		function error(err) {
			console.log(err);
		},

		function complete() {
			var downloadURL = uploadTask.snapshot.downloadURL;
			$('#fileDownloadLink').attr("href", downloadURL);
			$('#fileDownloadLink').text(downloadURL);
			$('#successfulUploadText').show();
			console.log(downloadURL)
		}
	);
}