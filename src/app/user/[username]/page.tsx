import UserProfile from '@/app/components/UserProfile';
import { getUserForProfile } from '@/service/user';

type Props = {
  params: {
    username: string;
  };
};

export default async function Userpage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);

  return <UserProfile user={user} />;
}
