import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [autoDepositInterval, setAutoDepositInterval] = useState(null);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      handleAccount(accounts);
    } else {
      console.log("MetaMask is not installed");
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(undefined);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
      setATM(atmContract);
    }
  };

  const getBalance = async () => {
    if (atm) {
      const weiBalance = await atm.getBalance();
      const etherBalance = ethers.utils.formatEther(weiBalance); // Convert Wei to Ether
      setBalance(parseFloat(etherBalance).toFixed(4)); // Format the balance to 4 decimal places
    }
  };

  const deposit = async (amount) => {
    if (atm && amount) {
      try {
        let tx = await atm.deposit(ethers.utils.parseEther(amount), {
          value: ethers.utils.parseEther(amount)
        });
        await tx.wait();
        getBalance();
        setDepositAmount(""); // Reset the input field
      } catch (error) {
        console.error("Transaction failed", error);
        alert("Transaction failed: " + error.message);
      }
    }
  };

  const withdraw = async () => {
    if (atm && withdrawAmount) {
      try {
        let tx = await atm.withdraw(ethers.utils.parseEther(withdrawAmount));
        await tx.wait();
        getBalance();
        setWithdrawAmount(""); // Reset the input field
      } catch (error) {
        console.error("Transaction failed", error);
        alert("Transaction failed: " + error.message);
      }
    }
  };

  const startAutoDeposit = () => {
    if (autoDepositInterval) {
      clearInterval(autoDepositInterval);
    }

    const intervalId = setInterval(async () => {
      await deposit("2");
    }, 10000); // Every 10 seconds

    setAutoDepositInterval(intervalId);
  };

  const stopAutoDeposit = () => {
    if (autoDepositInterval) {
      clearInterval(autoDepositInterval);
      setAutoDepositInterval(null);
    }
  };

  const logout = () => {
    setAccount(undefined);
    setBalance(undefined);
    setATM(undefined);
    setDepositAmount("");
    setWithdrawAmount("");
    if (autoDepositInterval) {
      clearInterval(autoDepositInterval);
      setAutoDepositInterval(null);
    }
    // Optionally, notify the user
    alert("You have been logged out. Please reconnect your MetaMask wallet.");
    // Refresh the page
    window.location.reload();
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p className="error-text">Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button className="btn primary-btn" onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="content">
        <p className="account">Your Account: {account}</p>
        <p className="balance">Your Balance: {balance} ETH</p>
        <div className="form-group">
          <h3>Deposit</h3>
          <input
            className="input-field"
            type="number"
            placeholder="Amount in ETH"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <button className="btn deposit-btn" onClick={() => deposit(depositAmount)}>Deposit ETH</button>
        </div>
        <div className="form-group">
          <h3>Withdraw</h3>
          <input
            className="input-field"
            type="number"
            placeholder="Amount in ETH"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button className="btn withdraw-btn" onClick={withdraw}>Withdraw ETH</button>
        </div>
        <div className="form-group">
          <h3>Auto Deposit</h3>
          <button className="btn auto-start-btn" onClick={startAutoDeposit}>Start Auto Deposit</button>
          <button className="btn auto-stop-btn" onClick={stopAutoDeposit}>Stop Auto Deposit</button>
        </div>
        <button className="btn logout-btn" onClick={logout}>Logout</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1 className="title">Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin-top: 50px;
          min-height: 100vh;
          padding: 20px;
          background: #fff; /* Plain background */
        }
        header {
          background-color: #333;
          padding: 20px;
          color: #fff;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .title {
          font-size: 2.5em;
          margin: 0;
          color: #fff;
        }
        .content {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          max-width: 600px;
          margin: 0 auto;
        }
        .account, .balance {
          font-size: 1.2em;
          margin: 10px 0;
          color: #333; /* Dark color for contrast */
        }
        .form-group {
          margin-top: 20px;
          padding: 15px;
          border-top: 1px solid #ddd;
        }
        .form-group h3 {
          margin-top: 0;
          color: #555;
        }
        .input-field {
          margin: 5px 0;
          padding: 12px;
          font-size: 1em;
          border-radius: 8px;
          border: 1px solid #ddd;
          width: 100%;
          box-sizing: border-box;
        }
        .btn {
          margin: 10px 5px;
          padding: 12px 25px;
          font-size: 1em;
          cursor: pointer;
          border-radius: 8px;
          border: none;
          color: #fff;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .deposit-btn {
          background-color: #28a745;
        }
        .deposit-btn:hover {
          background-color: #218838;
        }
        .withdraw-btn {
          background-color: #dc3545;
        }
        .withdraw-btn:hover {
          background-color: #c82333;
        }
        .auto-start-btn {
          background-color: #007bff;
        }
        .auto-start-btn:hover {
          background-color: #0056b3;
        }
        .auto-stop-btn {
          background-color: #ffc107;
        }
        .auto-stop-btn:hover {
          background-color: #e0a800;
        }
        .logout-btn {
          background-color: #6c757d;
        }
        .logout-btn:hover {
          background-color: #5a6268;
        }
        .error-text {
          color: #dc3545;
        }
      `}</style>
    </main>
  );
}
