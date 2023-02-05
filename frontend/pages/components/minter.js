// import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "./interact.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";
import Web3 from "web3"
import { pinJSONToIPFS } from "./pinata.js";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants.ts";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("")
  const [msg, setMsg] = useState("");
  const [mintedDtweets, setMintedDtweets] = useState([])
  const [image, setImage] = useState(null);
  const axios = require('axios');
  const Web3Providers = require('web3');
let provider = typeof window != "undefined" && window.ethereum
  useEffect(() => {
    const { address, status } = getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)


  function hateDetect(checkMsg) {
    const hatefulWords = ['hate', 'bigot', 'intolerance', 'racism', 'sexism'];


    const isHateSpeech = (text) => {
    const words = text.toLowerCase().split(' ');
    for (const word of words) {
    if (hatefulWords.includes(word)) {
      return true;
    }
  }
  return false;
};


  }


  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }




  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };


 
  const renderInputForm = () => {
   
    return(
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:white dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray">


    <h1 id="title" className="text-2xl font-bold mt-1">Write your dtweet!!</h1>
   
    <form className="space-y-4 md:space-y-6 ">

    <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1">Message</label>
    <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="e.g. My first Tweet"
        rows="2"
        onChange={(event) => setMsg(event.target.value)}
        />


      <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1" > Image: </label>
      {/* <input
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])}
      /> */}
      <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <input id="dropsone-file" type="file"  accept="image/*" onChange={(event) => setImage(event.target.files[0])} className=""/>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
        </div>
       
    </label>
</div>
    </form>
    <button id="mintButton" onClick={uploadDtweet} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Dtweet
      </button>
  <p id="status" className="text-red-500 mt-4">{status}</p>
 
  </div>
</div>
    );
  }  


  const uploadDtweet = async () => {
    if(!msg){
      toast.error("Domain must be atleast 3 characters long", {
        position: "top-center",
        autoClose: 3000,
         hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if(image){
        const pinataResponse = await pinJSONToIPFS(metadata);
        const tokenURI = pinataResponse.pinataUrl;
        console.log(tokenURI);
      }
      return;
    }
    try {
      const { ethereum } = window;
      if (ethereum) {
      //   const provider = new ethers.providers.Web3Provider(ethereum);
      //   const signer = provider.getSigner();
      //   const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      // console.log("Going to pop wallet")
      let tx = await contract.dtweet(msg);
            console.log(tx);
      //transaction is getting mined
      toast.info('⛏Dtweet is under mining process...', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const receipt = await tx.wait();
      //checking if the transaction got mined
      if (receipt.status == 1){
        console.log("Dtweet minted! https://mumbai.polygonscan.com/tx/"+tx.hash);


        toast.success('Dtweet Minted!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });


       
        // Call fetchMints after 2 seconds
            setTimeout(() => {
              fetchDtweets();
            }, 2000);
       
        setMsg('');
        // setDomain('');
      }
      else{
        // alert("Transaction failed! Please try again");
        toast.error("Transaction failed! Please try again", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
    }
  } catch (error){
    console.log(error)
  }


  }


  const fetchDtweets = async () => {
    try{
      
        // const provider = new ethers.providers.Web3Provider(ethereum)
        // const signer = provider.getSigner();
        // const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer)
        // const alldtweets = await contract.getAllDtweets();


        // const mintDtweets = await Promise.all(alldtweets.map(async (name) => {
        //       // const mintDtweets = await contract.records(name);
        //       // const owner = await contract.domains(name);
        //       return {
        //         id: alldtweets.indexOf(name),
        //         name: name,
        //         record: mintRecord,
        //         owner: owner,
        //       };
        //    }));
        const mintDtweets = await Promise.all(alldtweets.keys(dtweets).map(async (address) => {
          const message = dtweets[address].message;
          // const mintRecord = dtweets[address].record;
          return {
          id: address,
          message: message,
          // record: mintRecord,
          owner: address,
          };
          }));
        console.log("MINTS FETCHED ", mintDtweets);
        setMintedDtweets(mintDtweets);
      
    }catch (error){
      console.log(error)
    }
  }


  const renderDtweets = () => {
    if (walletAddress && mintedDtweets.length > 0) {
      return (
        <div className="mint-container">
          <p className="subtitle"> Some Dtweets!</p>
          <div className="mint-list">
            { mintedDtweets.map((mintedDtweets, address) => {
              return (
                <div className="mint-item" key={address}>
                  <div className='mint-row'>
                    <a className="link" href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`} target="_blank" rel="noopener noreferrer">
                      <p className="underlined">{' '}{mintedDtweets.message}{' '}</p>
                    </a>
                    {/* If mint.owner is currentAccount, add an "edit" button*/}
                    { mintedDtweets.owner.toLowerCase() === currentAccount.toLowerCase() ?
                      <button className="edit-button" onClick={() => editRecord(mint.name)}>
                        <img className="edit-icon" src="https://img.icons8.com/metro/26/000000/pencil.png" alt="Edit button" />
                      </button>
                      :
                      null
                    }
                  </div>
            {/* <p> {mint.record} </p> */}
          </div>)
          })}
        </div>
      </div>);
    }
  };






  return (
    <div class="flex flex-col items-center justify-center">
    <button id="walletButton" onClick={connectWalletPressed} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      {String(walletAddress).length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
 
    <br></br>
    {walletAddress && renderInputForm()}
        {mintedDtweets && renderDtweets()}
 </div>
  );
};


export default Minter;
