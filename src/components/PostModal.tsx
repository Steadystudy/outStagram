import PostIcon from './ui/icons/PostIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-opacity-70 bg-gray-light"
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
      <div className="w-4/5 bg-white h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
