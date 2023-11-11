import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DataItem, DataArray } from "../../Interface/ReactNode.interface";

const StakeDetail = () => {
  const [lptokens, setLptokens] = useState([]);
  useEffect(() => {}, []);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<DataArray>("lpTokens");
  console.log("LpTokens", data);
  setLptokens(data);

  const params = useParams<{ id: string }>();
  console.log("params", params.id);

  const select = data.find((el: DataItem) => {
    return el.tokenCA == params;
  });
  return <div>StakeDetail</div>;
};

export default StakeDetail;
