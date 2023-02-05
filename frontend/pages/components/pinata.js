import { useState } from 'react';

//require('dot-env').config()
const key = "38470d584a4dc1d4dc44";
const secret = "7f6669c404199f49f7b952b97bff648a9cf3ec57d85fcc8fa66500e64744ca75";

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            return {
                success: true,
                pinataUrl: "https://ipfs.io/ipfs/" + response.data.IpfsHash,
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};





