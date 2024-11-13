import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import AppLayout from '../components/layout/AppLayout';


const LoginPage: React.FC = () => {
  return (
    <AppLayout>
      <LoginForm />
    </AppLayout>
  );
};

export default LoginPage;