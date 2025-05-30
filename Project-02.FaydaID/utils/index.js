// import { BrowserProvider, Contract } from "ethers";
// import identiFi from "./identiFi.json";

// export const contract = async () => {
//   if (!window.ethereum) {
//     console.error("Ethereum object not found");
//     return null;
//   }

//   const provider = new BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const contractReader = new Contract(
//     "0x3401B67b16F92926c8610f54FE7a58EA8F3399cA",
//     identiFi.abi,
//     signer
//   );

//   return contractReader;
// };

import { ethers } from "ethers";
import identiFi from "./identiFi.json";

export const contract = async () => {
  if (!window.ethereum) {
    console.error("Ethereum object not found");
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ Ethers v5 way
    const signer = provider.getSigner(); // No need to await in v5
    const contractReader = new ethers.Contract(
      "0x3401B67b16F92926c8610f54FE7a58EA8F3399cA",
      identiFi.abi,
      signer
    );

    return contractReader;
  } catch (error) {
    console.error("Error initializing contract:", error);
    return null;
  }
};
