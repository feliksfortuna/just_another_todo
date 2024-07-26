import { useState, useEffect } from 'react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [windowWidth, setWindowWidth] = useState(
	typeof window !== 'undefined' ? window.innerWidth : 0
  );

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

  const modalStyle: React.CSSProperties = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: 'white',
	color: 'black',
	padding: windowWidth < 600 ? '10px' : '20px',
	zIndex: 1000,
	border: '1px solid #ccc',
	borderRadius: '8px',
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	width: windowWidth < 600 ? '90%' : 'auto',
  };

  return (
	<div className='login' style={modalStyle}>
	  <h2>Login</h2>
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
		<button type="submit">Login</button>
	  </form>
	</div>
  );
};

export default LoginModal;