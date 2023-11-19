import React, { useEffect, useState } from "react";
import { Divstyle } from "src/App.style";
import Card from "src/components/Card";
import Container from "src/components/container";
import { getTime } from "src/features/getTime";

const Governance = () => {
  const [pop, setPop] = useState<Record<number, boolean>>({});
  const [nowTime, setNowTime] = useState<number>(0);

  useEffect(() => {
    var date = Date.now();
    var timestamp = date / 1000; // 형식화된 날짜 및 시간
    setNowTime(timestamp);
  }, []);
  /*
    uint id;             // 제안 id
    address proposer;    // 제출자 address
    bytes title;         // 제안 제목
    bytes description;   // 제안 내용
    uint quorumVotes;    // 최소 찬성 투표수
    uint forVotes;       // 찬성 투표수
    uint againstVotes;   // 반대 투표수
    uint startTime;      // 의제 제출 시간
    uint endTime;        // 투표 마감 시간
    ProposalState state; // 제안서 상태(0 : 투표중 / PENDING, 1 : 투표 통과 X / DEFEATED, 2 : 투표 통과됨 / EXECUTED)
*/
  const data = [
    {
      id: 1,
      proposer: "0x3422j2hg2i342lh43u343b2j24231kb3mko3b",
      title: "고구려의 흥망성쇠",
      description: "논산 육군훈련소에서 만난 고구려의 흥망성쇠 이대로 괜찮은가",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 100,
      startTime: 1699668671,
      endTime: 1703479365,
      state: 0,
    },
    {
      id: 2,
      proposer: "0x3422j2hg2i342lh43u343b2j24231kb3mko3b",
      title: "사직서",
      description:
        "안녕히 계세요! 여러분~ 이 세상의 속세를 어쩌구 자유를 찾아 떠납니다~",
      quorumVotes: 100,
      forVotes: 5,
      againstVotes: 1,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 3,
      proposer: "0x43n3kj4n5j3453hb53h245jb4b5kj3n425",
      title: "뽑비뽀",
      description:
        "뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀 뽀삐뽀삐뽀 뽀삐뽀",
      quorumVotes: 1000,
      forVotes: 1030,
      againstVotes: 300,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 2,
    },
    {
      id: 4,
      proposer: "0x657b6hm5b8578n64652l5347bh57645j6n3k45",
      title: "수 천년을 전해 오면서 입증된 마법의 주문",
      description: "상대의 화를 돋구는 주문 ====> 우짤래미",
      quorumVotes: 1000,
      forVotes: 200,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 1,
    },
    {
      id: 5,
      proposer: "0x14hj5264bk37468l745645k324j2b3k4b7543b",
      title: "모자장수 이야기",
      description:
        "모자장수 사업 성공 => 배탐 => 망함 => 반팔티 사업 => 긴팔장수와 운명의 대결 => 사망",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 6,
      proposer: "0x5k7lj8n78fch68gvj46bl35n4hv57h6b5lnj4kh5",
      title: "부탁드립니다.",
      description:
        "저에 대한 객관적인 비평? 피드백? 어쨋든 그런 거 원하지 않습니다. 무조건 박수갈채. 일방적이고 편향적인 칭찬 부탁드립니다.",
      quorumVotes: 1000,
      forVotes: 150,
      againstVotes: 300,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 7,
      proposer: "0x5j4657b689b6b5lj6l46vgjvkhj4n5k36m54b",
      title: "나라별 문학의 차이",
      description:
        "영국 문학 : 명예를 위해 죽겠다. 프랑스 문학: 사랑을 위해 죽겠다. 미국 문학: 자유를 위해 죽겠다. 조선 왕실 문학: 죽여보던가.",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 8,
      proposer: "0xx8c6v79889x8786c8v7z808csv7fb897adc98",
      title: "엄청난 김장감이 무엇인가요?",
      description: "아주 큰 배추인것 같습니다.",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 9,
      proposer: "0xjhv86s576b878a9b8d84a5b9860v8c8s7",
      title: "짬뽕이...",
      description:
        "짬뽕이 사진을 못 찍었다.... 어케 그럴 수가 있는가... 짬뽕아... 행복해야해....",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 10,
      proposer: "0xm5373j46ukjhk5c47h3j6k32jk3h46gvh64hjl6k3",
      title: "피할 수 없다면 즐....",
      description: "즐 입니다.",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 11,
      proposer: "0x65s46d589gdf9m8hcnxvc8z7Cbf8n7dg656b",
      title: "주말있는 삶이란...?",
      description:
        "몰라요,,, 주말이 뭐에요? 제 인생은 코딩 그 자체인지 오래됐는데,,,,",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 12,
      proposer: "0x8zvbx858n67xbczvx8c76543vzb8n78b675",
      title: "소금아 잘 지내?",
      description:
        "너의 그 뽀짝한 발재간을 본지 오래되서 그리워,,, 시간되면 보러갈게...",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 13,
      proposer: "0x765x3zDv7b8nmg0xv64c5z670xn98v7cv7808v9",
      title: "아싸 집가기 2시간 전",
      description:
        "집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... 집 가고 싶어요 보내주세요 왜 안보내줘? 아 맞네 그냥 내가 못 가는거지 참.... ",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 14,
      proposer: "0xkj4h546lk37jjn4j8bl43kl2jh4jghfg4jh36k5",
      title: "야호",
      description: "야호 야호 야호 야호 야호 야호 야호 야호 ",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
    {
      id: 15,
      proposer: "0xof8b765x6v7zc89xc0v87b65ndb64c6xz75776",
      title: "고구려의 흥망성쇠",
      description: "논산 육군훈련소에서 만난 고구려의 흥망성쇠 이대로 괜찮은가",
      quorumVotes: 1000,
      forVotes: 100,
      againstVotes: 30,
      startTime: 1699668671,
      endTime: 1700532671,
      state: 0,
    },
  ];

  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          Governance
        </div>
        <Card>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-[20px] text-deepBlack w-[60%]">
                  Proposals
                </th>
                <th className="text-[20px] text-deepBlack w-[20%]">state</th>
                <th className="text-[20px] text-deepBlack w-[25%]">deadline</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, index) => (
                <>
                  <tr
                    className="w-full text-deepBlack cursor-pointer hover:bg-opercityBlack"
                    onClick={() => {
                      setPop((pop) => ({ ...pop, [index]: !pop[index] })); // 행의 인덱스를 키로 사용하여 펼침 상태를 관리
                    }}
                  >
                    <td className=" h-[50px] w-[60%] text-left pl-5 font-bold">
                      {el.title}
                    </td>
                    {el.state == 0 ? (
                      <td className=" h-[50px] w-[20%]">
                        <div className="border-2 border-blue-400 text-blue-400 font-bold inline-flex justify-center items-center p-2 rounded-xl">
                          PENDING
                        </div>
                      </td>
                    ) : el.state == 1 ? (
                      <td className=" h-[50px] w-[20%]">
                        <div className="border-2 border-red-400 text-red-400 font-bold inline-flex justify-center items-center p-2 rounded-xl">
                          DEFEATED
                        </div>
                      </td>
                    ) : (
                      <td className=" h-[50px] w-[20%]">
                        <div className="border-2 border-green-400 text-green-400 font-bold inline-flex justify-center items-center p-2 rounded-xl">
                          EXECUTED
                        </div>
                      </td>
                    )}
                    <td className=" h-[50px] w-[20%]">{getTime(el.endTime)}</td>
                  </tr>

                  {pop[index] ? ( // 각 행의 펼침 상태를 기반으로 내용 행을 표시
                    <tr>
                      <td colSpan={3} className="border-2">
                        <div className="border-2 w-full flex flex-row p-5">
                          <div className="w-3/5">
                            <div className="border-2 w-full min-h-[200px] p-2 text-left">
                              {el.description}
                            </div>
                            <div className="w-full text-left p-2 ">
                              proposer by. <span>{el.proposer}</span>
                            </div>
                          </div>
                          <div className="w-2/5">
                            <div className="w-full flex flex-row justify-evenly">
                              <div>
                                찬성
                                {Math.round(
                                  (el.forVotes /
                                    (el.forVotes + el.againstVotes)) *
                                    100
                                )}
                                %
                              </div>
                              <div>
                                반대
                                {Math.round(
                                  (el.againstVotes /
                                    (el.forVotes + el.againstVotes)) *
                                    100
                                )}
                                %
                              </div>
                            </div>
                            <div>
                              투표 상황 멘트
                              {el.endTime < nowTime ? (
                                <div>투표기간 종료</div>
                              ) : el.forVotes < el.quorumVotes ? (
                                <div>방금 얻은 그 표. 나에게 주게.</div>
                              ) : (
                                <div>최소 투표 충족.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Container>
  );
};

export default Governance;
