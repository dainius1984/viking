import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('675450b800155ca5e891');

const account = new Account(client);
const databases = new Databases(client);

// Helper function to create an order
export const createOrder = async (orderData) => {
    try {
        console.log('Creating order in Appwrite:', {
            userId: orderData.userId,
            orderNumber: orderData.orderNumber,
            isAuthenticated: orderData.isAuthenticated,
            items: orderData.orderData?.items // Log items for debugging
        });

        // Format items in the required structure
        const formattedItems = (orderData.orderData?.cart || []).map(item => ({
            id: item.id?.toLowerCase() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, ''),
            n: item.name,
            p: parseInt(Number(item.price)),
            q: parseInt(item.quantity) || 1,
            image: item.image || `/img/products/${item.id?.toLowerCase() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`
        }));

        console.log('Formatted items:', formattedItems);

        return await databases.createDocument(
            '67545c1800028e002c86',
            '67545c2c001276c2c261',
            ID.unique(),
            {
                userId: orderData.userId,
                orderNumber: orderData.orderNumber,
                status: 'PENDING',
                total: orderData.orderData.total.toString(),
                items: JSON.stringify(formattedItems), // Store formatted items
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
            }
        );
    } catch (error) {
        console.error('Appwrite order creation error:', {
            error,
            items: orderData.orderData?.items,
            orderNumber: orderData.orderNumber
        });
        throw error;
    }
};

export { client, account, ID, databases };