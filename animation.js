let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Carregar a imagem
const imageMouse = new Image();
imageMouse.src = "./images/conorMouse.png";  // Altere o caminho para a imagem que você deseja usar

// Definir o tamanho desejado para a imagem (por exemplo, 30x30 pixels)
const mouseImageWidth = 65;
const mouseImageHeight = 80;

// Função para desenhar a imagem do mouse no canvas
function movMouse(event) {
    const x = event.clientX - canvas.offsetLeft;  // Subtrai a posição do canvas na tela
    const y = event.clientY - canvas.offsetTop;   // Subtrai a posição do canvas na tela

    // Limpar o canvas para desenhar a imagem no novo local
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a imagem do mouse com o tamanho ajustado
    ctx.drawImage(imageMouse, x - mouseImageWidth / 2, y - mouseImageHeight / 2, mouseImageWidth, mouseImageHeight);

    console.log(`Mouse X: ${x}, Mouse Y: ${y}`);
}

// Adicionar o evento de movimento do mouse ao canvas
canvas.addEventListener("mousemove", movMouse);
