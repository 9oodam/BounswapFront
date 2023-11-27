import Web3 from "web3";
const web3 = new Web3("https://network.bouncecode.net/");

web3.eth.getBalance(
  "0xBFD85324250396bd9C13ac126f0BE911C1335FF3",
  (err, balance) => {
    if (!err) {
      console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
    }
  }
);
