# Image detection App

## Setup

Clone the repo or download zip file and then run <code> npm install </code> to install all dependencies

<br> in the root project directory run <code> npm start </code> to start the server

## Routes

https://image-search-259413.appspot.com/imageupload -
<br> Gives you the Labels for an Uploaded Image

<br> https://image-search-259413.appspot.com/predict -
<br> Returns the Predicted_class_name and Predicted_class_score of dogs image trained in the dataset

<br> PS: I only trained three different labels in the Dogs dataset
<code> afghan_hound, beagle and maltease_dog </code>
<br> And the training and image labelling process was done Via the AUTOML Dashboard

## Postman

in the Request body when uploading an image, from the form-data
<br> The key should be the string "image" and the value should be the image file. e.g
<br> image "Image to be uploaded"
