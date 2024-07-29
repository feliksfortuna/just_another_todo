import { useState, useEffect } from 'react';
import './style.css';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Login Attempt:', username, password);
        // Here you would usually send the username and password to the server
        onClose(); // Close the modal on submit
    };

    if (!isOpen) return null;

    return (
        <div className='modalStyle'>
            <div className='modalHeader'>
                <button
                    onClick={() => setIsLogin(true)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(true);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(true);
                        }
                    }}
                    className={isLogin ? 'active' : ''}
                    type="button" // Add explicit type prop for the button element
                >
                    Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(false);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(false);
                        }
                    }}
                    className={!isLogin ? 'active' : ''}
                    type="button" // Add explicit type prop for the button element
                >
                    Signup
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!isLogin && (
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                        />
                    </div>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
        </div>
    );
};

export default LoginModal;