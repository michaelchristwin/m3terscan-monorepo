import { ethers } from 'ethers';

import abi from '../utils/roll-up.abi.json';

// Setup provider and contract
const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/URjQnzNCUHumxPFL8VDoFBmpX4uqL6X8'); 
const contractAddress = '0xAFaA8090C17bE0a94C65a9C2BDA715060d38B9B9'; 


export async function getChainLength() {
   const contract = new ethers.Contract(contractAddress, abi, provider)
   const chainLength = await contract.chainLength();

   return chainLength;
}

// // // Method 3: Using Etherscan API (more efficient for historical data)
// // async function getContractTransactionsFromEtherscan(contractAddress, apiKey) {
// //     try {
// //         const response = await fetch(
// //             `https://api.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
// //         );
        
// //         const data = await response.json();
        
// //         if (data.status === '1') {
// //             return data.result.map(tx => ({
// //                 hash: tx.hash,
// //                 from: tx.from,
// //                 to: tx.to,
// //                 value: ethers.formatEther(tx.value),
// //                 gasPrice: tx.gasPrice,
// //                 gasUsed: tx.gasUsed,
// //                 blockNumber: parseInt(tx.blockNumber),
// //                 timestamp: new Date(parseInt(tx.timeStamp) * 1000),
// //                 isError: tx.isError === '1',
// //                 functionName: tx.functionName || 'Unknown'
// //             }));
// //         } else {
// //             console.error('Etherscan API error:', data.message);
// //             return [];
// //         }
// //     } catch (error) {
// //         console.error('Error fetching from Etherscan:', error);
// //         return [];
// //     }
// // }

// // // Method 4: Get specific transaction details
// // async function getTransactionDetails(txHash) {
// //     try {
// //         const tx = await provider.getTransaction(txHash);
// //         const receipt = await provider.getTransactionReceipt(txHash);
// //         const block = await provider.getBlock(tx.blockNumber);
        
// //         return {
// //             hash: tx.hash,
// //             from: tx.from,
// //             to: tx.to,
// //             value: ethers.formatEther(tx.value),
// //             gasPrice: tx.gasPrice,
// //             gasLimit: tx.gasLimit,
// //             gasUsed: receipt.gasUsed,
// //             status: receipt.status, // 1 = success, 0 = failed
// //             blockNumber: tx.blockNumber,
// //             timestamp: new Date(block.timestamp * 1000),
// //             logs: receipt.logs,
// //             data: tx.data
// //         };
// //     } catch (error) {
// //         console.error('Error getting transaction details:', error);
// //         return null;
// //     }
// // }

