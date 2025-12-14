import React from 'react';

interface SweetCardProps {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    onPurchase: (id: string) => void;
    onDelete: (id: string) => void;
    isAdmin: boolean;
}

const SweetCard: React.FC<SweetCardProps> = ({ id, name, category, price, quantity, onPurchase, onDelete, isAdmin }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease', overflow: 'hidden', padding: 0 }}>
            <div style={{ height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={`https://placehold.co/400x300/FF6B6B/white?text=${name}`}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{name}</h3>
                    <span style={{ background: 'var(--accent)', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        ${price.toFixed(2)}
                    </span>
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>{category}</p>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: quantity < 5 ? 'var(--primary-dark)' : 'var(--text-light)' }}>
                        {quantity === 0 ? 'Out of Stock' : `${quantity} left`}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => onPurchase(id)}
                            disabled={quantity === 0}
                            className="btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', opacity: quantity === 0 ? 0.5 : 1 }}
                        >
                            But Add
                        </button>
                        {isAdmin && (
                            <button onClick={() => onDelete(id)} className="btn-secondary" style={{ padding: '0.5rem', borderColor: 'var(--primary-dark)', color: 'var(--primary-dark)' }}>
                                🗑️
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;