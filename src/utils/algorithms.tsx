const rows = 3;
const cols = 3;

const img = new Image();

// imageObj.crossOrigin = "anonymous";
// img.onload = start;

function shuffle(a) {
    for (let j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    return a;
}

img.src = 'rose-blue-flower.jpeg';
function shuffleCanvas(canvas) {
    const ctx = canvas.getContext('2d');
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

export const splitImageToPieces = (tilesX, tilesY, canvas) => {
    const ctx = canvas.getContext('2d');
    const tileWidth = canvas.width / tilesX;
    const tileHeight = canvas.height / tilesY;
    const tileData: any = [];
    for (let i = 0; i < tilesY; i++) {
        for (let j = 0; j < tilesX; j++) {
            // Store the image data of each tile in the array.
            tileData.push(ctx.getImageData(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
        }
    }
    //From here you should be able to draw your images back into a canvas like so:
    const newCanvas: any = document.createElement('canvas');
    const newCtx = newCanvas.getContext('2d');

    return shuffle(
        tileData.map((tileImageData, index) => {
            newCanvas.width = tileData[1].width;
            newCanvas.height = tileData[1].height;
            newCtx.putImageData(tileImageData, 0, 0);
            const img = new Image();
            img.src = newCanvas.toDataURL('image/jpeg');
            img.id = `image-${index + 1}`;
            // img.onload = () => {
            //     document.body.appendChild(img);
            // };
            return img;
        }),
    );
};

export const splitImage: any = async (imageDataURL?: string) => {
    return new Promise((resolve, reject) => {
        const imageObj = new Image();
        imageObj.src = imageDataURL || 'rose-blue-flower.jpeg';
        imageObj.onload = () => {
            try {
                const canvas: any = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
                return resolve(splitImageToPieces(3, 4, canvas));
            } catch (e) {
                reject(e);
            }
        };
    });
};
