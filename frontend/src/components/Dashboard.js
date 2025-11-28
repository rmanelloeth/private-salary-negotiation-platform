import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
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
        <p>Welcome to your private salary negotiation platform</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h3>My Jobs</h3>
            <p className="stat-value">{stats.myJobs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>My Applications</h3>
            <p className="stat-value">{stats.myApplications}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <h3>Active Negotiations</h3>
            <p className="stat-value">{stats.activeNegotiations}</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="card">
          <h2>🔐 How It Works</h2>
          <div className="info-content">
            <div className="info-item">
              <h3>1. Create or Apply</h3>
              <p>Employers create job listings with encrypted salary ranges. Candidates apply with encrypted expectations.</p>
            </div>
            <div className="info-item">
              <h3>2. Private Matching</h3>
              <p>Our FHE system matches candidates to jobs based on encrypted ranges without revealing individual values.</p>
            </div>
            <div className="info-item">
              <h3>3. Secure Negotiation</h3>
              <p>After matching, parties can negotiate with encrypted offers. No one sees values until both agree.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>📋 Contract Addresses</h2>
          <div className="address-list">
            <div className="address-item">
              <strong>JobMarketplace:</strong>
              <code>{contractAddresses.JobMarketplace || 'Not deployed'}</code>
            </div>
            <div className="address-item">
              <strong>SalaryNegotiation:</strong>
              <code>{contractAddresses.SalaryNegotiation || 'Not deployed'}</code>
            </div>
            <div className="address-item">
              <strong>FHEToken:</strong>
              <code>{contractAddresses.FHEToken || 'Not deployed'}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

