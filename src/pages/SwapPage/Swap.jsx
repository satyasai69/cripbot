import {  useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import "./swap.css";

function Swap() {
  const [swapToggle, setSwapToggle] = useState(false);
  const [cripBotToken, setCriptBotToken] = useState(0);
  const [weth, setWeth] = useState(0);
  const [cripBotTokenCalculatedValue, setCripBotTokenCalculatedValue] =
    useState(0);
  const [wethCalculatedValue, setWethCalculatedValue] = useState(0);

  const handleInputSwap = (e) => {
    if (Number(e.target.value)) {
      if (swapToggle) {
        setCriptBotToken(Number(e.target.value));
      } else {
        setWeth(Number(e.target.value));
      }
    }
  };

  useEffect(() => {
    if (swapToggle) {
      if (cripBotToken == 0) {
        setCripBotTokenCalculatedValue(0);
      } else if (cripBotToken > 0) {
        setCripBotTokenCalculatedValue(cripBotToken + 1);
      }
    } else {
      if (weth == 0) {
        setWethCalculatedValue(0);
      } else if (weth > 0) {
        setWethCalculatedValue(cripBotToken + 2);
      }
    }
  }, [
    cripBotToken,
    weth,
    swapToggle,
    setCripBotTokenCalculatedValue,
    setWethCalculatedValue,
  ]);

  return (
    <div>
      <div className="main-swap">
        <Navbar />
        <div>
          {" "}
          <div className="container"></div>
          <div className="inner-staking">
            <div className="container">
              <div></div>
              <div className="staking-card pl-0 pr-0">
                <div className="flex w-full justify-end mb-3">
                  <div className="header_Exchange flex justify-around items-center px-3">
                    <h2 className="">Exchange</h2>
                    <button className="buy_button text-[25px] px-5 rounded-2xl text-white ">
                      Buy
                    </button>
                  </div>
                </div>
                <div className="inner-staking-card">
                  <div style={{ position: "relative" }}>
                    <div className="swap-input flex flex-wrap flex-md-nowrap items-center justify-content-between">
                      <button
                        className={`header-button  text-[20px] ${
                          swapToggle ? "header-button_ethereum " : ""
                        }`}
                      >
                        {swapToggle ? (
                          <div className="responsive_mobile flex items-center w-full">
                            <img
                              className="ethereum_img"
                              src="/images/ethereum.png"
                              alt="ethereum"
                            />
                            <span>Ethereum</span>
                          </div>
                        ) : (
                          "$ USD"
                        )}
                      </button>
                      <div className=" responsive_pay flex justify-center items-end flex-col">
                        <label className="pb-1 w-20" htmlFor="">
                          You Pay
                        </label>
                        <br />
                        <input
                          className="input_responsive  text-[25px]"
                          type="text"
                          onChange={handleInputSwap}
                          value={swapToggle ? cripBotToken : weth}
                        />
                        <h6>{swapToggle ? "ETHEREUM" : "$ USD"}</h6>
                      </div>
                    </div>
                    <div
                      onClick={() => setSwapToggle(!swapToggle)}
                      className="swap-icon"
                      style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateY(-50%)",
                        top: "50%",
                      }}
                    >
                      <svg
                        width="42"
                        height="43"
                        viewBox="0 0 42 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.23529"
                          y="1.73529"
                          width="39.5294"
                          height="39.5294"
                          rx="19.7647"
                          fill="#241839"
                        ></rect>
                        <rect
                          x="1.23529"
                          y="1.73529"
                          width="39.5294"
                          height="39.5294"
                          rx="19.7647"
                          stroke="#E0E0E0"
                          strokeWidth="2.47059"
                        ></rect>
                        <path
                          d="M28.4095 22.7363L20.9977 30.1481L13.5859 22.7363"
                          stroke="white"
                          strokeWidth="2.47059"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M20.9961 12.2363L20.9961 24.5893"
                          stroke="white"
                          strokeWidth="2.47059"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div className="swap-input d-flex flex-wrap flex-md-nowrap items-center justify-content-between mt-4">
                      <button
                        className={`header-button  text-[20px] ${
                          swapToggle ? "header-button_ethereum " : ""
                        }`}
                      >
                        {swapToggle ? (
                          "$ USD"
                        ) : (
                          <div className="responsive_mobile flex  items-center w-full">
                            <img
                              className="ethereum_img"
                              src="/images/ethereum.png"
                              alt="ethereum"
                            />
                            <span>Ethereum</span>
                          </div>
                        )}
                      </button>
                      <div className="responsive_pay flex justify-center items-end flex-col">
                        <label className="pb-1" htmlFor="">
                          You Get
                        </label>
                        <br />
                        <input
                          className="input_responsive"
                          type="text"
                          readOnly
                          value={
                            swapToggle
                              ? cripBotTokenCalculatedValue
                              : wethCalculatedValue
                          }
                        />
                        <h6>{swapToggle ? "$ USD" : "$ ETHEREUM"}</h6>
                      </div>
                    </div>
                  </div>
                  <button
                    className="header-button mt-4"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Buy Ethereum{" "}
                  </button>
                </div>
                <p className="text-center text-white">No extra fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
