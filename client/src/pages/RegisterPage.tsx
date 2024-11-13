import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import AppLayout from '../components/layout/AppLayout';

const RegisterPage: React.FC = () => {
  return (
    <AppLayout>
      <RegisterForm />
    </AppLayout>
  );
};

export default RegisterPage;