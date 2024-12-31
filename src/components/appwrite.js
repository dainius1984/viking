// appwrite.js modifications

import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('675450b800155ca5e891');

const account = new Account(client);
const databases = new Databases(client);

// Helper function to create an order
export const createOrder = async (orderData) => {
    try {
        // Ensure we have the current session before creating the order
        const currentUser = await account.get();
        
        return await databases.createDocument(
            '67545c1800028e002c86',    // Your database ID
            '67545c2c001276c2c261',    // Your collection ID
            ID.unique(),
            {
                userId: currentUser?.$id || 'guest',
                orderNumber: orderData.orderNumber || `ORD-${Date.now()}`,
                status: 'pending',
                total: orderData.total,
                ...orderData
            }
        );
    } catch (error) {
        console.error('Error creating order:', error);
        // If there's an authentication error, throw a specific error
        if (error.code === 401) {
            throw new Error('Please log in again to complete your order.');
        }
        throw error;
    }
};

export { client, account, ID, databases };