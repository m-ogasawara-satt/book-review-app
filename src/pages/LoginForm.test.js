// 必要なライブラリをインポート
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

// LoginFormコンポーネントのテストスイートを定義
describe('LoginForm', () => {
    // 入力フォームが存在するかどうかをテストするテストケースを定義
    test('renders input forms', () => {
      // LoginFormコンポーネントをレンダリング
      render(<LoginForm />);
  
      // emailとpasswordの入力フォームが存在することを確認
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
  
      // 入力フォームが存在することをアサート
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });