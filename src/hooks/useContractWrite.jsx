// useDynamicWriteContract.js
import { useContractWrite } from "wagmi";
import { useMemo, useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import contractsConfig from "./contractsConfig";

export const useDynamicWriteContract = () => {
  const [txHash, setTxHash] = useState(null);
  const [txStatus, setTxStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const executeWrite = async ({ contractName, functionName, args, value }) => {
    try {
      const contract = contractsConfig[contractName];
      if (!contract) {
        throw new Error(`Contract ${contractName} not found in configuration`);
      }
      const { address, abi } = contract;
      const abiInterface = new ethers.utils.Interface(abi);

      const contractConfig = {
        address,
        abi: abiInterface,
        functionName,
        args,
        overrides: value
          ? { value: ethers.utils.parseUnits(value.toString(), "wei") }
          : {},
      };

      const { writeAsync, data, isLoading, isError, error } =
        useContractWrite(contractConfig);

      if (isLoading) {
        toast.info("Transaction pending...");
        setTxStatus({
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: null,
        });
      }

      const txResponse = await writeAsync();
      setTxHash(txResponse.hash);
      toast.success(
        <>
          Transaction submitted!{" "}
          <a
            href={`https://etherscan.io/tx/${txResponse.hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </>
      );

      const txReceipt = await txResponse.wait();
      if (txReceipt.status === 1) {
        toast.success(
          <>
            Transaction confirmed!{" "}
            <a
              href={`https://etherscan.io/tx/${txReceipt.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </>
        );
        setTxStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        });
      } else {
        toast.error("Transaction failed");
        setTxStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: new Error("Transaction failed"),
        });
      }
    } catch (err) {
      toast.error(`Transaction error: ${err.message}`);
      setTxStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: err,
      });
    }
  };

  return { executeWrite, txHash, txStatus };
};
