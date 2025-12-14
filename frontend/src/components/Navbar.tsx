import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
            <div className="logo">
                <Link to="/dashboard" style={{ textDecoration: 'none', fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>
                    🍬 LOBHAS SWEETSHOP
                </Link>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0, alignItems: 'center' }}>
                <li><Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: '500' }}>Dashboard</Link></li>
                <li><Link to="/admin" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: '500' }}>Admin</Link></li>
                {user ? (
                    <>
                        <li style={{ color: 'var(--text-light)' }}><span>Hi, {user.username || 'User'}</span></li>
                        <li><button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', border: 'none', background: 'transparent' }}>Login</Link></li>
                        <li><Link to="/register" className="btn-primary" style={{ textDecoration: 'none', color: 'white' }}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
