import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './SalaryNegotiation.css';

const SalaryNegotiation = ({ instance, provider, publicKey, account, contractAddresses }) => {
  const [negotiations, setNegotiations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (account && contractAddresses.SalaryNegotiation) {
      loadNegotiations();
    }
  }, [account, contractAddresses]);

  const loadNegotiations = async () => {
    // Загрузка переговоров с контракта
    setNegotiations([]);
  };

  const encryptValue = async (value) => {
    if (!instance || !publicKey) {
      throw new Error('FHEVM not initialized');
    }
    return instance.encrypt32(parseInt(value), publicKey);
  };

  return (
    <div className="salary-negotiation">
      <div className="negotiation-header">
        <h1>Salary Negotiations</h1>
        <p>Manage your private salary negotiations</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="negotiations-section">
        {negotiations.length === 0 ? (
          <div className="empty-state">
            <p>No active negotiations. Apply for jobs to start negotiating!</p>
          </div>
        ) : (
          <div className="negotiation-list">
            {negotiations.map((negotiation) => (
              <div key={negotiation.id} className="negotiation-item">
                <h3>Negotiation #{negotiation.id}</h3>
                <div className="negotiation-info">
                  <p><strong>Job ID:</strong> {negotiation.jobId}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${negotiation.isActive ? 'status-active' : 'status-inactive'}`}>
                      {negotiation.isActive ? 'Active' : 'Completed'}
                    </span>
                  </p>
                </div>
                {negotiation.isActive && (
                  <div className="negotiation-actions">
                    <button className="btn">Update Offer</button>
                    <button className="btn">Accept Offer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryNegotiation;

