$(document).ready(function () {
    const stage = document.getElementById('stage');
    const context = stage.getContext("2d");

    let speedX = 0;
    let speedY = 0;
    let positionX = 10;
    let positionY = 15;
    let squareSize = 20;
    let squareQty = 20;
    let bonusX = 5;
    let bonusY = 15;
    let tail = 5;

    const trail = [];
    const speed = 1;

    const keyPush = (event) => {
        switch (event.keyCode) {
            case 37: //left
                speedX = -speed;
                speedY = 0
                break;
            case 38: //up
                speedX = 0;
                speedY = -speed;
                break;
            case 39: //right
                speedX = speed;
                speedY = 0
                break;
            case 40: //down
                speedX = 0;
                speedY = speed
                break;
            default:
                break;
        }
    }

    document.addEventListener("keydown", keyPush)




    const game = () => {
        positionX += speedX;
        positionY += speedY;

        if (positionX < 0) {
            positionX = squareQty - 1;
        }
        if (positionX > squareQty - 1) {
            positionX = 0;
        }
        if (positionY < 0) {
            positionY = squareQty - 1;
        }
        if (positionY > squareQty - 1) {
            positionY = 0;
        }

        context.fillStyle = "black";
        context.fillRect(0, 0, stage.width, stage.height);

        context.fillStyle = "red";
        context.fillRect(bonusX * squareSize, bonusY * squareSize, squareSize, squareSize);

        context.fillStyle = "grey";
        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * squareSize, trail[i].y * squareSize, squareSize, squareSize);

            if (trail[i].x == positionX && trail[i].y == positionY) {
                speedX = speedY = 0;
                //window.alert("game over");
            }
        }

        trail.push({ x: positionX, y: positionY });
        while (trail.length > tail) {
            trail.shift();
        }

        if (bonusX === positionX && bonusY === positionY) {
            tail++;

            bonusX = Math.floor(Math.random() * squareQty)
            bonusY = Math.floor(Math.random() * squareQty)
        }
    };

    setInterval(game, 60);
});