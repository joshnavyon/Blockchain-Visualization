// Wallet.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Wallet() {
  const { addressId } = useParams();
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    // Make an API call to fetch wallet data using the addressId
    axios
      .get(`http://127.0.0.1:8000/wallet/${addressId}`)
      .then((response) => {
        setWalletData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addressId]);

  if (!walletData) {
    return <div>Loading...</div>;
  }

  return <div>Walet Data is retrieved</div>;
}

export default Wallet;
