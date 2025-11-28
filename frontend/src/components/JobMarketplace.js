import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
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
  }, [account, contractAddresses]);

  const loadJobs = async () => {
    // Загрузка вакансий с контракта
    // Здесь будет интеграция с контрактом
    setJobs([]);
  };

  const encryptValue = async (value) => {
    if (!instance || !publicKey) {
      throw new Error('FHEVM not initialized');
    }
    return instance.encrypt32(parseInt(value), publicKey);
  };

  const createJob = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!instance || !publicKey) {
        throw new Error('FHEVM not initialized');
      }

      // Шифруем значения зарплат
      const encryptedMin = await encryptValue(jobForm.minSalary);
      const encryptedMax = await encryptValue(jobForm.maxSalary);

      // Здесь будет вызов контракта
      // const contract = new ethers.Contract(...);
      // await contract.createJob(encryptedMin, encryptedMax, jobForm.title, jobForm.description);

      setSuccess('Job created successfully!');
      setJobForm({ title: '', description: '', minSalary: '', maxSalary: '' });
      setShowCreateForm(false);
      loadJobs();
    } catch (err) {
      setError(err.message || 'Failed to create job');
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
      if (!instance || !publicKey) {
        throw new Error('FHEVM not initialized');
      }

      // Шифруем ожидания
      const encryptedMin = await encryptValue(applicationForm.minExpected);
      const encryptedMax = await encryptValue(applicationForm.maxExpected);

      // Здесь будет вызов контракта
      // const contract = new ethers.Contract(...);
      // await contract.applyForJob(jobId, encryptedMin, encryptedMax);

      setSuccess('Application submitted successfully!');
      setApplicationForm({ minExpected: '', maxExpected: '' });
      setShowApplyForm(null);
      loadJobs();
    } catch (err) {
      setError(err.message || 'Failed to submit application');
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
                <label>Min Salary (encrypted)</label>
                <input
                  type="number"
                  value={jobForm.minSalary}
                  onChange={(e) => setJobForm({ ...jobForm, minSalary: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Max Salary (encrypted)</label>
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

