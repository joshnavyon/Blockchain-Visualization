import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allWalletData: null,
    };
  }

  handleButtonClick = () => {
    axios
      .get("http://127.0.0.1:8000/getGDBAddr")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There are errors:", error);
      });
  };

  fetchAllWalletData = () => {
    axios
      .get("http://127.0.0.1:8000/allwallet")
      .then((response) => {
        this.setState({ allWalletData: response.data });
      })
      .catch((error) => {
        console.error("There are errors:", error);
      });
  };

  renderTable = () => {
    if (this.state.allWalletData) {
      const walletData = this.state.allWalletData;
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {walletData.map((item, index) => (
              <tr key={index}>
                <td>{item.ID}</td>
                <td>{item.Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleButtonClick}>Click me</Button>
        <Button onClick={this.fetchAllWalletData}>Fetch Wallet Data</Button>

        <p>Testing Section</p>
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
