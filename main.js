img = "";
status = "";
objects= [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function draw(){
    image(video,0,0,380,380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i < objects.length; i++)
        {
            fill(r,g,b);
            document.getElementById("status").innerHTML = "Status - Object Detected";
            document.getElementById("number_of_objects").innerHTML = "How Many Objects Were Detected: "+objects.length;
            percentage = floor(objects[i].confidence *100);
            text(objects[i].label+" "+percentage+ "%",objects[i].x+15,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
        }
    }
}

function modelLoaded() { 
    console.log(" Model Loaded! :)");
    status= true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
    if(error){
        console.error(error);
    }
    console.log(results);
    objects= results;
}