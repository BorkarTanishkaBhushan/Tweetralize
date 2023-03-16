import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { ContractAddress } from './config.js';
// import {ethers} from 'ethers';
import Web3 from "web3";
// const ethers = require("ethers")
import Twitter from './utils/Tweetralize.json'


function Feed({personal}) {
  const [posts, setPosts] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for(let i=0; i<allTweets.length; i++) {
      if(allTweets[i].username == address) {
        let tweet = {
          'id': allTweets[i].id,
          'tweetText': allTweets[i].tweetText,
          'isDeleted': allTweets[i].isDeleted,
          'username': allTweets[i].username,
          'personal': true
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          'id': allTweets[i].id,
          'tweetText': allTweets[i].tweetText,
          'isDeleted': allTweets[i].isDeleted,
          'username': allTweets[i].username,
          'personal': false
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  }

  const getAllTweets = async() => {
    try {
      
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      	const contract = new web3.eth.Contract(Twitter.abi, ContractAddress);
      	const accounts = await web3.eth.getAccounts();
		// console.log(accounts)
		let allTweets = await contract.methods.getAllTweets().call();
  		setPosts(getUpdatedTweets(allTweets, accounts));
		
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTweets();
  }, []);

  const deleteTweet = key => async() => {
    // console.log(key);
    try {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      	const contract = new web3.eth.Contract(Twitter.abi, ContractAddress);
      	const accounts = await web3.eth.getAccounts();

        let deleteTweetTx = await contract.methods.deleteTweet(key, true).send({
        from: accounts[0]
      });;
        let allTweets = await contract.methods.getAllTweets().call();
        setPosts(getUpdatedTweets(allTweets, accounts));

    } catch(error) {
      console.log(error);
    }
  }

// const deleteTweet = (key) => {
//   const deleteTweetAsync = async () => {
//     try {
//       const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
//       const contract = new web3.eth.Contract(Twitter.abi, ContractAddress);
//       const accounts = await web3.eth.getAccounts();

//       let deleteTweetTx = await contract.methods.deleteTweet(key, true).call();
//       let allTweets = await contract.methods.getAllTweets().call();
//       setPosts(getUpdatedTweets(allTweets, accounts));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   deleteTweetAsync();
// };


  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            text={post.tweetText}
            personal={post.personal}
            onClick={deleteTweet(post.id)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;