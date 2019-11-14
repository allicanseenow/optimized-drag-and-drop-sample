import React, { useCallback, useEffect, useState } from 'react';

import { splitImage } from '../../utils';

export const GameContainer = () => {
    const [file, setFile] = useState([]);
    const [imageDataURL, setImageDataURL] = useState();

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
            splitImage(imageDataURL).then(res => {
                console.log('res is ', res);
            });
        }
    }, [imageDataURL]);

    return (
        <div>
            <input type="file" onChange={onUploadImage} accept="image/*" />
        </div>
    );
};
