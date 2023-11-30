import { Dispatch, SetStateAction } from 'react';

interface proposalFormProps {
  setTitle : Dispatch<SetStateAction<string>>;
  setDescription : Dispatch<SetStateAction<string>>;
}

const ProposalForm : React.FC<proposalFormProps>= ({setTitle, setDescription}) => {
  return (
    <div className="bg-cardWhite w-full mt-[18px] pt-3 pb-3 pl-4 pr-4 rounded-[20px] border-[2px] border-[#22222212]">
      <div className="font-semibold text-[20px] mb-4">Proposal</div>
      <div className="mt-[10px] mb-[7px]">
        <input
          onChange={(e)=>{setTitle(e.target.value)}}
          className="w-full text-xl outline-none border-none bg-transparent overflow-hidden text-ellipsis"
          placeholder="Proposal Title"
          autoCapitalize="off"
          autoComplete="off"
          type="text"
        />
        <hr />
      </div>
      <textarea
        onChange={(e)=>{setDescription(e.target.value)}}
        className="w-full h-auto min-h-[535px] text-base resize-none outline-none border-none bg-transparent overflow-hidden"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="## Summary Insert your summary here ## Methodology Insert your methodology here ## Conclusion Insert your conclusion here"
      />
    </div>
  );
};

export default ProposalForm;
