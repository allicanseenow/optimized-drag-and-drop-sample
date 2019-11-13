const canvas: any = document.getElementById('canvas');
console.log('canvas is ', canvas)
const ctx = canvas.getContext('2d');

const canvas2: any = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

const cw = canvas.width;
const ch = canvas.height;

const rows = 3;
const cols = 3;

const img = new Image();

// imageObj.crossOrigin = "anonymous";
// img.onload = start;

function shuffle(a) {
    for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    return a;
}

img.src = 'rose-blue-flower.jpeg';
function start() {
    const iw = (canvas.width = img.width);
    const ih = (canvas.height = img.height);
    const pieceWidth = iw / cols;
    const pieceHeight = ih / rows;

    const pieces = [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 },
        { col: 0, row: 1 },
        { col: 1, row: 1 },
        { col: 2, row: 1 },
        { col: 0, row: 2 },
        { col: 1, row: 2 },
        { col: 2, row: 2 },
    ];
    shuffle(pieces);

    console.log('pieces is ', pieces);

    let i = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const p = pieces[i++];
            ctx.drawImage(
                // from the original image
                img,
                // take the next x,y piece
                x * pieceWidth,
                y * pieceHeight,
                pieceWidth,
                pieceHeight,
                // draw it on canvas based on the shuffled pieces[] array
                p.col * pieceWidth,
                p.row * pieceHeight,
                pieceWidth,
                pieceHeight,
            );
        }
    }
}

export const test = (tilesX, tilesY) => {
    const tileWidth = canvas.width / tilesX;
    const tileHeight = canvas.height / tilesY;
    const totalTiles = tilesX * tilesY;
    const tileData: any = [];
    for (let i = 0; i < tilesY; i++) {
        for (let j = 0; j < tilesX; j++) {
            // Store the image data of each tile in the array.
            const canvas = document.createElement('canvas');
            const image = new Image();
            image.onload = () => {
            };
            tileData.push(ctx.getImageData(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
        }
    }
    //From here you should be able to draw your images back into a canvas like so:

    console.log('tileData is ', tileData);
    const img = new Image();
    ctx2.putImageData(tileData[2], 0, 0);
    img.src = canvas2.toDataURL('image/jpeg');
    document.body.appendChild(img);
    img.onload = () => {

        console.log('you know')
    };
};

export const run = () => {
    console.log('run this');
    // img.onload = start;
    // start();
    const imageObj = new Image();
    imageObj.src = 'rose-blue-flower.jpeg';
    console.log('imageObj.width is ', imageObj.width)
    imageObj.onload = () => {
        ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
        test(3, 3);
    };
};
