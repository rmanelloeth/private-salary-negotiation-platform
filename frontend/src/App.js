import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useFhevm } from './hooks/useFhevm';
import JobMarketplace from './components/JobMarketplace';
import SalaryNegotiation from './components/SalaryNegotiation';
import Dashboard from './components/Dashboard';

function App() {
  const { 
    instance, 
    provider, 
    publicKey, 
    connect, 
    isConnected, 
    account,
    contractAddresses 
  } = useFhevm();

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🔐 Private Salary Platform
            </Link>
            <div className="nav-menu">
              <Link to="/" className="nav-link">Dashboard</Link>
              <Link to="/marketplace" className="nav-link">Job Marketplace</Link>
              <Link to="/negotiations" className="nav-link">Negotiations</Link>
              {!isConnected ? (
                <button onClick={connect} className="connect-btn">
                  Connect Wallet
                </button>
              ) : (
                <div className="account-info">
                  <span className="account-address">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className="main-content">
          {!isConnected ? (
            <div className="connect-prompt">
              <h1>Welcome to Private Salary Negotiation Platform</h1>
              <p>Connect your wallet to get started</p>
              <button onClick={connect} className="connect-btn-large">
                Connect Wallet
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard instance={instance} provider={provider} publicKey={publicKey} account={account} contractAddresses={contractAddresses} />} />
              <Route path="/marketplace" element={<JobMarketplace instance={instance} provider={provider} publicKey={publicKey} account={account} contractAddresses={contractAddresses} />} />
              <Route path="/negotiations" element={<SalaryNegotiation instance={instance} provider={provider} publicKey={publicKey} account={account} contractAddresses={contractAddresses} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;

