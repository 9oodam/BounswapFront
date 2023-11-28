const TipSection = () => {
  return (
    <div className="w-full bg-[#9CE084] rounded-[20px] text-xl flex items-center justify-center shadow-md p-2">
      <div className="text-deepGreen">
        <strong>Tip:</strong> Select an action and describe your proposal for
        the community. The proposal cannot be modified after submission, so
        please verify all information before submitting. The voting period will
        begin immediately and last for 7 days. To propose a custom action, read
        the docs.
      </div>
    </div>
  );
};

export default TipSection;
