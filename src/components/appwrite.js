import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('675450b800155ca5e891');

const account = new Account(client);
const databases = new Databases(client);

// Helper function to create an order
export const createOrder = async (orderData) => {
    try {
        // Ensure items are in the correct format
        const items = Array.isArray(orderData.items) ? orderData.items : [];
        
        console.log('Creating order in Appwrite:', {
            userId: orderData.userId,
            orderNumber: orderData.orderNumber,
            isAuthenticated: orderData.isAuthenticated,
            itemsCount: items.length,
            items: items // Log the actual items
        });

        return await databases.createDocument(
            '67545c1800028e002c86',
            '67545c2c001276c2c261',
            ID.unique(),
            {
                userId: orderData.userId,
                orderNumber: orderData.orderNumber,
                status: 'PENDING',
                total: orderData.total.toString(),
                items: JSON.stringify(items), // Store the items directly
                firstName: orderData.customerData?.Imie || '',
                lastName: orderData.customerData?.Nazwisko || '',
                email: orderData.customerData?.Email || '',
                phone: orderData.customerData?.Telefon || '',
                shipping: orderData.shippingDetails?.method || 'DPD',
                shippingCost: orderData.shippingDetails?.cost || '0',
                discountApplied: !!orderData.discountApplied,
                discountAmount: orderData.discountAmount?.toString() || '0',
                subtotal: orderData.subtotal?.toString() || '0',
                payuOrderId: orderData.payuOrderId || '',
                createdAt: orderData.createdAt || new Date().toISOString(),
                isAuthenticated: orderData.isAuthenticated || false
            }
        );
    } catch (error) {
        console.error('Appwrite order creation error:', {
            error,
            items: orderData.items,
            orderNumber: orderData.orderNumber
        });
        throw error;
    }
};

export { client, account, ID, databases };