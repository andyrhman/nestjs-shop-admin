import axios from 'axios';
import React from 'react'

const MultipleImageUploads = (props) => {
    const uploads = async (files) => {
        if (files === null) return;

        const urls = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            const { data } = await axios.post('upload', formData);

            urls.push(data.url);
        }

        props.uploaded(urls);
    }

    return (
        <>
            <input
                className="file-input file-input-bordered w-full max-w-full"
                type="file"
                multiple
                onChange={(e) => uploads(e.target.files)}
            />
        </>
    )
}

export default MultipleImageUploads;