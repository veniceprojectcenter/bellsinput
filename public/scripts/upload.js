function upload() {
	console.log('upload');

	// bc.hello();

	// Get elements
	var uploader = document.getElementById('uploader');
	var fileButton = document.getElementById('fileButton');

	// Get file
	var file = fileButton.files[0];

	// Create a storage ref
	storageRef = firebase.storage().ref('folder_name/' + file.name);

	// Upload file
	var uploadTask = storageRef.put(file);

	// Update progress bar
	uploadTask.on('state_changed',
		function progress(snapshot) {
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			uploader.value = percentage;
		}, 

		function error(err) {
			console.log(err);
		},

		function complete() {
			var downloadURL = uploadTask.snapshot.downloadURL;
			// $('#Bell Chorus Audio').val(downloadURL);
			console.log(downloadURL)
		}
	);
}