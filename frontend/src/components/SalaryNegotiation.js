import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SalaryNegotiationABI from '../contracts/SalaryNegotiationABI.json';
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
    if (!provider || !account || !contractAddresses.SalaryNegotiation) return;
    
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.SalaryNegotiation,
        SalaryNegotiationABI,
        signer
      );
      
      // Получаем переговоры пользователя
      const negotiationIds = await contract.getUserNegotiations(account);
      const negotiationsList = [];
      
      for (const id of negotiationIds) {
        try {
          const negotiationData = await contract.getNegotiation(id);
          if (negotiationData.isActive || negotiationData.employerAccepted || negotiationData.candidateAccepted) {
            negotiationsList.push({
              id: id.toString(),
              employer: negotiationData.employer,
              candidate: negotiationData.candidate,
              jobId: negotiationData.jobId.toString(),
              employerOffer: negotiationData.employerOffer.toString(),
              candidateCounter: negotiationData.candidateCounter.toString(),
              employerAccepted: negotiationData.employerAccepted,
              candidateAccepted: negotiationData.candidateAccepted,
              isActive: negotiationData.isActive,
              createdAt: negotiationData.createdAt.toString(),
              lastUpdated: negotiationData.lastUpdated.toString(),
            });
          }
        } catch (err) {
          console.log(`Negotiation ${id} error:`, err);
        }
      }
      
      setNegotiations(negotiationsList);
    } catch (error) {
      console.error('Error loading negotiations:', error);
      setError('Failed to load negotiations: ' + error.message);
    }
  };

  const acceptOffer = async (negotiationId) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!provider || !account) {
        throw new Error('Wallet not connected');
      }

      if (!contractAddresses.SalaryNegotiation) {
        throw new Error('Contract address not set');
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.SalaryNegotiation,
        SalaryNegotiationABI,
        signer
      );

      const tx = await contract.acceptOffer(negotiationId);
      setSuccess('Transaction sent! Waiting for confirmation...');
      await tx.wait();
      setSuccess('Offer accepted successfully!');
      loadNegotiations();
    } catch (err) {
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else {
        setError(err.message || 'Failed to accept offer');
      }
      console.error('Error accepting offer:', err);
    } finally {
      setLoading(false);
    }
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
                    <button 
                      className="btn" 
                      onClick={() => acceptOffer(negotiation.id)}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Accept Offer'}
                    </button>
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

