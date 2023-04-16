import PostIcon from './ui/icons/PostIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-gray-light"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white" //
        onClick={() => onClose()}
      >
        {PostIcon('close')}
      </button>
      {children}
    </section>
  );
}
