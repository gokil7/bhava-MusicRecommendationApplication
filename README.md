# bhava - A Music Recommendation Application
A Music Recommendation web application which detects the mood of the user and accordingly recommends a curated playlist w.r.t to their emotion. 🎵

## This application essentially consists of 2 parts:
* [The Start Page](#start-page)
* [The Music Player Page](#music-player)

## Start Page
* To detect emotions, a 2DCNN model was created which could detect human emotions with high accuracy. To initialise the deep learning model in the backend which is maintained by Flask, we use the START button, after which respective emotion is detected and the user is redirected to a Music Player page.
* Dataset used to train the model: <a href="https://www.kaggle.com/msambare/fer2013">FER 2013 Dataset</a>
* The Start page has a animated background, which uses Font Awesome icons and is animated using css animation, keyframes properties.

<img src="https://user-images.githubusercontent.com/51751331/138316404-8a23c5b6-e39f-4596-9df5-cfb99165efc0.gif" width="80%"></img> 

## Music Player
* This is the site users are redirected to after their emotions are detected.
* This page contains a Music player container, which autoplays the music as the page loads and has basic player features such as Play/Pause/Next/Previous, Track Time, Music/Author name.
* There is a side container, which displays the Emotion detected to the user, along with a quote specific to the emotion.
 
<img src="https://user-images.githubusercontent.com/51751331/138317356-6c61e9b1-0bb8-4e51-9edf-8eae19e18a27.jpg" width="80%"></img> 

## Modules Used

## Future Work
* To host this app live, probably to Heroku. Not able to currently do this, because as of now, project use OpenCV's cv2.VideoCapture() to capture the frames from webcam, but the drawback of this method being it works on the computer where the code is hosted. If I were to host this app live, then the project will be hosted on a Heroku server and thus will access that server's camera, which is not what we want, we want the client's camera, also there is no camera in server.., so to work around this WebRTC is used. So future work will be to implement WebRTC protocols in the project to communicate between server and client.


### Thank You 👋
