# Let us import the Libraries required.
import os
import cv2
import urllib
import numpy as np
from werkzeug.utils import secure_filename
from urllib.request import Request, urlopen
from flask import Flask, render_template, Response, request, redirect, flash, url_for

# Importing the required Classes/Functions from Modules defined.
from camera import VideoCamera
from main import Emotion_Analysis

# Let us Instantiate the app
app = Flask(__name__)

###################################################################################
# We define some global parameters so that its easier for us to tweak when required.

# When serving files, we set the cache control max age to zero number of seconds
# for refreshing the Cache
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

UPLOAD_FOLDER = 'static'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


###################################################################################
# Some Utility Functions

# Flask provides native support for streaming responses through the use of generator
# functions. A generator is a special function that can be interrupted and resumed.


def gen(camera):
    "" "Helps in Passing frames from Web Camera to server"""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')  # concat frame one by one and show result


def allowed_file(filename):
    """ Checks the file format when file is uploaded"""
    return ('.' in filename and
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS)


###################################################################################

@app.route('/')
def Start():
    """ Renders the Home Page """

    return render_template('start.html')


@app.route('/predict', methods=['POST'])
def predict():
    """ Captures Images from WebCam, saves them, does Emotion Analysis & renders. """

    v = VideoCamera()
    _, frame = v.video.read()
    save_to = "static/"
    cv2.imwrite(save_to + "capture" + ".jpg", frame)

    result = Emotion_Analysis("capture.jpg")

    try:

        if result[2] == "Happy":
            return render_template('emotionHappy.html')

        elif result[2] == "Sad":
            return render_template('emotionSad.html')

        elif result[2] == "Angry":
            return render_template('emotionAngry.html')

        elif result[2] == "Fear":
            return render_template('emotionFear.html')

        elif result[2] == "Surprise":
            return render_template('emotionSurprise.html')

        elif result[2] == "Neutral":
            return render_template('emotionNeutral.html')

        elif result[2] == "Disgust":
            return render_template('emotionDisgust.html')

    except IndexError:
        return render_template('error.html')


if __name__ == '__main__':
    app.run(debug=True)
