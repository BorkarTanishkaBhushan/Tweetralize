import React, { useState , useEffect } from "react";
import "./TweetBox.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';
import { Button } from "@material-ui/core";
import axios from 'axios';
import { ContractAddress } from './config.js';
import { ethers } from "ethers";
// const ethers = require("ethers")
import Twitter from './utils/Tweetralize.json'
import Web3 from "web3";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");
  // const ethers = require("ethers")

	
  const addTweet = async () => {
    let tweet = {
      'tweetText': tweetMessage,
      'isDeleted': false
    };

    try {
    //   const { ethereum } = window

    //   if(ethereum) {
    //     // const provider = new ethers.providers.Web3Provider(ethereum);
		  // const provider = new ethers.providers.Web3Provider(ethereum)
    //     const signer = provider.getSigner();
    //     const ContractAddressNew = new ethers.Contract(
    //       ContractAddress,
    //       Twitter.abi,
    //       signer
    //     )
		

        // let twitterTx = await ContractAddressNew.addTweet(tweet.tweetText, tweet.isDeleted);

		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const contract = new web3.eth.Contract(Twitter.abi, ContractAddress);

      const accounts = await web3.eth.getAccounts();
		const tx = await contract.methods.addTweet(tweet.tweetText, tweet.isDeleted).send({
        from: accounts[0]
      });
		console.log(tx);

        // console.log(twitterTx);
      // } else {
      //   console.log("Ethereum object doesn't exist!");
      // }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  const sendTweet = (e) => {
    e.preventDefault();

    addTweet();

    setTweetMessage("");
    setTweetImage("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            style={{ width: '100px', height: '100px' }}
            avatarStyle='Circle'
            {...avatarOptions }
          />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;