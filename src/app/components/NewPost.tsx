'use client';

import { DetailUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GridSpinner from './ui/GridSpinner';

type Props = {
  user: DetailUser;
};

export default function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return setError('이미지를 넣어주세요');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex flex-col items-center w-full max-w-xl mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 text-center bg-sky-200 pt-[30%] opacity-50">
          <GridSpinner />
        </div>
      )}
      {error && <p className="w-full text-center text-red-600 bg-red-100">{error}</p>}
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className="flex flex-col w-full mt-2" onSubmit={handleSubmit}>
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
          ref={textRef}
        />
        <button className="font-bold bg-pink-light" type="submit">
          Publish
        </button>
      </form>
    </section>
  );
}
