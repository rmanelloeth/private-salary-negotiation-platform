import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import JobMarketplaceABI from '../contracts/JobMarketplaceABI.json';
import './JobMarketplace.css';

const JobMarketplace = ({ instance, provider, publicKey, account, contractAddresses }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(null);
  
  // Form states
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    minSalary: '',
    maxSalary: '',
  });
  
  const [applicationForm, setApplicationForm] = useState({
    minExpected: '',
    maxExpected: '',
  });

  useEffect(() => {
    if (account && contractAddresses.JobMarketplace) {
      loadJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, contractAddresses]);

  const loadJobs = async () => {
    if (!provider || !account || !contractAddresses.JobMarketplace) return;
    
    try {
      // Проверяем сеть
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 11155111) {
        setError('Please switch to Sepolia Testnet (Chain ID: 11155111)');
        return;
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.JobMarketplace,
        JobMarketplaceABI,
        signer
      );
      
      // Проверяем что контракт существует (проверяем jobCounter)
      let jobCount;
      try {
        jobCount = await contract.jobCounter();
      } catch (err) {
        if (err.code === 'CALL_EXCEPTION') {
          setError('Contract not found. Please check that you are on Sepolia Testnet and contract is deployed.');
          return;
        }
        throw err;
      }

      const jobsList = [];
      
      // Загружаем все вакансии
      for (let i = 0; i < jobCount; i++) {
        try {
          const jobData = await contract.getJob(i);
          if (jobData.isActive) {
            jobsList.push({
              id: i,
              employer: jobData.employer,
              minSalary: jobData.minSalary.toString(),
              maxSalary: jobData.maxSalary.toString(),
              title: jobData.jobTitle,
              description: jobData.description,
              isActive: jobData.isActive,
              createdAt: jobData.createdAt.toString(),
            });
          }
        } catch (err) {
          // Игнорируем ошибки для несуществующих вакансий
          if (err.code !== 'CALL_EXCEPTION') {
            console.log(`Job ${i} error:`, err);
          }
        }
      }
      
      setJobs(jobsList);
    } catch (error) {
      console.error('Error loading jobs:', error);
      if (error.code === 'CALL_EXCEPTION') {
        setError('Contract call failed. Please check: 1) You are on Sepolia Testnet, 2) Contract is deployed, 3) Contract address is correct.');
      } else {
        setError('Failed to load jobs: ' + error.message);
      }
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!provider || !account) {
        throw new Error('Wallet not connected');
      }

      if (!contractAddresses.JobMarketplace) {
        throw new Error('Contract address not set');
      }

      const minSalary = parseInt(jobForm.minSalary);
      const maxSalary = parseInt(jobForm.maxSalary);

      if (minSalary > maxSalary) {
        throw new Error('Min salary cannot be greater than max salary');
      }

      // Проверяем сеть
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 11155111) {
        throw new Error('Please switch to Sepolia Testnet (Chain ID: 11155111)');
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.JobMarketplace,
        JobMarketplaceABI,
        signer
      );

      // Проверяем что контракт существует перед вызовом
      try {
        await contract.jobCounter();
      } catch (err) {
        if (err.code === 'CALL_EXCEPTION') {
          throw new Error('Contract not found. Please check network and contract address.');
        }
        throw err;
      }

      // Вызываем контракт - MetaMask откроется для подписи транзакции
      const tx = await contract.createJob(
        minSalary,
        maxSalary,
        jobForm.title,
        jobForm.description
      );

      setSuccess('Transaction sent! Waiting for confirmation...');
      
      // Ждем подтверждения транзакции
      await tx.wait();
      
      setSuccess('Job created successfully!');
      setJobForm({ title: '', description: '', minSalary: '', maxSalary: '' });
      setShowCreateForm(false);
      loadJobs();
    } catch (err) {
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else if (err.code === 'CALL_EXCEPTION') {
        setError('Contract call failed. Check: 1) Sepolia network, 2) Contract deployed, 3) Correct address');
      } else if (err.message.includes('network')) {
        setError('Network error: ' + err.message);
      } else {
        setError(err.message || 'Failed to create job');
      }
      console.error('Error creating job:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId, e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!provider || !account) {
        throw new Error('Wallet not connected');
      }

      if (!contractAddresses.JobMarketplace) {
        throw new Error('Contract address not set');
      }

      const minExpected = parseInt(applicationForm.minExpected);
      const maxExpected = parseInt(applicationForm.maxExpected);

      if (minExpected > maxExpected) {
        throw new Error('Min expected cannot be greater than max expected');
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.JobMarketplace,
        JobMarketplaceABI,
        signer
      );

      // Вызываем контракт - MetaMask откроется для подписи транзакции
      const tx = await contract.applyForJob(
        jobId,
        minExpected,
        maxExpected
      );

      setSuccess('Transaction sent! Waiting for confirmation...');
      
      // Ждем подтверждения транзакции
      await tx.wait();
      
      setSuccess('Application submitted successfully!');
      setApplicationForm({ minExpected: '', maxExpected: '' });
      setShowApplyForm(null);
      loadJobs();
    } catch (err) {
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else if (err.code === 'CALL_EXCEPTION') {
        setError('Contract call failed. Check: 1) Sepolia network, 2) Contract deployed, 3) Job exists');
      } else if (err.message.includes('network')) {
        setError('Network error: ' + err.message);
      } else {
        setError(err.message || 'Failed to submit application');
      }
      console.error('Error applying for job:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-marketplace">
      <div className="marketplace-header">
        <h1>Job Marketplace</h1>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn">
          {showCreateForm ? 'Cancel' : '+ Create Job'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {showCreateForm && (
        <div className="card">
          <h2>Create New Job</h2>
          <form onSubmit={createJob}>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min Salary</label>
                <input
                  type="number"
                  value={jobForm.minSalary}
                  onChange={(e) => setJobForm({ ...jobForm, minSalary: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Max Salary</label>
                <input
                  type="number"
                  value={jobForm.maxSalary}
                  onChange={(e) => setJobForm({ ...jobForm, maxSalary: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Job'}
            </button>
          </form>
        </div>
      )}

      <div className="jobs-section">
        <h2>Available Jobs</h2>
        {jobs.length === 0 ? (
          <div className="empty-state">
            <p>No jobs available yet. Be the first to create one!</p>
          </div>
        ) : (
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className="job-meta">
                  <span>Employer: {job.employer?.slice(0, 6)}...{job.employer?.slice(-4)}</span>
                  <span className="status-badge status-active">Active</span>
                </div>
                {showApplyForm === job.id ? (
                  <form onSubmit={(e) => applyForJob(job.id, e)} className="apply-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Min Expected Salary</label>
                        <input
                          type="number"
                          value={applicationForm.minExpected}
                          onChange={(e) => setApplicationForm({ ...applicationForm, minExpected: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Max Expected Salary</label>
                        <input
                          type="number"
                          value={applicationForm.maxExpected}
                          onChange={(e) => setApplicationForm({ ...applicationForm, maxExpected: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowApplyForm(job.id)}
                    className="btn btn-small"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMarketplace;

