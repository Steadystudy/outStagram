'use client';

import { DetailUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import { ChangeEvent, DragEvent, useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import Image from 'next/image';

type Props = {
  user: DetailUser;
};

export default function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <section className="flex flex-col items-center w-full max-w-xl mt-6">
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className="flex flex-col w-full mt-2">
        <input
          className="hidden"
          name="uploadInput"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`relative flex flex-col items-center justify-center w-full h-60 ${
            !file && 'border-2 border-pink-light border-dashed'
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 pointer-events-none bg-green-light"></div>
          )}
          {!file && (
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <FaRegFileImage size={60} className="text-zinc-400" />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="mt-4 text-lg border outline-none border-gray-light"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="Write a caption..."
        />
        <button className="font-bold bg-pink-light">Publish</button>
      </form>
    </section>
  );
}
