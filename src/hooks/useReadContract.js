// useReadContract.js
import { useContractRead } from "wagmi";
import { useMemo } from "react";
import { ethers } from "ethers";
import contractsConfig from "./contractsConfig";

export const useReadContract = (contractName, functionName, args) => {
  const contractConfig = useMemo(() => {
    const contract = contractsConfig[contractName];
    if (!contract) {
      throw new Error(`Contract ${contractName} not found in configuration`);
    }
    const { address, abi } = contract;
    const abiInterface = new ethers.utils.Interface(abi);
    return {
      address,
      abi: abiInterface,
      functionName,
      args,
    };
  }, [contractName, functionName, args]);

  const { data, isError, isLoading, error } = useContractRead(contractConfig);

  return { data, isError, isLoading, error };
};
