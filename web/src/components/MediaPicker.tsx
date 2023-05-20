"use client";

import { ChangeEvent, useState } from "react";

export const MediaPicker = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const { type } = files[0];
    const imgType = type.split("/");
    const previewURL = URL.createObjectURL(files[0]);

    if (type === `image/${imgType[1]}`) {
      setPreviewImg(previewURL);
    } else {
      setPreview(previewURL);
    }
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      {previewImg ? (
        <img
          src={previewImg}
          alt="preview image"
          className="aspect-video rounded-lg object-cover"
        />
      ) : (
        preview && (
          <video
            src={preview}
            controls
            className="aspect-video rounded-lg object-cover"
          />
        )
      )}
    </>
  );
};
