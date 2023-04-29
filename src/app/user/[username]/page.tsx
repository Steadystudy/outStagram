import UserPosts from '@/app/components/UserPosts';
import UserProfile from '@/app/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    username: string;
  };
};

export default async function Userpage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
  const user = await getUserForProfile(username);

  return {
    title: `${user?.name} (@${user?.username}) • Outstagram Posts`,
    description: `${user?.name}'s all Outstagram posts`,
  };
}
