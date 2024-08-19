import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [email, setEmail] = useState('');
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
        console.log('Login Attempt:', email, password);
        // Here you would usually send the email and password to the server
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
                    <div className='forgotPassword'>
                        <a className='forgotPasswordLink' href='#'>Forgot password?</a>
                    </div>
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
