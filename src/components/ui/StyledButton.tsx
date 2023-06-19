type Props = {
  text: string;
  onClick: () => void;
  size?: 'sm' | 'xl';
};

export default function StyledButton({ text, onClick, size = 'sm' }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-r from-pink-hot via-pink-light to-yellow-light
      ${size === 'sm' ? `p-[0.3rem]` : `p-[0.2rem]`}
    `}
    >
      <button
        className={`bg-white rounded-sm hover:opacity-75 transition-opacity
          ${size === 'sm' ? `p-[0.1rem] text-base` : `p-2 text-2xl`}
        `}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
