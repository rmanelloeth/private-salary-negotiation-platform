import React from 'react';
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
              SalaryLock
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
              <h1>Welcome to SalaryLock</h1>
              <p>Private salary negotiations at your fingertips</p>
              <p style={{fontSize: '1rem', marginTop: '1rem', opacity: 0.8}}>Connect your wallet to get started</p>
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
        
        <footer className="app-footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>SalaryLock</h3>
                <p>Private salary negotiations powered by FHEVM technology</p>
              </div>
              <div className="footer-section">
                <h4>Network</h4>
                <p>Sepolia Testnet (Chain ID: 11155111)</p>
                <p className="footer-note">All transactions require wallet signature</p>
              </div>
              <div className="footer-section">
                <h4>Connect</h4>
                <div className="social-links">
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    Discord: DJ Rmanello
                  </a>
                  <a href="https://x.com/rmanellooo" target="_blank" rel="noopener noreferrer" className="social-link">
                    X: @rmanellooo
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>Built with ❤️ using <a href="https://v0.dev" target="_blank" rel="noopener noreferrer">v0</a></p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

