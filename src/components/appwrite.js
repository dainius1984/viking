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
                status: 'Oczekujące', // Changed from Status to status and default value
                total: orderData.total.toString(), // Ensure it's a string
                items: JSON.stringify(orderData.items), // Ensure items are properly stringified
                firstName: orderData.customerData?.Imie || '',
                lastName: orderData.customerData?.Nazwisko || '',
                email: orderData.customerData?.Email || '',
                phone: orderData.customerData?.Telefon || '',
                shipping: orderData.shippingDetails?.method || 'DPD',
                shippingCost: orderData.shippingDetails?.cost?.toString() || '0',
                discountApplied: !!orderData.discountApplied,
                discountAmount: orderData.discountAmount?.toString() || '0',
                subtotal: orderData.subtotal?.toString() || '0',
                payuOrderId: orderData.payuOrderId || '',
                createdAt: new Date().toISOString()
            }
        );
    } catch (error) {
        console.error('Appwrite order creation error:', error);
        throw error;
    }
};

export { client, account, ID, databases };