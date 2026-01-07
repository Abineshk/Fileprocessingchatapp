import { useState } from 'react';
import Home from './pages/Home';
import { Login } from './pages/Login';

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadTime: Date;
  status: 'processing' | 'ready' | 'error';
}

export interface Message {
  id: string;
  type: 'user' | 'system' | 'status';
  content: string;
  timestamp: Date;
}

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  const handleLogin = (username: string, password: string) => {
    // Dummy credentials validation
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };


  return (
    <div>
      {isAuthenticated ? <Home /> : <Login onLogin={handleLogin} error={loginError} />}
    </div>
  );
}