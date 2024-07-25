import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
	event.preventDefault();
	console.log('Login Attempt:', username, password);
	// Here you would usually send the username and password to the server
	onClose(); // Close the modal on submit
  };

  if (!isOpen) return null;

  return (
	<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
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
	<button type="button" onClick={onClose}>Close</button>
	</div>
  );
};

export default LoginModal;