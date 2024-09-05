import { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from 'axios';
import config from '../../config';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [error, setError] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        setIsLogin(false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setSurname('');
        setError('');
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${config.apiURL}/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (
        email: string,
        password: string,
        name: string,
        surname: string
    ) => {
        try {
            const response = await axios.post(`${config.apiURL}/register`, {
                email,
                password,
                name,
                surname,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Email is not valid');
            return;
        }

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, name, surname);
            }
            onClose();
        } catch (error: any) {
            setError(error.response?.data.message || 'An error occurred');
        }
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (password !== value) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modalStyle" ref={modalRef}>
            <div className="modalHeader">
                <button
                    onClick={() => {
                        setIsLogin(true);
                        resetForm();
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(true);
                            resetForm();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(true);
                            resetForm();
                        }
                    }}
                    className={`loginButton ${isLogin ? 'active' : ''}`}
                    type="button"
                >
                    Login
                </button>
                <button
                    onClick={() => {
                        setIsLogin(false);
                        resetForm();
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(false);
                            resetForm();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsLogin(false);
                            resetForm();
                        }
                    }}
                    className={`signupButton ${!isLogin ? 'active' : ''}`}
                    type="button"
                >
                    Signup
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="name">
                        <input
                            id="name"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                {!isLogin && (
                    <div className="surname">
                        <input
                            id="surname"
                            placeholder="Surname"
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                )}
                <div className="email">
                    <input
                        id="email"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="password">
                    <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!isLogin && (
                    <div className="confirmPassword">
                        <input
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                )}
                {error && <div className="error">{error}</div>}
                <div className="submitForgotContainer">
                    {isLogin && (
                        <div className="forgotPassword">
                            <a className="forgotPasswordLink" href="#">
                                Forgot password?
                            </a>
                        </div>
                    )}
                    <div className="submitDiv">
                        <button className="submitButton" type="submit">
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginModal;
