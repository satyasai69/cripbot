// contractsConfig.js
import stakingContractABI from "../../abis/StakingContract.json";
// Import other ABIs as needed

const contractsConfig = {
  StakingContract: {
    address: "0xc512dc5C3aF3927f958cD6230BE2205C0Bb7940a", // Replace with your contract address
    abi: stakingContractABI,
  },
  // Add other contracts here
};

export default contractsConfig;
