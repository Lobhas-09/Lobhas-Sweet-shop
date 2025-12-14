import React, { useEffect, useState } from 'react';
import { getSweets, deleteSweet } from '../api/api';
import SweetForm from '../components/SweetForm';

const AdminPanel = () => {
    const [sweets, setSweets] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSweet, setCurrentSweet] = useState(null);

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        const data = await getSweets();
        setSweets(data);
    };

    const handleEdit = (sweet: any) => {
        setCurrentSweet(sweet);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        await deleteSweet(id);
        fetchSweets();
    };

    const handleFormSubmit = () => {
        setIsEditing(false);
        setCurrentSweet(null);
        fetchSweets();
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem', color: 'var(--text-dark)' }}>Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--secondary)' }}>{currentSweet ? 'Edit Sweet' : 'Add New Sweet'}</h3>
                    <SweetForm sweet={currentSweet} onSubmit={handleFormSubmit} />
                </div>

                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem' }}>Inventory Management</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {sweets.map((sweet) => (
                            <li key={sweet._id || sweet.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
                                        <img src={`https://placehold.co/100x100/FF6B6B/white?text=${sweet.name.charAt(0)}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: '600', fontSize: '1.1rem', display: 'block' }}>{sweet.name}</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>${sweet.price} • {sweet.quantity} in stock</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEdit(sweet)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Edit</button>
                                    <button onClick={() => handleDelete(sweet._id || sweet.id)} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', background: 'var(--primary-dark)', boxShadow: 'none' }}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;