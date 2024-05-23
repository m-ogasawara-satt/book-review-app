import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

// トークンを管理するためのatomを定義
export const tokenState = atom({
  key: 'tokenState',
  default: '', // デフォルト値を空文字列に設定
});

// トークンを設定するためのカスタムフックを定義
export const useToken = () => {
  const setToken = useSetRecoilState(tokenState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token); // ローカルストレージからトークンを読み込み、それをRecoilの状態に設定
    }
  }, [setToken]);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken); // トークンをローカルストレージに保存
    setToken(newToken); // トークンをatomに保存
  };

  return saveToken;
};

// トークンを取得するためのカスタムフックを定義します
export const useTokenValue = () => useRecoilValue(tokenState);
