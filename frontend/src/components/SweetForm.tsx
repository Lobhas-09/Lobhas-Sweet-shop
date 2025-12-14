import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createSweet, updateSweet, getSweetById } from '../api/api';

interface SweetFormProps {
    sweet?: any;
    onSubmit?: () => void;
}

const SweetForm: React.FC<SweetFormProps> = ({ sweet: initialSweet, onSubmit }) => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [sweet, setSweet] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (initialSweet) {
            setSweet({
                name: initialSweet.name,
                category: initialSweet.category,
                price: initialSweet.price.toString(),
                quantity: initialSweet.quantity.toString()
            });
            setIsEditing(true);
        } else if (id) {
            setIsEditing(true);
            const fetchSweet = async () => {
                const sweetData = await getSweetById(id);
                setSweet({
                    ...sweetData,
                    price: sweetData.price.toString(),
                    quantity: sweetData.quantity.toString()
                });
            };
            fetchSweet();
        }
    }, [id, initialSweet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSweet({ ...sweet, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...sweet,
            price: parseFloat(sweet.price),
            quantity: parseInt(sweet.quantity)
        };

        if (isEditing) {
            const tempId = initialSweet?._id || initialSweet?.id || id;
            if (tempId) {
                await updateSweet(tempId, payload);
            }
        } else {
            await createSweet(payload);
        }

        if (onSubmit) {
            onSubmit();
        } else {
            history.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Sweet' : 'Add Sweet'}</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={sweet.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" name="category" value={sweet.category} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={sweet.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Quantity:</label>
                <input type="number" name="quantity" value={sweet.quantity} onChange={handleChange} required />
            </div>
            <button type="submit">{isEditing ? 'Update Sweet' : 'Add Sweet'}</button>
        </form>
    );
};

export default SweetForm;