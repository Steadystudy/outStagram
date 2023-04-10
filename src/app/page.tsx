import { getServerSession } from 'next-auth';
import FollowingBar from './components/FollowingBar';
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <main>
      <FollowingBar />
      <PostList />
      <Sidebar user={user} />
    </main>
  );
}
