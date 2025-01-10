import { useState } from 'react';

function PasswordGate({ onCorrectPassword, children }) {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === import.meta.env.VITE_APP_PASSWORD) {
            setIsAuthenticated(true);
            onCorrectPassword();
            setError('');
        } else {
            setError('Incorrect password');
            setPassword('');
        }
    };

    if (isAuthenticated) {
        return children;
    }

    return (
        <div className="password-gate">
            <h1>Where is Achee?</h1>
            <p>Enter the password to track Achee's journey</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="password-input"
                />
                <button type="submit">Enter</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default PasswordGate; 