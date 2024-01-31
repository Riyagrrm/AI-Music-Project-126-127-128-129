song1 = ""
song2 = ""
left_x = ""
left_y = ""
right_x = ""
right_y = ""
score_left = ""
score_right = ""
status1 = ""
status2 = ""
function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}
function modelLoaded() {
    console.log("modelLoaded")
}
function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")
    circle(left_x, left_y, 20)
    if (score_left > 0.2) {
        status1 = "true"
        if (status1 == "true")
        {
            circle(left_x, left_y, 20)
            song1.play()
            song2.stop()
            document.getElementById("Song_name").innerHTML = "Song - creepy music"
        }
    }
    else
    {
        status1 = "false"
        status2 = "true"
        song1.stop()
    }
    circle(right_x, right_y, 20)
    if (score_right > 0.2) {
        status2 = "true"
        if (status2 == "true")
        {
            circle(right_x, right_y, 20)
            song2.play()
            song1.stop()
            document.getElementById("Song_name").innerHTML = "Song - happy music"
        }
    }
    else
    {
        status1 = "true"
        status2 = "false"
        song2.stop()
    }
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        left_x = results[0].pose.leftWrist.x
        left_y = results[0].pose.leftWrist.y
        right_x = results[0].pose.rightWrist.x
        right_y = results[0].pose.rightWrist.y
        score_left = results[0].pose.keypoints[9].score
        score_right = results[0].pose.keypoints[10].score
    }
}