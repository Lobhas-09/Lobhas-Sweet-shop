import mongoose from 'mongoose';
import Sweet from '../backend/src/models/sweet.model';
import User from '../backend/src/models/user.model';

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing data
        await Sweet.deleteMany({});
        await User.deleteMany({});

        // Seed users
        const adminUser = new User({
            username: 'admin',
            password: 'admin123', // In a real application, ensure to hash passwords
            role: 'admin',
        });

        const regularUser = new User({
            username: 'user',
            password: 'user123', // In a real application, ensure to hash passwords
            role: 'user',
        });

        await adminUser.save();
        await regularUser.save();

        // Seed sweets
        const sweets = [
            { name: 'Chocolate Bar', category: 'Chocolate', price: 1.5, quantity: 100 },
            { name: 'Gummy Bears', category: 'Gummy', price: 2.0, quantity: 50 },
            { name: 'Lollipop', category: 'Candy', price: 0.5, quantity: 200 },
            { name: 'Marshmallows', category: 'Candy', price: 1.0, quantity: 75 },
        ];

        await Sweet.insertMany(sweets);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

seedDatabase();