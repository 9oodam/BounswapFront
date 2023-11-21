import React, { useEffect } from 'react'
import useWeb3 from 'src/hooks/web3.hook';
import { useState } from 'react';

const TokenBox = () => {
    const { user, web3, dataContract } = useWeb3(null);
    const [tokens, setTokens] = useState<{
        uri: string;
        symbol: string;
        balance: bigint;
    }[]>([]);
    
    const tokenTest = [
        {
            uri : "uri",
            symbol : "eth",
            balance : 500000000000000n
        }, 
        {
            uri : "uri",
            symbol : "eth",
            balance : 50000000000000n
        }, 
        {
            uri : "uri",
            symbol : "eth",
            balance : 500000000000000n
        }, 
    ];

    // 
    const getData = async () => {
        // const data = await (dataContract?.methods.getUserPools as any)(user.account).call();
        // setPools(data);
        setTokens(tokenTest);

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
                tokens ?
                    <div className="w-full pc:p-7 mobile:mt-5">
                        <h3
                            className="font-bold text-[25px] text-left mb-5"
                        >
                            Tokens
                        </h3>
                        <div className="grid pc:grid-cols-3 mobile:grid-cols-2 w-full font-bold text-[20px] border-b-2 mb-3 items-center justify-center">
                            <div>img</div>
                            <div className="mobile:hidden">name</div>
                            <div>balance</div>
                        </div>

                        {/* <div className='h-[240px]'> */}
                            <div className="grid grid-cols-1 overflow-auto scrollbar overflow-y-scroll w-full h-full">
                                {tokens.map((el, index) => (
                                    <div key={index} className="w-full flex justify-around item-center">
                                        <img className="w-[30%]" src={el.uri} />
                                        <span className="w-[30%] mobile:hidden">
                                            {el.symbol}
                                        </span>
                                        <span className="w-[30%]">{web3?.utils.fromWei(el.balance, "ether")}</span>
                                    </div>
                                ))}
                            {/* </div> */}

                        </div>
                    </div>





                    :
                    <></>
            }
        </div>
    )
}

export default TokenBox