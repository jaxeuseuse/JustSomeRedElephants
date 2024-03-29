<?php
$targetDir = "/var/www/taken/";
chmod("/var/www/taken/",0777);
if (!empty($_FILES["file"])) {
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    // Check if file already exists
    if (file_exists($targetFilePath)) {
        echo "Sorry, file already exists.";
    } else {
        // Upload file to server
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
            echo "The file ".$fileName. " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
} else {
    echo "No file uploaded.";
}
?>
