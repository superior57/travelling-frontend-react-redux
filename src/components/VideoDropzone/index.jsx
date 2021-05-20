import React from 'react';
import { useDropzone } from 'react-dropzone';
import './style.scss';

function VideoDropzone({ getFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('videos', file);
      });
      getFiles(formData, acceptedFiles, 2);
    }
  });

  return (
    <div {...getRootProps({ className: 'dropzone-video' })}>
      <input {...getInputProps()} />
      <span />
      <p>Add a video</p>
    </div>
  );
}

export default VideoDropzone;
