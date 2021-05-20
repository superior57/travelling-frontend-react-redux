import React from 'react';
import { useDropzone } from 'react-dropzone';
import './style.scss';

function PhotoDropzone({ getFiles, type }) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*,video/*',
        onDrop: (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const formData = new FormData();
                const filetype = file.type.split('/')[0];
                filetype === 'image' ? formData.append('images', file): formData.append('videos', file);
                getFiles(formData, filetype);
            });
        }
    });

    return (
        <div className={type === 'venue' ? 'add-media-uploadedsection' : ''}>
            <div {...getRootProps({ className: 'dropzone-window' })}>
                <input {...getInputProps()} />
                <p>
                    Drag files here or <span className="browse-word">browse</span> to upload
            </p>
            </div>
        </div>
    );
}

export default PhotoDropzone;
