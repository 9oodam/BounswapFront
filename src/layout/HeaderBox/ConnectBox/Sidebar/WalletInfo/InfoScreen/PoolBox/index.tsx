import React, { useEffect } from 'react'
import { useState } from 'react';
import useWeb3 from 'src/hooks/web3.hook';

const PoolBox = () => {
    const { user, web3, dataContract } = useWeb3(null);

    const [pools, setPools] = useState<{
        token0Uri: string;
        token1Uri: string;
        token0Symbol: string;
        token1Symbol: string;
        tvl: bigint;
    }[]>([]);


    const poolTest = [
        {
            token0Uri: "token0Uri ",
            token1Uri: "token1Uri ",
            token0Symbol: "bnc",
            token1Symbol: "eth",
            tvl: 1000000000000000000n
        },
        {
            token0Uri: "token0Uri ",
            token1Uri: "token1Uri ",
            token0Symbol: "bnc",
            token1Symbol: "usdt",
            tvl: 2000000000000000000n
        },
        // {
        //     token0Uri: "token0Uri ",
        //     token1Uri: "token1Uri ",
        //     token0Symbol: "bnc",
        //     token1Symbol: "usdt",
        //     tvl: 2000000000000000000n
        // },
        // {
        //     token0Uri: "token0Uri ",
        //     token1Uri: "token1Uri ",
        //     token0Symbol: "bnc",
        //     token1Symbol: "usdt",
        //     tvl: 2000000000000000000n
        // },
        // {
        //     token0Uri: "token0Uri ",
        //     token1Uri: "token1Uri ",
        //     token0Symbol: "bnc",
        //     token1Symbol: "usdt",
        //     tvl: 2000000000000000000n
        // },
    ]

    // 
    const getData = async () => {
        // const data = await (dataContract?.methods.getUserPools as any)(user.account).call();
        // setPools(data);
        setPools(poolTest);

        // data[0].token0Uri
        // data[0].token1Uri
        // data[0].token0Symbol
        // data[0].token1Symbol
        // data[0].tvl
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {
                pools ?
                    <div className="w-full pc:p-7 mobile:mt-5">
                        <h3
                            className="font-bold text-[25px] text-left mb-5"
                        >
                            Pools
                        </h3>
                        <div className="grid pc:grid-cols-3 mobile:grid-cols-2 w-full font-bold text-[20px] border-b-2 mb-3 items-center justify-center">
                            <div>img</div>
                            <div className="mobile:hidden">name</div>
                            <div>lpToken</div>
                        </div>

                        {/* <div className='h-[240px]'> */}
                            <div className="grid grid-cols-1 overflow-auto scrollbar overflow-y-scroll w-full h-full">
                                {pools.map((el, index) => (
                                    // <div key={index} className="w-full flex justify-around">
                                    <div key={index} className="w-full flex justify-around item-center">
                                        <img className="w-[30%]" src={el.token0Uri} />
                                        <span className="w-[30%] mobile:hidden">
                                            {el.token0Symbol} - {el.token1Symbol}
                                        </span>
                                        <span className="w-[30%]">{web3?.utils.fromWei(el.tvl, "ether")}</span>
                                    </div>
                                ))}
                            {/* </div> */}

                        </div>
                    </div>


                    // <div className="pc:w-[85%] mobile:w-full text-baseWhite pc:p-7 mobile:mt-5">
                    //     <h3
                    //         className="font-bold text-[25px] text-left mb-5 [text-shadow:0px_4px_4px_#00000040] "
                    //     >
                    //         Pool History
                    //     </h3>
                    //     <div className="grid pc:grid-cols-3 mobile:grid-cols-2 w-full text-baseWhite font-bold text-[20px] border-b-2 mb-3 items-center justify-center">
                    //         <div>img</div>
                    //         <div className="mobile:hidden">name</div>
                    //         <div>lpToken</div>
                    //     </div>
                    //     <div className="grid grid-cols-1 gap-2 overflow-auto scrollbar overflow-y-scroll w-full h-60 text-baseWhite">
                    //         {pools.map((el, index) => (
                    //             <div key={index} className="w-full flex justify-around">
                    //                 <span className="w-[30%]">{el.token0Uri}</span>
                    //                 <span className="w-[30%] mobile:hidden">
                    //                     {el.token0Symbol} - {el.token1Symbol}
                    //                 </span>
                    //                 <span className="w-[30%]">{web3?.utils.fromWei(el.tvl, "ether")}</span>
                    //             </div>
                    //         ))}
                    //     </div>
                    // </div>



                    :
                    <></>
            }
        </div>
    )
}

export default PoolBox