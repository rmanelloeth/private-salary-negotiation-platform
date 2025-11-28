import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Contract addresses - будут обновлены после деплоя
const CONTRACT_ADDRESSES = {
  JobMarketplace: process.env.REACT_APP_JOBMARKETPLACE_ADDRESS || '',
  SalaryNegotiation: process.env.REACT_APP_SALARYNEGOTIATION_ADDRESS || '',
  FHEToken: process.env.REACT_APP_FHETOKEN_ADDRESS || '',
};

export const useFhevm = () => {
  const [instance, setInstance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contractAddresses, setContractAddresses] = useState(CONTRACT_ADDRESSES);

  useEffect(() => {
    // Загружаем адреса контрактов из deployments.json если доступно
    fetch('/deployments.json')
      .then(res => res.json())
      .then(data => {
        if (data.contracts) {
          setContractAddresses({
            JobMarketplace: data.contracts.JobMarketplace,
            SalaryNegotiation: data.contracts.SalaryNegotiation,
            FHEToken: data.contracts.FHEToken,
          });
        }
      })
      .catch(() => {
        // Используем значения по умолчанию
        console.log('Using default contract addresses');
      });
  }, []);

  const SEPOLIA_CHAIN_ID = '0xaa36a7'; // 11155111 в hex
  const SEPOLIA_NETWORK = {
    chainId: SEPOLIA_CHAIN_ID,
    chainName: 'Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError) {
      // Если сеть не добавлена, добавляем её
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_NETWORK],
          });
        } catch (addError) {
          throw new Error('Failed to add Sepolia network');
        }
      } else {
        throw switchError;
      }
    }
  };

  const checkNetwork = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== SEPOLIA_CHAIN_ID) {
      const shouldSwitch = window.confirm(
        'Please switch to Sepolia Testnet to use this dApp. Switch now?'
      );
      if (shouldSwitch) {
        await switchToSepolia();
      } else {
        throw new Error('Please switch to Sepolia Testnet');
      }
    }
  };

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Проверяем и переключаем на Sepolia
        await checkNetwork();

        // Запрашиваем доступ к аккаунту
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts.length > 0) {
          // Создаем провайдер
          const web3Provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(web3Provider);

          // Получаем аккаунт
          const signer = await web3Provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          setIsConnected(true);

          // FHEVM будет добавлен позже при интеграции полной версии
          // Пока используем упрощенную версию без FHE
          setInstance(null);
          setPublicKey(null);

          // Слушаем изменения аккаунта
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
              setIsConnected(false);
              setAccount(null);
              setInstance(null);
              setProvider(null);
              setPublicKey(null);
            } else {
              connect();
            }
          });

          // Слушаем изменения сети
          window.ethereum.on('chainChanged', (chainId) => {
            if (chainId !== SEPOLIA_CHAIN_ID) {
              alert('Please switch to Sepolia Testnet');
              setIsConnected(false);
            } else {
              connect();
            }
          });
        }
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet: ' + error.message);
    }
  };

  return {
    instance,
    provider,
    publicKey,
    account,
    isConnected,
    connect,
    contractAddresses,
  };
};

