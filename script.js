var images=[];
var movingImage;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function docReady(){
    window.addEventListener('keydown', movePlayer);
    window.addEventListener('mousedown', imageClicked);
}

function addPlayer(){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => 
    {
        let img = new Image();
        img.onload = () => {
            images.push({ image: img, x: Math.floor(Math.random() * 1100 ), y: Math.floor(Math.random() * 500 ) })
            movingImage=images[images.length-1];
            drawCanvas();
        };
        img.src = URL.createObjectURL(input.files[0]); // Get a temporary URL for the selected image
    };
    
    input.click();
}

function drawCanvas(){
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i=0; i<images.length; i++){
        ctx.drawImage(images[i].image, images[i].x, images[i].y, 100, 100); // Draw the image on the canvas 
    }
}


function movePlayer(event){
    switch(event.keyCode){
        case 37:
            movingImage.x-=15;
            drawCanvas();
            break;
        case 39:
            movingImage.x+=15;
            drawCanvas();
            break;
        case 38:
            movingImage.y-=15;
            drawCanvas();
            break;
        case 40:
            movingImage.y+=15;
            drawCanvas();
            break;
    }
}


function imageClicked(event){
    
    for (let i=0; i<images.length; i++){
        if(event.clientX>images[i].x && event.clientX<images[i].x+100)
            if(event.clientY>images[i].y && event.clientY<images[i].y+100)
                movingImage=images[i];

    }

}