// Button.js
import React from "react";
import axios from "axios";

const Button = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/wallet/0x58f56615180a8eea4c462235d9e215f72484b4a3"
      );
      console.log(response.data);
      // Handle the response here, e.g., console.log(response.data);
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  return <button onClick={handleClick}>Fetch Data</button>;
};

export default Button;
