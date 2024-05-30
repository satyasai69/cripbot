

import Navbar from "../../components/Navbar/Navbar";

import "./Bridge.css";

function Bridge() {

  return (
    <div>
      <div className="main-swap">
        <Navbar />
        <div>
          {" "}
          <div className="container"></div>
          <div className="inner-staking">
            <div className="container">
              <div className="staking-card pt-[50px] pb-[70px]" >
                <div className="text-[#fff] text-center pb-5">
                  <p className="text-[17px]">1 $SMART = $0.01</p>

                  <p className="text-[17px]">YOUR PURCHASED $SMART = 0.0</p>
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
                      Pay With USDT
                    </label>
                    <input
                      type="number"
                      className="w-full h-12 text-[25px] pl-2 outline-none rounded-md"
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
                      $SMART Value
                    </label>
                    <input
                      type="number"
                      className="w-full h-12 text-[25px] pl-2 outline-none rounded-md"
                    />
                  </div>
                </div>
                <button
                  className="header-button header-button_bridge mt-4"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Swap{" "}
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
