'use client';
import Link from 'next/link';
import NavIcon from './ui/icons/NavIcon';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import StyledButton from './ui/StyledButton';
import Avatar from './Avatar';

const navList = [
  { icon: NavIcon('home'), iconFill: NavIcon('homeFill'), link: '/' },
  { icon: NavIcon('search'), iconFill: NavIcon('searchFill'), link: '/search' },
  { icon: NavIcon('new'), iconFill: NavIcon('newFill'), link: '/new' },
];
export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="sticky top-0 bg-white z-10 border-b border-gray-hot px-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-pink-light text-2xl font-bold">Outstagram</h1>
        </Link>
        <nav>
          <ul className="flex gap-4 items-center p-4">
            {navList.map(({ icon, iconFill, link }) => (
              <li key={link}>
                <Link href={link}>{pathname === link ? iconFill : icon}</Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href={`/user/${user.username}`}>
                  <Avatar image={user.image} />
                </Link>
              </li>
            )}
            <li>
              {session ? (
                <StyledButton
                  text="Sign Out"
                  onClick={() => {
                    signOut();
                  }}
                />
              ) : (
                <StyledButton
                  text="Sign in"
                  onClick={() => {
                    signIn();
                  }}
                />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
