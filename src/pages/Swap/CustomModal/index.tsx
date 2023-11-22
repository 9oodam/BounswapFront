import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useQueryClient } from "react-query";
import { DataArray } from "src/Interface/Token.interface";
import SelectToken from "./SelectToken";

const CustomModal: React.FC<{ data: DataArray }> = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const [tokens, setTokens] = useState<
    {
      uri: string;
      symbol: string;
      balance: bigint;
    }[]
  >([]);

  const tokenData = [
    {
      tokenAddress: "0x1aaaaa123123213213213123213213123",
      name: "Stake",
      symbol: "STK",
      uri: "/images/LPToken_Steake2.png",
      tvl: 500000000000000n,
      balance: 500000000000000n,
    },
  ];

  const getData = async () => {
    // const data = await (dataContract?.methods.getUserPools as any)(user.account).call();
    // setPools(data);
    setTokens(tokenData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("tokens:", tokens);
  }, [tokens]);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>버튼</button>
      {/* <div className="flex"> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg max-w-2xl w-[100%] " // 너비 조절
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
      >
        <div>
          <div className="w-full">Select a token</div>
        </div>
        <div className="h-60 w-full bg-red-600 center">
          <SelectToken data={data} />
        </div>
      </Modal>
      {/* </div> */}
    </div>
  );
};

export default CustomModal;
