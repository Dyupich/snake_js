const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

let dir;
document.addEventListener("keydown", event => {
    if((event.keyCode == 37 || event.keyCode == 65) && dir != "right") {
        dir = "left";
    }

    if((event.keyCode == 38 || event.keyCode == 87) && dir != "down") {
        dir = "up";
    }

    if((event.keyCode == 39 || event.keyCode == 68) && dir != "left") {
        dir = "right";
    }

    if((event.keyCode == 40 || event.keyCode == 83) && dir != "up") {
        dir = "down";
    }
});


function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            gameOver();
        }
    }
}
function gameOver() {
    clearInterval(game);
    alert("Game over!\nYour score: " + score + "\nPress F5 to restart.")
}


let game = setInterval(
    () => {
        context.drawImage(ground, 0, 0);
        context.drawImage(foodImg, food.x, food.y);
    
        for(let i = 0; i < snake.length; i++) {
            context.fillStyle = i == 0 ? "red" : "green";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    
        context.fillStyle = "white";
        context.font = "50px Arial";
        context.fillText(score, box * 2.5, box * 1.75);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;


        if (snakeX == food.x && snakeY == food.y) {
            score++;
                food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box,
            };

        } else {
            snake.pop();
        }

        if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
            gameOver();
        }

        if (dir == "left") snakeX -= box;
        if (dir == "right") snakeX += box;
        if (dir == "up") snakeY -= box;
        if (dir == "down") snakeY += box;

        let newHead = {
            x: snakeX,
            y: snakeY,
        };

        eatTail(newHead, snake);

        snake.unshift(newHead)
    }, 80);