import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../api/api';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await register({ username, password });
            history.push('/login'); // Redirect to login after successful registration
        } catch (err: any) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--secondary)', fontSize: '2rem' }}>Join the Sweetness</h2>
                {error && <p className="error" style={{ color: 'var(--primary-dark)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', background: 'var(--secondary)', boxShadow: '0 4px 6px rgba(78, 205, 196, 0.2)' }}>Register</button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    Already have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => history.push('/login')}>Log in</span>
                </div>
            </div>
        </div>
    );
};

export default Register;