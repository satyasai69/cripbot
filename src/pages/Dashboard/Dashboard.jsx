import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function Dashboard() {
  /* const [TotalStaked30, setTotalStaked30] = useState(0);
  const [TotalStaked60, setTotalStaked60] = useState(0);
  const [TotalStaked90, setTotalStaked90] = useState(0);
  const [TotalStaked180, setTotalStaked180] = useState(0); */

  const { address } = useAccount();
  const [stakingData, setStakingData] = useState([
    { amount: 0, reward: 0, lockTime: 30 },
    { amount: 0, reward: 0, lockTime: 60 },
    { amount: 0, reward: 0, lockTime: 90 },
    { amount: 0, reward: 0, lockTime: 180 },
  ]);

  const contractAddress = "0xb9A06d63CB788819b41dba689cC74B0Ff94cD6BF";
  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider(
          `https://data-seed-prebsc-2-s1.bnbchain.org:8545`
        );

        const abi = [
          {
            inputs: [
              {
                internalType: "contract IERC20",
                name: "_stakingToken",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_apr",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "reward",
                type: "uint256",
              },
            ],
            name: "RewardsClaimed",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "lockTime",
                type: "uint256",
              },
            ],
            name: "Staked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "reward",
                type: "uint256",
              },
            ],
            name: "Withdrawn",
            type: "event",
          },
          {
            inputs: [],
            name: "APR",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "SECONDS_IN_YEAR",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "claimRewards",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
            ],
            name: "getTotalStakedByLockPeriod",
            outputs: [
              {
                internalType: "uint256[4]",
                name: "",
                type: "uint256[4]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
            ],
            name: "getUserRewards",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
            ],
            name: "getUserStakes",
            outputs: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startTime",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "lockTime",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "reward",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "withdrawn",
                    type: "bool",
                  },
                  {
                    internalType: "bool",
                    name: "rewardsClaimed",
                    type: "bool",
                  },
                ],
                internalType: "struct StakingContract.Stake[]",
                name: "",
                type: "tuple[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            name: "lockTimeOptions",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_lockTime",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_extraTokenReceiver",
                type: "address",
              },
            ],
            name: "refferstake",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_lockTime",
                type: "uint256",
              },
            ],
            name: "stake",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            name: "stakes",
            outputs: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lockTime",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reward",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "withdrawn",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "rewardsClaimed",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "stakingToken",
            outputs: [
              {
                internalType: "contract IERC20",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_lockTime",
                type: "uint256",
              },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

        // Instantiate the token contract
        const tokenContract = new ethers.Contract(
          contractAddress,
          abi,
          provider
        );
        const apr = await tokenContract.APR();

        // Fetch user balance
        const totalStaked = await tokenContract.getTotalStakedByLockPeriod(
          address
        );
        /* setTotalStaked30(ethers.utils.formatUnits(totalStaked[0], 18));
        setTotalStaked60(ethers.utils.formatUnits(totalStaked[1], 18));
        setTotalStaked90(ethers.utils.formatUnits(totalStaked[2], 18));
        setTotalStaked180(ethers.utils.formatUnits(totalStaked[3], 18)); */
        //  setPrice(ethers.utils.formatEther(TokenPrice)); // Assuming the token uses Ether-like decimals
        // console.log(Price, "claim rewards");

        const updatedData = stakingData.map((data, index) => ({
          amount: ethers.utils.formatUnits(totalStaked[index], 18),
          reward: apr.toString() /*ethers.utils.formatUnits(
            ethers.BigNumber.from(totalStaked[index])
              .mul(apr)
              .mul(data.lockTime)
              .div(365)
              .div(100),
            18
          ), */,
          lockTime: data.lockTime,
        }));

        setStakingData(updatedData);
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, [contractAddress, address, stakingData]);
  return (
    <div>
      <div className="overview">
        <Navbar />
        <div>
          <div className="Toastify"></div>
          <div className="container"></div>
          <div className="inner-staking">
            <div className="container">
              <div></div>
              <div className="staking-card">
                <h2 className="pb-4">Stake</h2>
                <div className="inner-staking-card">
                  <div className="table-responsive">
                    <table>
                      <tbody>
                        <thead>
                          <tr>
                            <th>No.</th>

                            <th>Staking Amount</th>

                            <th>APR </th>
                            <th>Stake Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stakingData.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.amount}</td>

                              <td>{data.reward}</td>
                              <td>{data.lockTime}</td>
                              <td>
                                {/* Add any action buttons or links here */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
