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
    <>
      <form onSubmit={onSubmit}>
        <input
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
      <ul>
        {users &&
          users?.map((user) => (
            <li key={user.name}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </>
  );
}
