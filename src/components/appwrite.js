import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('675450b800155ca5e891');

const account = new Account(client);
const databases = new Databases(client);

// Helper function to create an order
export const createOrder = async (orderData) => {
    try {
        // Format items in the exact required structure
        const items = (orderData.orderData?.cart || []).map(item => ({
            id: item.id?.toLowerCase() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, ''),
            n: item.name,
            p: parseInt(Number(item.price)),
            q: parseInt(item.quantity) || 1,
            image: `/img/products/${item.id?.toLowerCase() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`
        }));

        console.log('Creating order in Appwrite:', {
            orderNumber: orderData.orderNumber,
            itemsCount: items.length,
            formattedItems: items
        });

        const documentData = {
            userId: orderData.userId,
            orderNumber: orderData.orderNumber,
            status: 'PENDING',
            total: orderData.orderData.total.toString(),
            items: JSON.stringify(items), // Store the formatted items array
            firstName: orderData.customerData?.Imie || '',
            lastName: orderData.customerData?.Nazwisko || '',
            email: orderData.customerData?.Email || '',
            phone: orderData.customerData?.Telefon || '',
            shipping: orderData.orderData.shipping || 'DPD',
            shippingCost: orderData.orderData.shippingCost?.toString() || '0',
            discountApplied: !!orderData.orderData.discountApplied,
            discountAmount: orderData.orderData.discountAmount?.toString() || '0',
            subtotal: orderData.orderData.subtotal?.toString() || '0',
            payuOrderId: orderData.orderData.payuOrderId || '',
            createdAt: orderData.orderData.createdAt || new Date().toISOString(),
            isAuthenticated: orderData.isAuthenticated || false
        };

        console.log('Storing document with items:', {
            orderNumber: orderData.orderNumber,
            items: items
        });

        return await databases.createDocument(
            '67545c1800028e002c86',
            '67545c2c001276c2c261',
            ID.unique(),
            documentData
        );
    } catch (error) {
        console.error('Appwrite order creation error:', {
            error,
            orderNumber: orderData.orderNumber,
            items: orderData.orderData?.cart
        });
        throw error;
    }
};

export { client, account, ID, databases };