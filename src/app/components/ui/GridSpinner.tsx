import dynamic from 'next/dynamic';

const GridLoader = dynamic(() => import('react-spinners').then((lib) => lib.GridLoader), {
  ssr: false,
});

export default function GridSpinner() {
  return <GridLoader />;
}
