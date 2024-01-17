song1 = ""
song2 = ""
left_x = ""
left_y = ""
right_x = ""
right_y = ""
function preload()
{
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function setup()
{
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}
function modelLoaded()
{
    console.log("modelLoaded")
}
function draw()
{
    image(video, 0, 0, 600, 500)
}
function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results)
        left_x = results[0].pose.leftWrist.x
        left_y = results[0].pose.leftWrist.y
        right_x = results[0].pose.rightWrist.x
        right_y = results[0].pose.rightWrist.y
    }
}