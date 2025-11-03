import React from "react";

export default function Header({ account, onConnect }) {
  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null;

  return (
    <header className="header">
      <div className="brand">
        <img
          src="https://cdn-icons-png.flaticon.com/512/846/846449.png"
          alt="logo"
          className="logo"
        />
        <h1>LandLedger DApp</h1>
      </div>

      {account ? (
        <div className="wallet-connected">
          <div className="dot" />
          <span>{shortAddress}</span>
        </div>
      ) : (
        <button className="connect-btn" onClick={onConnect}>
          🔗 Connect Wallet
        </button>
      )}
    </header>
  );
}
