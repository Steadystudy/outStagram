type Props = { image?: string | null };

export default function Avatar({ image }: Props) {
  return (
    <div className="rounded-full w-9 h-9">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        className="rounded-full"
        alt={'user profile'}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
