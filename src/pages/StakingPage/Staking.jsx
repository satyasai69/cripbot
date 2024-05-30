import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import "./staking.css"
import CopyToClipboardButton from "../../components/CoppyReferrCode/CoppyBtn";

function Staking() {

 const [stakeAmount, setStakeAmount] = useState(""); 
//  const [referralAddress, setReferralAddress] = useState(""); 
  const [selectedButton, setSelectedButton] = useState(1); 
    const [referrersCode, setReferrersCode] = useState("Here your referral code");


  
  const handleDaysButton = (buttonId) => {
   setSelectedButton(buttonId); 
  };
  

 const buttons = [
   { label: "30 Days", id: 1 },
   { label: "60 Days", id: 2 },
   { label: "90 Days", id: 3 },
   { label: "180 Days", id: 4 },
 ];

 return (
   <div className="staking">
     <Navbar />
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
                   <button className="header-button stake_btn">Stake</button>
                 </div>
               </div>

               <div className="pt-4 d-flex align-items-center justify-between responsive_flex">
                 <div>
                   <h4>Reward Balance</h4>
                   <p className="text-[20px]">0</p>
                 </div>
                 <button className="header-button reward_btn">
                   Reward Claim
                 </button>
               </div>
               <div className="pt-4">
                 <h4 className="pb-2">Referral Address</h4>
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
