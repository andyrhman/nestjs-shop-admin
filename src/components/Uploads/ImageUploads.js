import axios from 'axios';
import React from 'react'

const ImageUploads = (props) => {

    const upload = async (files) => {
        if (files === null) return;

        const formData = new FormData();
        formData.append('image', files[0]);

        const {data} = await axios.post('upload', formData);

        props.uploaded(data.url);
    }

    return (
        <>
            <input
                className="file-input file-input-bordered w-full max-w-full"
                type="file"
                onChange={(e) => upload(e.target.files)}
            />
        </>
    )
}

export default ImageUploads;