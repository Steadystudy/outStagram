type Props = {
  text: string;
  onClick: () => void;
};

export default function StyledButton({ text, onClick }: Props) {
  return (
    <div className="rounded-md bg-gradient-to-r from-pink-hot via-pink-light to-yellow-light p-[0.2rem]">
      <button
        className="bg-white rounded-sm p-[0.1rem] hover:opacity-75 transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
