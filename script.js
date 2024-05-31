const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const noise = (x, y) => {
    let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
};

const chunkSize = 16;
const scale = 50;

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 20,
    height: 40,
    speed: 5,
    dx: 0
};

const generateChunk = (offsetX, offsetY) => {
    const chunk = [];
    for (let x = 0; x < chunkSize; x++) {
        const row = [];
        for (let y = 0; y < chunkSize; y++) {
            const nx = (offsetX + x) / scale;
            const ny = (offsetY + y) / scale;
            row.push(noise(nx, ny));
        }
        chunk.push(row);
    }
    return chunk;
};

const drawChunk = (chunk, offsetX, offsetY) => {
    for (let x = 0; x < chunkSize; x++) {
        for (let y = 0; y < chunkSize; y++) {
            const value = chunk[x][y];
            ctx.fillStyle = `rgb(${value * 255}, ${value * 255}, ${value * 255})`;
            ctx.fillRect(offsetX + x * scale, offsetY + y * scale, scale, scale);
        }
    }
};

const loadChunks = (playerPosX) => {
    const chunksInView = 3; // Number of chunks to load around the player
    const chunkPixelSize = chunkSize * scale;
    const centerX = Math.floor(playerPosX / chunkPixelSize);
    const centerY = 0; // Only horizontal scrolling for sidescroller

    for (let x = -chunksInView; x <= chunksInView; x++) {
        const offsetX = centerX + x * chunkPixelSize;
        const offsetY = canvas.height - chunkPixelSize; // Draw at the bottom
        const chunk = generateChunk(offsetX, offsetY);
        drawChunk(chunk, offsetX, offsetY);
    }
};

const drawPlayer = () => {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);
};

const updatePlayerPosition = () => {
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const draw = () => {
    clearCanvas();
    loadChunks(player.x);
    drawPlayer();
    updatePlayerPosition();
    requestAnimationFrame(draw);
};

const moveRight = () => {
    player.dx = player.speed;
};

const moveLeft = () => {
    player.dx = -player.speed;
};

const stopMovement = () => {
    player.dx = 0;
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'a') {
        stopMovement();
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    loadChunks(player.x);
});

draw();
