'use client';
import Link from 'next/link';
import NavIcon from './ui/icons/NavIcon';
import { usePathname } from 'next/navigation';

export default function Header() {
  const navList = [
    { icon: NavIcon('home'), iconFill: NavIcon('homeFill'), link: '/' },
    { icon: NavIcon('search'), iconFill: NavIcon('searchFill'), link: '/search' },
    { icon: NavIcon('new'), iconFill: NavIcon('newFill'), link: '/new' },
  ];

  const pathname = usePathname();
  return (
    <header>
      <Link href="/">Outstagram</Link>
      <nav>
        <ul>
          {navList.map(({ icon, iconFill, link }) => (
            <li key={link}>
              <Link href={link}>{pathname === link ? iconFill : icon}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
