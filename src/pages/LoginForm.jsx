// ReactとそのuseStateフックをインポート
import React, { useState } from 'react';
import './loginForm.css';

// LoginFormという関数コンポーネントを定義
function LoginForm() {
  // email, password, emailError, submitSuccessという名前のstateを作成
  // メールアドレス、パスワード、メールアドレスのエラーメッセージ、送信成功フラグを管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // メールアドレスのバリデーションを行う関数を定義
  const validateEmail = (email) => {
    // メールアドレスの形式を検証する正規表現を定義
    // @より前の部分に特殊文字を含まないかどうか、@より後の部分にドメイン名が含まれているかどうかを確認
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // メールアドレスが正規表現にマッチするかどうかを返す
    return re.test(String(email).toLowerCase());
  }

  // フォームの送信を処理する関数を定義
  const handleSubmit = (event) => {
    // フォームのデフォルトの送信動作をキャンセル
    event.preventDefault();
    // エラーメッセージと成功メッセージをリセット
    setEmailError('');
    setSubmitSuccess(false);
    // メールアドレスが無効な場合、エラーメッセージを設定して処理を終了
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    // メールアドレスとパスワードをログに出力
    console.log(`Email: ${email}, Password: ${password}`);
    // 送信が成功したら、submitSuccessをtrueに設定
    setSubmitSuccess(true);
  };

// LoginFormコンポーネントのUIを返す
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)} // 入力が変更されたときに、emailのstateを更新
      />
      {/* emailErrorが存在する場合、エラーメッセージを表示 */}
      {emailError && <div className="error-message">{emailError}</div>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)} // 入力が変更されたときに、passwordのstateを更新
      />
      <button type="submit">Submit</button>
      {/* submitSuccessがtrueの場合、"success"と表示 */}
      {submitSuccess && <div className="success-message">Success</div>}
    </form>
  );
}

// LoginFormコンポーネントをエクスポート
export default LoginForm;