import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DataItem, DataArray } from "../../Interface/ReactNode.interface";
import Container from "../../components/container";
import Card from "../../components/Card";
import { Divstyles } from "./StakeDetail.style";
import TokenName from "src/components/TokenName";
import { useNavigate } from "react-router-dom";
import VolumeCotainer from "src/contents/StakeDetail/VolumeCard";

const StakeDetail = () => {
  // ! async-await 써서 확실하게 순서를 잡자. 지금 순서가 꼬여버려서 안되는 것,,,,
  const [lptokens, setLptokens] = useState<DataArray | null>(null);
  const [selectToken, setSelectTokens] = useState<DataItem | null>(null);
  const params = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<DataArray>("lpTokens");

  const nav = useNavigate();
  useEffect(() => {
    // if (data) {
    //   console.log("data", data);
    //   setLptokens(data);
    // }

    const getLptokens = async () => {
      const data = await queryClient.getQueryData<DataArray>("lpTokens");
      // console.log("❗️data", data);
      setLptokens(data ? data : null);
      // console.log("@@lptokens", lptokens);
    };
    getLptokens();
  }, [lptokens]);
  // console.log("LpTokens", data);

  // console.log("params", params.id);

  useEffect(() => {
    if (lptokens) {
      const find = async () => {
        const select = await lptokens.find((el: DataItem) => {
          // console.log("el", el);
          return el.tokenCA == params.id;
        });
        // console.log("선택", select);
        setSelectTokens(select ? select : null);
        console.log("⭐️⭐️⭐️selectToken", selectToken);
      };
      find();
    }
  }, [lptokens, params.id, selectToken]);

  // useEffect(() => {}, [selectToken]);

  return (
    <>
      {selectToken && (
        <TokenName
          tokenImg={selectToken.tokenImg}
          tokenName={selectToken.tokenName}
          tokenSymbol={selectToken.tokenSymbol}
          onClick={() => {
            console.log("click????");
            nav(-1);
          }}
        />
      )}
      <Container>
        <div className={Divstyles.flexRow}>
          <div className={Divstyles.flexCol}>
            <VolumeCotainer />
            {selectToken?.APR}
            <Card>sd</Card>
          </div>
          <div>
            <Card>sd</Card>
            <Card>sd</Card>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StakeDetail;
