import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from "../pages/static/constants.js"

const contractor = createContext();

export const ContractProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);
    
    useEffect(() => {
        const ProviderAndContract = () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);
                
                const GetSignerAndContract = async () => {
                    const signer = await provider.getSigner()
                    console.log(signer.address ,'this is the signer')
                    const contract = new ethers.Contract(contractAddress, abi, signer);
                    setContract(contract);
                    setSigner(signer)
                }
                GetSignerAndContract()
              }
          };
        
          ProviderAndContract()
    },[])

    const ListenForTransactionMine = async (transactionResponse) => {
      if (provider) {
        console.log(`Listening for Mine ${transactionResponse.hash}...`);
        try {
          const transactionReceipt = await provider.waitForTransaction(transactionResponse.hash);
          console.log(`Completed transaction ${transactionReceipt.blockNumber} confirmations`);
        } catch (error) {
          console.log(error);
        }
      }
    };

  return (
    <contractor.Provider value={{ provider, contract, signer ,ListenForTransactionMine}}>
      {children}
    </contractor.Provider>
  );
};

export const useContract = () => {
  return useContext(contractor);
};
