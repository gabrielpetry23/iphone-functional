var tamBloco = 20;
var larguraTela = 15;
var alturaTela = 25;
var tela;
var c;
var unidade = larguraTela * alturaTela / (tamBloco * tamBloco);
var snakeX = tamBloco * 5;
var snakeY = tamBloco * 5;
var snakeBody = [];
var macaX;
var macaY;
var eixoX = 0;
var eixoY = 0;
var gameOver = false;
var score = 0;

window.onload = function() {
    tela = document.getElementById("tela");
    tela.height = alturaTela * tamBloco;
    tela.width = larguraTela * tamBloco;
    c = tela.getContext("2d");

    c.fillStyle = "#333";
    c.fillRect(0, 0, tela.width, tela.height);

    criarMaca();
    document.addEventListener("keyup", andar);
    setInterval(desenhaTela, 1000/10); 
}

function desenhaTela () {
    if (gameOver) {  
        return;
    }
    c.fillStyle="black";
    c.fillRect(0, 0, tela.width, tela.height);

    c.fillStyle="red";
    c.fillRect(macaX, macaY, tamBloco, tamBloco);

    if (snakeX == macaX && snakeY == macaY) {
        snakeBody.push([macaX, macaY])
        criarMaca();
        score++;
    }

    for (let i = snakeBody.length-1 ; i > 0 ; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    c.fillStyle="lime";
    snakeX += eixoX * tamBloco;
    snakeY += eixoY * tamBloco;
    c.fillRect(snakeX, snakeY, tamBloco, tamBloco);

    for (let i = 0 ; i < snakeBody.length ; i++) {
        c.fillRect(snakeBody[i][0], snakeBody[i][1], tamBloco, tamBloco);
    }

    limites();

    document.getElementById("score").textContent = "Score: " + score;
}

function criarMaca() {
    macaX = Math.floor(Math.random() * larguraTela) * tamBloco;
    macaY = Math.floor(Math.random() * alturaTela) * tamBloco;
}

function limites() {
    if (snakeX < 0 || snakeX > larguraTela*tamBloco || snakeY < 0 || snakeY > alturaTela*tamBloco) {
        gameOver = true;
        alert("You lost");
    }

    for (let i = 0 ; i < snakeBody.length ; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("You lost");
        }
    }
}

function andar(e) {
    if (e.code == "ArrowUp" && eixoY != 1) {
        eixoX = 0;
        eixoY = -1;
    }
    else if (e.code == "ArrowDown" && eixoY != -1) {
        eixoX = 0;
        eixoY = 1;
    }
    if (e.code == "ArrowLeft" && eixoX != 1) {
        eixoX = -1;
        eixoY = 0
    }
    if (e.code == "ArrowRight" && eixoX != -1) {
        eixoX = 1;
        eixoY = 0
    }
}

function restartGame() {
    snakeX = tamBloco * 5;
    snakeY = tamBloco * 5;
    snakeBody = [];
    macaX = 0;
    macaY = 0;
    eixoX = 0;
    eixoY = 0;
    gameOver = false;
    score = 0;
    c.clearRect(0, 0, tela.width, tela.height);
    desenhaTela();
}

function openAppScreen () {
    window.location.href = "app-screen.html";
}
