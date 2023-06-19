type Size = 'sm' | 'md' | 'lg' | '2xl';

type Props = {
  image?: string | null;
  size?: Size;
  border?: true | false;
};

export default function Avatar({ image, size = 'sm', border = true }: Props) {
  return (
    <div
      className={`rounded-full 
      ${border ? 'bg-gradient-to-tr from-yellow-light via-pink-light to-pink-hot' : ''}
      ${getContainerSize(size)}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        className="rounded-full object-cover border-2 border-white"
        alt={'user profile'}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerSize(size: Size): string {
  switch (size) {
    case 'sm':
      return `p-[0.15rem] w-10 h-10`;
    case 'md':
      return `p-[0.15rem] w-12 h-12`;
    case 'lg':
      return `p-[0.2rem] w-16 h-16`;
    case '2xl':
      return `p-[0.2rem] w-40 h-40`;
    default:
      return '';
  }
}
