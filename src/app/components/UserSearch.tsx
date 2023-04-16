'use client';
import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('민상기');
  const { data: users, isLoading, error } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full flex flex-col items-center max-w-[850px] my-4">
      <form className="w-full flex justify-center" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-hot mb-4"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>에러 발생</p>}
      {isLoading && <GridSpinner />}
      {!error && !isLoading && !users?.length && <p>검색 결과 없음</p>}
      <ul className="w-full">
        {users &&
          users?.map((user) => (
            <li key={user.name}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
