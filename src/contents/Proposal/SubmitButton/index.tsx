interface submitButtonProps {
  onClick: () => Promise<void>;
}

const SubmitButton: React.FC<submitButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full min-w-[340px] h-[60px] bg-lightGreen rounded-[20px] mt-[18px] text-xl font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md"
    >
      Submit proposal
    </button>
  );
};

export default SubmitButton;
