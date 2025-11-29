import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ instance, provider, publicKey, account, contractAddresses }) => {
  const [stats, setStats] = useState({
    myJobs: 0,
    myApplications: 0,
    activeNegotiations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account && contractAddresses.JobMarketplace) {
      loadStats();
    }
  }, [account, contractAddresses]);

  const loadStats = async () => {
    try {
      setLoading(true);
      // Здесь можно загрузить статистику с контрактов
      // Для примера используем заглушки
      setStats({
        myJobs: 0,
        myApplications: 0,
        activeNegotiations: 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Private salary negotiations at your fingertips</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h3>Active Listings</h3>
            <p className="stat-value">{stats.myJobs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Applications</h3>
            <p className="stat-value">{stats.myApplications}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <h3>Negotiations</h3>
            <p className="stat-value">{stats.activeNegotiations}</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="card">
          <h2>How It Works</h2>
          <div className="info-content">
            <div className="info-item">
              <div className="step-number">STEP 01</div>
              <h3>Post or Apply</h3>
              <p>Employers post encrypted ranges. Candidates apply with encrypted expectations.</p>
            </div>
            <div className="info-item">
              <div className="step-number">STEP 02</div>
              <h3>Private Matching</h3>
              <p>Our FHE system matches candidates without revealing individual salary values.</p>
            </div>
            <div className="info-item">
              <div className="step-number">STEP 03</div>
              <h3>Secure Negotiation</h3>
              <p>Negotiate encrypted offers. Values remain hidden until mutual agreement.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Contract Information</h2>
          <div className="address-list">
            <div className="address-item">
              <strong>JobMarketplace Contract</strong>
              <code>{contractAddresses.JobMarketplace || 'Not deployed'}</code>
            </div>
            <div className="address-item">
              <strong>SalaryNegotiation Contract</strong>
              <code>{contractAddresses.SalaryNegotiation || 'Not deployed'}</code>
            </div>
            {contractAddresses.FHEToken && (
              <div className="address-item">
                <strong>FHEToken Contract</strong>
                <code>{contractAddresses.FHEToken}</code>
              </div>
            )}
          </div>
          <div className="network-info">
            <p><strong>Network:</strong> Sepolia Testnet (Chain ID: 11155111)</p>
            <p className="network-note">All transactions require wallet signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

