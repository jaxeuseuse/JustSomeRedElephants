function outputText() {
  var inputText = document.getElementById("mytextbox").value;
  var outputDiv = document.getElementById("display_input_to_output_box");
  outputDiv.textContent = inputText;
}

function uploadImage(event) {
  event.preventDefault(); // Prevent form submission
  var fileInput = document.getElementById("fileInput");
  var uploadedImage = document.getElementById("uploadedImage");
  var outputDiv = document.getElementById("display_input_to_output_box");

  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    uploadedImage.src = event.target.result;
    outputDiv.textContent = "Image uploaded successfully!";
  };

  reader.readAsDataURL(file);

  // Create a FormData object and append the file to it
  var formData = new FormData();
  formData.append("file", file);

  // Send the FormData object to the server using Fetch API
  fetch("upload.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(message => console.log(message))
  .catch(error => console.error("Error:", error));
}