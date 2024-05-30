import {  useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css"


function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <div
        className={`hero-main relative`}
      >
        <div className="bottm-bg">
          <div className="inner-bg">
            <Navbar />
            <div className="inner-hero">
              <div className="container">
                <div className="tvl-section">
                  <h2>TVL - $1000</h2>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="content-hero">
                      <h1 className="pb-2">
                        Join The Future Of AI Algorithmic Crypto Trading
                        Strategies <span>Join CripBotAI</span>
                      </h1>
                      <p>
                        <b>
                          CripBotAI: Revolutionizing NFT, GAME through
                          Blockchain
                        </b>
                        <br />
                        UNLOCK THE FUTURE OF PLAY WITH CripBotAI
                      </p>
                      <button
                        onClick={() => navigate("/swap")}
                        className="header-button"
                      >
                        Buy CripBotAI
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="company">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <img src="/images/1.png" alt="" />
            <img src="/images/2.png" alt="" />
            <img src="/images/3.png" alt="" />
            <img src="/images/4.png" alt="" />
          </div>
        </div>
      </div>
      <div className="cpt">
        <div className="container">
          <div className="inner-cpt">
            <div className="row">
              <div className="col-lg-7">
                <span>Introduction</span>
                <h2>CripBotdAI</h2>
                <p className="pt-5">
                  Redefining Crypto Trading with AI Precision
                </p>
                <p className="pt-5">
                  Step into the future of cryptocurrency trading with
                  Cripbot.ai. Our innovative algorithms leverage AI to offer
                  intelligent strategies, empowering traders with unparalleled
                  precision and efficiency. Embrace the next level of trading
                  sophistication and elevate your crypto journey with Cpt.
                </p>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-4">
                <img src="/images/cpt-layer.png" alt="cpt-layer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="choose-us">
        <div className="container">
          <div className="inner-choose">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="pb-4">Why Choose Us?</h2>
                <p className="pb-4">
                  Choose Cripbot.ai for cutting-edge AI-driven trading
                  strategies that adapt to market changes swiftly. Our platform
                  is designed for modern traders, offering efficiency, speed,
                  and proven results. Join us and experience the future of
                  cryptocurrency trading today.
                </p>
                <button className="header-button">Connect with Us</button>
              </div>
              <div className="col-lg-6 pt-5 pt-lg-0">
                <div>
                  <img
                    className="w-100"
                    src="/images/card-one.png"
                    alt="card-one"
                  />
                </div>
                <div>
                  <img
                    className="w-100"
                    src="/images/card-two.png"
                    alt="card-two"
                  />
                </div>
                <div>
                  <img
                    className="w-100"
                    src="/images/card-three.png"
                    alt="card-three"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-main">
        <div className="container">
          <h2>tokenomics </h2>
          <img className="w-100" src="/images/chart.png" alt="chart" />
        </div>
      </div>
      <div className="updates">
        <div className="container">
          <div className="inner-updates">
            <div className="row">
              <div className="col-lg-12">
                <h2>Get More Updates</h2>
                <p className="pt-4 pb-5">
                  Join our mailing list to stay in the loop with our newest
                  feature releases, NFT drops, and tips and tricks{" "}
                </p>
                <div className="groups-input">
                  <input type="search" placeholder="Your Email" />
                  <div>
                    <button className="yesim">I&apos;m In</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
