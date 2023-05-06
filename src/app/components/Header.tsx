'use client';
import Link from 'next/link';
import NavIcon from './ui/icons/NavIcon';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import StyledButton from './ui/StyledButton';
import Avatar from './Avatar';

const navList = [
  { icon: NavIcon('home'), iconFill: NavIcon('homeFill'), link: '/', title: 'Home' },
  { icon: NavIcon('search'), iconFill: NavIcon('searchFill'), link: '/search', title: 'Search' },
  { icon: NavIcon('new'), iconFill: NavIcon('newFill'), link: '/new', title: 'New' },
];
export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="sticky top-0 z-10 px-6 bg-white border-b border-gray-hot">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link aria-label="Home" href="/">
          <h1 className="text-2xl font-bold text-pink-light">Outstagram</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-4 p-4">
            {navList.map(({ icon, iconFill, link, title }) => (
              <li key={link}>
                <Link aria-label={title} href={link}>
                  {pathname === link ? iconFill : icon}
                </Link>
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
