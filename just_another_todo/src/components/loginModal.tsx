import { useState, useEffect } from 'react';
import './style.css';
import { register, login } from '@/apiService';
import { on } from 'events';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (isLogin) {
                const data = await login(email, password);
                console.log(data);
            } else {
                const data = await register(email, password, name, surname);
                console.log(data);
            }
            onClose();
        } catch (error) {
            setError((error as Error).message);
        }
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
                    className={`loginButton ${isLogin ? 'active' : ''}`}
                    type='button' // Add explicit type prop for the button element
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
                    className={`signupButton ${!isLogin ? 'active' : ''}`}
                    type='button' // Add explicit type prop for the button element
                >
                    Signup
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className='name'>
                        <input
                            id='name'
                            placeholder='Name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                {!isLogin && (
                    <div className='surname'>
                        <input
                            id='surname'
                            placeholder='Surname'
                            type='text'
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                )}
                <div className='email'>
                    <input
                        id='email'
                        placeholder='Email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='password'>
                    <input
                        id='password'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!isLogin && (
                    <div className='confirmPassword'>
                        <input
                            id='confirmPassword'
                            placeholder='Confirm Password'
                            type='password'
                        />
                    </div>
                )}
                <div className='submitForgotContainer'>
                    {isLogin && (
                        <div className='forgotPassword'>
                            <a className='forgotPasswordLink' href='#'>Forgot password?</a>
                        </div>
                    )}
                    <div className='submitDiv'>
                        <button className='submitButton' type='submit'>
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginModal;
