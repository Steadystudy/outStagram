import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewPost from '../components/NewPost';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function newPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }
  return <NewPost user={session.user} />;
}
