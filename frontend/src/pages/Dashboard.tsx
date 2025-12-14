import React, { useEffect, useState } from 'react';
import { getSweets } from '../api/api';
import SweetCard from '../components/SweetCard';
import SearchBar from '../components/SearchBar';

const Dashboard: React.FC = () => {
    const [sweets, setSweets] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSweetsData = async () => {
            const data = await getSweets();
            setSweets(data);
        };
        fetchSweetsData();
    }, []);

    const filteredSweets = sweets.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard container" style={{ paddingBottom: '3rem' }}>
            <div style={{ textAlign: 'center', margin: '3rem 0', padding: '3rem', background: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Indulge in Sweetness</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>Discover our handcrafted selection of premium delights.</p>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <SearchBar onSearch={setSearchTerm} />
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', borderLeft: '5px solid var(--primary)', paddingLeft: '1rem' }}>Available Sweets</h2>

            <div className="sweet-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {filteredSweets.map(sweet => (
                    <SweetCard
                        key={sweet.id || sweet._id}
                        id={sweet.id || sweet._id}
                        name={sweet.name}
                        category={sweet.category}
                        price={sweet.price}
                        quantity={sweet.quantity}
                        onPurchase={(id) => console.log('Purchase', id)}
                        onDelete={(id) => console.log('Delete', id)}
                        isAdmin={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;