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

const loadChunks = () => {
    const chunksInView = 3; // Number of chunks to load around the player
    const chunkPixelSize = chunkSize * scale;
    const centerX = Math.floor(canvas.width / 2 / chunkPixelSize);
    const centerY = Math.floor(canvas.height / 2 / chunkPixelSize);

    for (let x = -chunksInView; x <= chunksInView; x++) {
        for (let y = -chunksInView; y <= chunksInView; y++) {
            const offsetX = centerX + x * chunkPixelSize;
            const offsetY = centerY + y * chunkPixelSize;
            const chunk = generateChunk(offsetX, offsetY);
            drawChunk(chunk, offsetX, offsetY);
        }
    }
};

loadChunks();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    loadChunks();
});
