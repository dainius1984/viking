import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('675450b800155ca5e891');

const account = new Account(client);
const databases = new Databases(client);

// Helper function to create an order
export const createOrder = async (orderData) => {
    try {
        return await databases.createDocument(
            '67545c1800028e002c86',
            '67545c2c001276c2c261',
            ID.unique(),
            {
                userId: orderData.userId,
                orderNumber: orderData.orderNumber,
                Status: 'pending',
                total: orderData.total,
                items: orderData.items,
                customerData: orderData.customerData,
                shippingDetails: orderData.shippingDetails,
                discountApplied: orderData.discountApplied,
                discountAmount: orderData.discountAmount,
                subtotal: orderData.subtotal,
                paymentMethod: 'PayU',
                createdAt: new Date().toISOString()
            }
        );
    } catch (error) {
        console.error('Appwrite order creation error:', error);
        throw error;
    }
};

export { client, account, ID, databases };