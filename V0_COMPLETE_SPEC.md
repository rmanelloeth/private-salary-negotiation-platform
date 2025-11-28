# Полная спецификация для Vercel v0 - Private Salary Negotiation Platform

## 🎯 Задача

Создать полнофункциональное децентрализованное веб-приложение (dApp) для приватных переговоров о зарплате с интеграцией блокчейна Ethereum (Sepolia Testnet) и MetaMask.

---

## 📦 Технический стек

### Frontend
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.20.0
- **Blockchain:** Ethers.js 6.8.0
- **Build Tool:** Create React App 5.0.1
- **Styling:** CSS с градиентами и анимациями

### Blockchain
- **Network:** Sepolia Testnet (Chain ID: 11155111)
- **Wallet:** MetaMask integration
- **Contracts:** Solidity 0.8.20

---

## 🔗 Контракты и адреса

### JobMarketplace Contract
- **Address:** `0x57f315E773788e087f9123ccE6515BeD9BD7520F`
- **Network:** Sepolia Testnet
- **Explorer:** https://sepolia.etherscan.io/address/0x57f315E773788e087f9123ccE6515BeD9BD7520F

### SalaryNegotiation Contract
- **Address:** `0x08faCE30dc5538344ae275d128D2b92fFb8a492E`
- **Network:** Sepolia Testnet
- **Explorer:** https://sepolia.etherscan.io/address/0x08faCE30dc5538344ae275d128D2b92fFb8a492E

### Environment Variables (для Vercel)
```
REACT_APP_JOBMARKETPLACE_ADDRESS=0x57f315E773788e087f9123ccE6515BeD9BD7520F
REACT_APP_SALARYNEGOTIATION_ADDRESS=0x08faCE30dc5538344ae275d128D2b92fFb8a492E
```

---

## 📋 ABI контрактов

### JobMarketplace ABI
```json
[
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "jobId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "employer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "jobTitle", "type": "string"}
    ],
    "name": "JobCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "jobId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "candidate", "type": "address"}
    ],
    "name": "ApplicationSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint32", "name": "_minSalary", "type": "uint32"},
      {"internalType": "uint32", "name": "_maxSalary", "type": "uint32"},
      {"internalType": "string", "name": "_jobTitle", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"}
    ],
    "name": "createJob",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_jobId", "type": "uint256"},
      {"internalType": "uint32", "name": "_minExpected", "type": "uint32"},
      {"internalType": "uint32", "name": "_maxExpected", "type": "uint32"}
    ],
    "name": "applyForJob",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_jobId", "type": "uint256"}],
    "name": "getJob",
    "outputs": [
      {"internalType": "address", "name": "employer", "type": "address"},
      {"internalType": "uint32", "name": "minSalary", "type": "uint32"},
      {"internalType": "uint32", "name": "maxSalary", "type": "uint32"},
      {"internalType": "string", "name": "jobTitle", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "jobCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_employer", "type": "address"}],
    "name": "getEmployerJobs",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_candidate", "type": "address"}],
    "name": "getCandidateApplications",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_jobId", "type": "uint256"},
      {"internalType": "uint256", "name": "_applicationId", "type": "uint256"}
    ],
    "name": "confirmMatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

### SalaryNegotiation ABI
```json
[
  {
    "inputs": [
      {"internalType": "address", "name": "_candidate", "type": "address"},
      {"internalType": "uint256", "name": "_jobId", "type": "uint256"},
      {"internalType": "uint32", "name": "_initialOffer", "type": "uint32"}
    ],
    "name": "startNegotiation",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_negotiationId", "type": "uint256"}],
    "name": "acceptOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_negotiationId", "type": "uint256"}],
    "name": "getNegotiation",
    "outputs": [
      {"internalType": "address", "name": "employer", "type": "address"},
      {"internalType": "address", "name": "candidate", "type": "address"},
      {"internalType": "uint256", "name": "jobId", "type": "uint256"},
      {"internalType": "uint32", "name": "employerOffer", "type": "uint32"},
      {"internalType": "uint32", "name": "candidateCounter", "type": "uint32"},
      {"internalType": "bool", "name": "employerAccepted", "type": "bool"},
      {"internalType": "bool", "name": "candidateAccepted", "type": "bool"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserNegotiations",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  }
]
```

---

## 🎨 Дизайн и стили

### Цветовая палитра
```css
/* Основной градиент фона */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Цвета кнопок */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--primary-color: #667eea;
--secondary-color: #764ba2;

/* Цвета текста */
--text-primary: #333333;
--text-secondary: #666666;
--text-light: #888888;
--text-white: #ffffff;

/* Цвета статусов */
--success-bg: #d4edda;
--success-text: #155724;
--error-bg: #f8d7da;
--error-text: #721c24;
--active-bg: #d4edda;
--active-text: #155724;
--inactive-bg: #f8d7da;
--inactive-text: #721c24;

/* Тени */
--shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.15);
--shadow-hover: 0 6px 20px rgba(102, 126, 234, 0.4);
```

### Типографика
```css
/* Заголовки */
h1 {
  font-size: 2.5rem - 3rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.8rem - 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

/* Текст */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}
```

### Компоненты стилей

#### Навигация (Navbar)
```css
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.connect-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.connect-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

#### Карточки
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

#### Кнопки
```css
.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
```

---

## 🔌 Интеграция с блокчейном

### Подключение кошелька (MetaMask)

```javascript
// Импорты
import { ethers } from 'ethers';

// Функция подключения
const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Запрашиваем доступ к аккаунту
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        // Создаем провайдер
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Получаем signer для подписи транзакций
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        return { provider, signer, address };
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask not installed');
  }
};
```

### Создание экземпляра контракта

```javascript
import { ethers } from 'ethers';
import JobMarketplaceABI from './contracts/JobMarketplaceABI.json';

const JOB_MARKETPLACE_ADDRESS = '0x57f315E773788e087f9123ccE6515BeD9BD7520F';

// Создание контракта
const contract = new ethers.Contract(
  JOB_MARKETPLACE_ADDRESS,
  JobMarketplaceABI,
  signer  // signer от provider.getSigner()
);
```

### Вызов функций контракта

#### Создание вакансии
```javascript
const createJob = async (minSalary, maxSalary, title, description) => {
  try {
    // Вызываем функцию контракта
    // MetaMask автоматически откроется для подписи
    const tx = await contract.createJob(
      minSalary,      // uint32
      maxSalary,      // uint32
      title,          // string
      description     // string
    );
    
    // Показываем статус
    console.log('Transaction sent:', tx.hash);
    
    // Ждем подтверждения
    await tx.wait();
    
    console.log('Transaction confirmed!');
    return tx.hash;
  } catch (error) {
    if (error.code === 4001) {
      // Пользователь отклонил транзакцию
      throw new Error('Transaction rejected by user');
    }
    throw error;
  }
};
```

#### Подача заявки
```javascript
const applyForJob = async (jobId, minExpected, maxExpected) => {
  try {
    const tx = await contract.applyForJob(
      jobId,          // uint256
      minExpected,    // uint32
      maxExpected     // uint32
    );
    
    await tx.wait();
    return tx.hash;
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('Transaction rejected by user');
    }
    throw error;
  }
};
```

#### Чтение данных (view функции)
```javascript
// Получить информацию о вакансии
const getJob = async (jobId) => {
  const jobData = await contract.getJob(jobId);
  return {
    employer: jobData.employer,
    minSalary: jobData.minSalary.toString(),
    maxSalary: jobData.maxSalary.toString(),
    title: jobData.jobTitle,
    description: jobData.description,
    isActive: jobData.isActive,
    createdAt: jobData.createdAt.toString(),
  };
};

// Получить количество вакансий
const getJobCount = async () => {
  const count = await contract.jobCounter();
  return parseInt(count.toString());
};

// Получить вакансии работодателя
const getEmployerJobs = async (employerAddress) => {
  const jobIds = await contract.getEmployerJobs(employerAddress);
  return jobIds.map(id => parseInt(id.toString()));
};
```

---

## 📱 Структура компонентов React

### 1. App.js (Главный компонент)
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useFhevm } from './hooks/useFhevm';
import Dashboard from './components/Dashboard';
import JobMarketplace from './components/JobMarketplace';
import SalaryNegotiation from './components/SalaryNegotiation';

function App() {
  const { 
    provider, 
    account, 
    connect, 
    isConnected, 
    contractAddresses 
  } = useFhevm();

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          {/* Навигация */}
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard ... />} />
            <Route path="/marketplace" element={<JobMarketplace ... />} />
            <Route path="/negotiations" element={<SalaryNegotiation ... />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
```

### 2. useFhevm Hook (Управление кошельком)
```javascript
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useFhevm = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contractAddresses, setContractAddresses] = useState({
    JobMarketplace: process.env.REACT_APP_JOBMARKETPLACE_ADDRESS || '',
    SalaryNegotiation: process.env.REACT_APP_SALARYNEGOTIATION_ADDRESS || '',
  });

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);

        // Слушаем изменения аккаунта
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) {
            setIsConnected(false);
            setAccount(null);
            setProvider(null);
          } else {
            connect();
          }
        });
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return { provider, account, isConnected, connect, contractAddresses };
};
```

### 3. JobMarketplace Component
```javascript
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import JobMarketplaceABI from '../contracts/JobMarketplaceABI.json';

const JobMarketplace = ({ provider, account, contractAddresses }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Загрузка вакансий
  const loadJobs = async () => {
    if (!provider || !account || !contractAddresses.JobMarketplace) return;
    
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddresses.JobMarketplace,
      JobMarketplaceABI,
      signer
    );
    
    const jobCount = await contract.jobCounter();
    const jobsList = [];
    
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
          });
        }
      } catch (err) {
        console.log(`Job ${i} not found`);
      }
    }
    
    setJobs(jobsList);
  };

  // Создание вакансии
  const createJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.JobMarketplace,
        JobMarketplaceABI,
        signer
      );

      const minSalary = parseInt(e.target.minSalary.value);
      const maxSalary = parseInt(e.target.maxSalary.value);
      const title = e.target.title.value;
      const description = e.target.description.value;

      // MetaMask откроется для подписи
      const tx = await contract.createJob(
        minSalary,
        maxSalary,
        title,
        description
      );

      setSuccess('Transaction sent! Waiting for confirmation...');
      await tx.wait();
      setSuccess('Job created successfully!');
      
      // Обновляем список
      loadJobs();
    } catch (err) {
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else {
        setError(err.message || 'Failed to create job');
      }
    } finally {
      setLoading(false);
    }
  };

  // Подача заявки
  const applyForJob = async (jobId, minExpected, maxExpected) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.JobMarketplace,
        JobMarketplaceABI,
        signer
      );

      const tx = await contract.applyForJob(
        jobId,
        minExpected,
        maxExpected
      );

      setSuccess('Transaction sent! Waiting for confirmation...');
      await tx.wait();
      setSuccess('Application submitted successfully!');
      
      loadJobs();
    } catch (err) {
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else {
        setError(err.message || 'Failed to submit application');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account && contractAddresses.JobMarketplace) {
      loadJobs();
    }
  }, [account, contractAddresses]);

  return (
    <div className="job-marketplace">
      {/* UI компоненты */}
    </div>
  );
};
```

---

## 🎨 Полный UI/UX дизайн

### Главная страница (Dashboard)

**Структура:**
```
┌─────────────────────────────────────────┐
│  Navbar: Logo | Links | Connect Wallet │
├─────────────────────────────────────────┤
│                                          │
│  Dashboard                                │
│  Welcome to your private salary...       │
│                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │ 💼   │  │ 📝   │  │ 🤝   │          │
│  │ Jobs │  │ Apps │  │ Negs │          │
│  │  0   │  │  0   │  │  0   │          │
│  └──────┘  └──────┘  └──────┘          │
│                                          │
│  🔐 How It Works                         │
│  ┌──────────────────────────────────┐  │
│  │ 1. Create or Apply               │  │
│  │ Employers create job listings... │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ 2. Private Matching              │  │
│  │ Our FHE system matches...        │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ 3. Secure Negotiation            │  │
│  │ After matching, parties...       │  │
│  └──────────────────────────────────┘  │
│                                          │
│  📋 Contract Addresses                   │
│  JobMarketplace: 0x57f3...520F          │
│  SalaryNegotiation: 0x08fa...92fE       │
│                                          │
└─────────────────────────────────────────┘
```

### Job Marketplace

**Структура:**
```
┌─────────────────────────────────────────┐
│  Job Marketplace    [+ Create Job]      │
├─────────────────────────────────────────┤
│                                          │
│  [Форма создания вакансии - если открыта]│
│  ┌──────────────────────────────────┐  │
│  │ Create New Job                   │  │
│  │ Job Title: [________]            │  │
│  │ Description: [________]          │  │
│  │ Min Salary: [____] Max: [____]   │  │
│  │ [Create Job] [Cancel]            │  │
│  └──────────────────────────────────┘  │
│                                          │
│  Available Jobs                          │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ Senior Developer                  │  │
│  │ We are looking for...             │  │
│  │ Employer: 0x4039...2BBf | Active │  │
│  │ [Apply Now]                       │  │
│  │                                   │  │
│  │ [Форма заявки - если открыта]     │  │
│  │ Min Expected: [____]              │  │
│  │ Max Expected: [____]               │  │
│  │ [Submit Application] [Cancel]     │  │
│  └──────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

---

## ⚙️ Обработка транзакций

### Процесс транзакции

1. **Пользователь нажимает кнопку** (например, "Create Job")
2. **Валидация формы** на клиенте
3. **Создание контракта** с signer
4. **Вызов функции контракта** - MetaMask автоматически открывается
5. **Пользователь подписывает** транзакцию в MetaMask
6. **Транзакция отправляется** в сеть
7. **Показывается статус** "Transaction sent! Waiting for confirmation..."
8. **Ожидание подтверждения** - `await tx.wait()`
9. **Успех** - показывается "Job created successfully!"
10. **Обновление данных** - перезагрузка списка вакансий

### Обработка ошибок

```javascript
try {
  const tx = await contract.createJob(...);
  await tx.wait();
} catch (error) {
  if (error.code === 4001) {
    // Пользователь отклонил транзакцию
    setError('Transaction rejected by user');
  } else if (error.code === 'INSUFFICIENT_FUNDS') {
    setError('Insufficient funds for transaction');
  } else if (error.message.includes('revert')) {
    setError('Transaction failed: ' + error.reason);
  } else {
    setError('Error: ' + error.message);
  }
}
```

---

## 📦 Package.json зависимости

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "ethers": "^6.8.0"
  }
}
```

---

## 🔧 Настройка для Vercel

### Build Settings
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### Environment Variables
```
REACT_APP_JOBMARKETPLACE_ADDRESS=0x57f315E773788e087f9123ccE6515BeD9BD7520F
REACT_APP_SALARYNEGOTIATION_ADDRESS=0x08faCE30dc5538344ae275d128D2b92fFb8a492E
```

---

## 📝 Полный код компонентов

### Структура файлов
```
frontend/
├── public/
│   ├── index.html
│   └── deployments.json
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── contracts/
│   │   ├── JobMarketplaceABI.json
│   │   └── SalaryNegotiationABI.json
│   ├── hooks/
│   │   └── useFhevm.js
│   └── components/
│       ├── Dashboard.js
│       ├── Dashboard.css
│       ├── JobMarketplace.js
│       ├── JobMarketplace.css
│       ├── SalaryNegotiation.js
│       └── SalaryNegotiation.css
└── package.json
```

---

## 🎯 Ключевые функции для реализации

### 1. Подключение кошелька
- Проверка наличия MetaMask
- Запрос доступа к аккаунту
- Создание provider и signer
- Обработка смены аккаунта

### 2. Создание вакансии
- Валидация формы
- Вызов `contract.createJob()`
- Обработка транзакции
- Обновление UI

### 3. Подача заявки
- Выбор вакансии
- Ввод зарплатных ожиданий
- Вызов `contract.applyForJob()`
- Обработка результата

### 4. Загрузка данных
- Получение количества вакансий
- Итерация по вакансиям
- Загрузка деталей каждой вакансии
- Отображение в UI

### 5. Переговоры
- Загрузка переговоров пользователя
- Отображение статуса
- Принятие предложений
- Обновление состояния

---

## 🚀 Готово к использованию в Vercel v0

Эта спецификация содержит всю необходимую информацию для создания полнофункционального dApp:
- ✅ Полные ABI контрактов
- ✅ Адреса контрактов
- ✅ Примеры кода интеграции
- ✅ Дизайн и стили
- ✅ Структура компонентов
- ✅ Обработка транзакций
- ✅ Обработка ошибок

Скопируйте это описание в Vercel v0, и оно создаст полностью рабочий сайт с интеграцией блокчейна!

