import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid verification link');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`/api/auth/verify-email/${token}`);
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        {loading && <p className="text-lg text-gray-600 dark:text-gray-400">Verifying your email...</p>}
        {!loading && message && <p className="text-lg text-gray-600 dark:text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
