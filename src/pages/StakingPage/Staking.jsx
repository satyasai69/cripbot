import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

import "./staking.css";
import CopyToClipboardButton from "../../components/CoppyReferrCode/CoppyBtn";
// import { useDynamicWriteContract } from "../../hooks/useContractWrite";
// import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useWriteContract } from "wagmi";
// import stakingContractABI from "../../../abis/StakingContract.json";
import { ethers } from "ethers";
import Approve from "./Approve";
import { useAccount } from "wagmi";

function Staking() {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState("1");
  //  const [referralAddress, setReferralAddress] = useState("");
  const [selectedButton, setSelectedButton] = useState(1);
  const [referrersCode, setReferrersCode] = useState(address);
  const [referralAddress, setReferralAddress] = useState(null);
  const [Price, setPrice] = useState(0);
  const { writeContract } = useWriteContract();

  //  const { executeWrite, txStatus } = useDynamicWriteContract();

  const handleDaysButton = (buttonId) => {
    setSelectedButton(buttonId);
  };
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

  const buttons = [
    { label: "30 Days", id: 30 },
    { label: "60 Days", id: 60 },
    { label: "90 Days", id: 90 },
    { label: "180 Days", id: 180 },
  ];

  const handleStake = async () => {
    try {
      await writeContract({
        abi,
        address: "0xb9A06d63CB788819b41dba689cC74B0Ff94cD6BF",
        functionName: "stake",
        args: [
          BigInt(ethers.utils.parseUnits(stakeAmount, 18)),
          selectedButton,
        ], // [BigInt(tokensToBuys)],
        //  value: BigInt(integerValue), //
      });

      console.log(" successful!", stakeAmount, selectedButton);
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const handleReferrStake = async () => {
    try {
      await writeContract({
        abi,
        address: "0xb9A06d63CB788819b41dba689cC74B0Ff94cD6BF",
        functionName: "refferstake",
        args: [
          BigInt(ethers.utils.parseUnits(stakeAmount, 18)),
          selectedButton,
          referralAddress,
        ], // [BigInt(tokensToBuys)],
        //  value: BigInt(integerValue), //
      });

      console.log(" successful! refferstake ", stakeAmount, selectedButton);
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const rewardsclam = async () => {
    try {
      await writeContract({
        abi,
        address: "0xb9A06d63CB788819b41dba689cC74B0Ff94cD6BF",
        functionName: "claimRewards",
        args: [], // [BigInt(tokensToBuys)],
        //  value: BigInt(integerValue), //
      });

      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const contractAddress = "0xb9A06d63CB788819b41dba689cC74B0Ff94cD6BF";
  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider(
          `https://data-seed-prebsc-2-s1.bnbchain.org:8545`
        );

        // Instantiate the token contract
        const tokenContract = new ethers.Contract(
          contractAddress,
          ["function claimRewards() external"],
          provider
        );

        // Fetch user balance
        const TokenPrice = await tokenContract.claimRewards();
        setPrice(ethers.utils.formatEther(TokenPrice)); // Assuming the token uses Ether-like decimals
        console.log(Price, "claim rewards");
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };
    setReferrersCode(address);
    setReferrersCode(address);
    console.log(address);
    fetchTokenInfo();
  }, [contractAddress, Price, address]);

  return (
    <div className="staking">
      <Navbar />
      <ToastContainer />
      <div className="Toastify"></div>
      <div>
        <div className="Toastify"></div>
        <div className="inner-staking">
          <div className="w-[100%]">
            <div className="staking-card">
              <div className="centered-container">
                <h2 className="stake_text">Stake</h2>
              </div>
              <div className="inner-staking-card">
                <div className="tabs-button d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between mt-5">
                  {buttons.map((button) => (
                    <div
                      className="button-main"
                      //  style={{ width: "20%" }}
                      key={button.id}
                    >
                      <button
                        onClick={() => handleDaysButton(button.id)}
                        className={`
                       responsive_text
                         ${
                           selectedButton === button.id
                             ? "header-button"
                             : "button-unactive"
                         }
                           responsive_text
                       `}
                        style={{
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {button.label}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <h4 className="pb-2">Token in My Wallet</h4>
                  <div className="group-inputs-max">
                    <input
                      type="search"
                      placeholder="CPT Stake Amount"
                      onChange={(e) => setStakeAmount(e.target.value)}
                      value={stakeAmount}
                      style={{ color: "rgb(255, 255, 255)" }}
                    />
                    <Approve stakeAmount={stakeAmount} />
                    <button
                      className="header-button stake_btn "
                      // onClick={handleStake}
                      // disabled={}
                      onClick={() => {
                        if (!referralAddress) {
                          handleStake();
                        } else {
                          handleReferrStake();
                        }
                      }}
                    >
                      Stake
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="pb-2">Enter Referral Address</h4>
                  <div className="group-inputs-max">
                    <input
                      type="search"
                      placeholder="Enter Referral Address"
                      onChange={(e) => setReferralAddress(e.target.value)}
                      value={referralAddress}
                      style={{ color: "rgb(255, 255, 255)" }}
                    />
                  </div>
                </div>

                <div className="pt-4 d-flex align-items-center justify-between responsive_flex">
                  <div>
                    <h4>Reward Balance</h4>
                    <p className="text-[20px]">{Price}</p>
                  </div>
                  <button
                    className="header-button reward_btn"
                    onClick={rewardsclam}
                  >
                    Reward Claim
                  </button>
                </div>
                <div className="pt-4">
                  <h4 className="pb-2">My Referral Address</h4>
                  <div className="group-inputs-max">
                    <input
                      type="search"
                      name="refCode"
                      placeholder=""
                      readOnly
                      onChange={(e) => setReferrersCode(e.target.value)}
                      value={referrersCode}
                      style={{ color: "rgb(255, 255, 255)" }}
                    />
                    <CopyToClipboardButton textToCopy={referrersCode} />
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

export default Staking;
