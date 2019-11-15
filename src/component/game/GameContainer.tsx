import React, { useCallback, useEffect, useState } from 'react';

import { splitImage, generateData } from '../../utils';
import { DraggableContainer } from './DraggableContainer';

export const GameContainer = () => {
    const [file, setFile] = useState([]);
    const [imageDataURL, setImageDataURL] = useState();
    const [data, setData] = useState();

    const onUploadImage = useCallback(e => {
        const reader = new FileReader();
        if (e.target.files) {
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function(evt: any) {
                if (evt.target.readyState === FileReader.DONE) {
                    setImageDataURL(evt.target.result);
                }
            };
            setFile(file);
        }
    }, []);

    useEffect(() => {
        if (imageDataURL) {
            splitImage(imageDataURL).then((res: []) => {
                console.log('res is ', res);
                const data = generateData(3, 3, res);
                setData(data);
            });
        }
    }, [imageDataURL]);

    console.log('game is ', data)
    return (
        <div>
            <input type="file" onChange={onUploadImage} accept="image/*" />
            {data && <DraggableContainer data={data} />}
        </div>
    );
};
