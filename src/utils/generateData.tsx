export type RowType = {
    [key: string]: {
        id: string;
        image: any;
    };
};

export type ColumnType = {
    [key: string]: {
        id: string;
        title: string;
        rowIds: string[];
    };
};

export function generateData(numberOfX: number, numberOfY: number, imageDataArray: []) {
    const rows: RowType = {};
    imageDataArray.forEach((a, index) => {
        const id = `image-${index + 1}`;
        rows[id] = {
            id,
            image: a,
        };
    });

    const columns: ColumnType = {};

    for (let i = 0; i < numberOfY; ++i) {
        const id = `column-${i + 1}`;
        columns[id] = {
            title: id,
            id,
            rowIds: imageDataArray.slice(i * numberOfX, (i + 1) * numberOfX).map((image: any) => image.id),
        };
    }

    const columnOrder = Object.keys(columns);

    return {
        rows,
        columns,
        columnOrder,
    };
}
