import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";

import "./Bridge.css";

import { useWriteContract } from "wagmi";
import { ethers } from "ethers";

function Bridge() {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Tokentoget, setTokentoget] = useState(0);
  const { writeContract } = useWriteContract();

  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_admin",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "address",
          name: "_uniswapPair",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_totalTokensForSale",
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
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "TokensPurchased",
      type: "event",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "buyTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
      ],
      name: "buyTokensByETH",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getTokenPrice",
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
      name: "token",
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
      inputs: [],
      name: "tokensSold",
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
      name: "totalTokensForSale",
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
      name: "uniswapPair",
      outputs: [
        {
          internalType: "contract IUniswapV2Pair",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawUnsoldTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contractAddress = "0xcEac7d4bBA5201bC2615043eCFbBA7Ee36B38cE0";
  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider(
          `https://arb1.arbitrum.io/rpc`
        );

        // Instantiate the token contract
        const tokenContract = new ethers.Contract(
          contractAddress,
          ["function getTokenPrice() public view returns (uint256) "],
          provider
        );

        // Fetch user balance
        const TokenPrice = await tokenContract.getTokenPrice();
        setPrice(ethers.utils.formatEther(TokenPrice)); // Assuming the token uses Ether-like decimals
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, [contractAddress]);

  const BuyToken = async () => {
    try {
      //  const decimals = 18;

      const multiplier = 10 ** 18;

      // const weiAmount = BigInt(amount) * BigInt(multiplier);
      const weiAmounts = amount * multiplier;

      //  const tokenPrice = await getTokenPrice(); // Assuming getTokenPrice() is a function that fetches the token price
      const tokenPrice = price;

      // Calculate the number of tokens to buy based on the amount of ETH sent
      // const tokensToBuy = amount * multiplier * tokenPrice; // BigInt(weiAmounts) * BigInt(tokenPrice);
      //  const tokensToBuyss = BigInt(weiAmounts) * BigInt(tokenPrice);
      const tokensToBuys = weiAmounts * tokenPrice;
      const integerValue = Math.round(weiAmounts);

      await writeContract({
        abi,
        address: "0xcEac7d4bBA5201bC2615043eCFbBA7Ee36B38cE0",
        functionName: "buyTokens",
        args: [], // [BigInt(tokensToBuys)],
        value: BigInt(integerValue), //
      });

      // console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!", tokensToBuys, weiAmounts);
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const handleAmountChange = (event) => {
    const inputAmount = parseFloat(event.target.value);
    setAmount(inputAmount);

    // Assuming price is in Ether
    const weiPrice = ethers.utils.parseEther(price); // Convert price to wei
    const weiAmount = ethers.utils.parseEther(inputAmount.toString()); // Convert input amount to wei

    const tokensToget = weiAmount / weiPrice; // weiAmount.mul(weiPrice);

    setTokentoget(tokensToget); //(ethers.utils.formatEther(tokensToget)); // Convert the token amount from wei to Ether
  };
  // const togetToken = Tokentoget;
  // Render a warning message if the input value is below the minimum threshold
  const warningMessage =
    amount < 0.000001 ? (
      <span style={{ color: "red" }}>Amount must be at least 0.000001</span>
    ) : null;

  return (
    <div>
      <div className="main-swap">
        <Navbar />
        <div>
          {" "}
          <div className="container"></div>
          <div className="inner-staking">
            <div className="container">
              <div className="staking-card pt-[50px] pb-[70px]">
                <div className="text-[#fff] text-center pb-5">
                  <p className="text-[17px]">1 $CripBot = {price}ETH</p>

                  <p className="text-[17px]">YOUR PURCHASED $CripBot =</p>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button className="header-button py-4 text-[20px">
                    <span>Ethereum</span>
                  </button>
                </div>
                <div className="w-full gap-1 flex items-center justify-between py-4">
                  <div className="relative">
                    <img
                      className="absolute bottom-2 right-[2px] w-9"
                      src="/images/tether.png"
                      alt="tether image"
                    />
                    <label
                      htmlFor=""
                      className="text-[17px] text-white pb-1 font-semibold"
                    >
                      Pay With ETH
                    </label>
                    <input
                      type="number"
                      className="w-full h-12 text-[25px] pl-2 outline-none rounded-md"
                      onChange={handleAmountChange}
                      min="0.000001" // Set the minimum value
                    />
                  </div>
                  <div className="relative">
                    <img
                      className="absolute bottom-2 right-[2px] w-10"
                      src="/images/energy.png"
                      alt="tether image"
                    />
                    <label
                      htmlFor=""
                      className="text-[17px] text-white pb-1 font-semibold"
                    >
                      $CripBot Value
                    </label>
                    <input
                      type="number"
                      className="w-full h-12 text-[25px] pl-2 outline-none rounded-md"
                      value={Tokentoget}
                    />
                  </div>
                </div>
                {warningMessage && (
                  <span style={{ color: "red" }}>
                    Amount must be at least 0.000001
                  </span>
                )}
                <button
                  className="header-button header-button_bridge mt-4"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: warningMessage ? "gray" : "", // Change background color if warning is shown
                    cursor: warningMessage ? "not-allowed" : "pointer", // Change cursor if warning is shown
                  }}
                  onClick={BuyToken}
                  disabled={warningMessage} // Disable the button when the warning is shown
                >
                  Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bridge;
