const DashTitle = () => {
  return (
    <div className="grid pc:grid-cols-5 text-[20px] text-deepBlack dark:text-baseWhite font-bold mobile:hidden">
      <div className="pc:col-span-3">Proposals</div>
      <div>state</div>
      <div>deadline</div>
    </div>
  );
};

export default DashTitle;
