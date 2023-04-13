type Props = {
  image?: string | null;
  size?: 'sm' | 'md';
  border?: true | false;
};

export default function Avatar({ image, size = 'sm', border = true }: Props) {
  return (
    <div
      className={`rounded-full 
      ${border ? 'bg-gradient-to-tr from-yellow-light via-pink-light to-pink-hot' : ''}
      ${size === 'sm' ? `p-[0.15rem] w-10 h-10` : `p-[0.2rem] w-14 h-14`}`}
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
