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
                payuOrderId: orderData.payuOrderId,
                payuExtOrderId: orderData.payuExtOrderId,
                status: 'Oczekujące',
                total: orderData.total.toString(),
                items: Array.isArray(orderData.items) ? orderData.items : [],
                subtotal: orderData.subtotal?.toString() || '0',
                discountAmount: orderData.discountAmount?.toString() || '0',
                customerData: {
                    Imie: orderData.customerData?.Imie || '',
                    Nazwisko: orderData.customerData?.Nazwisko || '',
                    Email: orderData.customerData?.Email || '',
                    Telefon: orderData.customerData?.Telefon || '',
                    Ulica: orderData.customerData?.Ulica || '',
                    'Kod pocztowy': orderData.customerData?.['Kod pocztowy'] || '',
                    Miasto: orderData.customerData?.Miasto || '',
                    Firma: orderData.customerData?.Firma || '',
                    Uwagi: orderData.customerData?.Uwagi || ''
                },
                shippingDetails: {
                    method: orderData.shippingDetails?.method || 'DPD',
                    cost: orderData.shippingDetails?.cost || '15.00'
                },
                discountApplied: !!orderData.discountApplied,
                paymentMethod: 'PayU',
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            }
        );
    } catch (error) {
        console.error('Appwrite order creation error:', error);
        throw error;
    }
};

// Helper function to get order status
export const getOrderStatus = async (orderId) => {
    try {
        const documents = await databases.listDocuments(
            '67545c1800028e002c86',
            '67545c2c001276c2c261',
            [
                Query.equal('payuOrderId', orderId)
            ]
        );
        
        if (documents?.documents?.length > 0) {
            return documents.documents[0].status;
        }
        return null;
    } catch (error) {
        console.error('Appwrite get order status error:', error);
        throw error;
    }
};

// Helper function to get order by number
export const getOrderByNumber = async (orderNumber) => {
    try {
        const documents = await databases.listDocuments(
            '67545c1800028e002c86',
            '67545c2c001276c2c261',
            [
                Query.equal('orderNumber', orderNumber)
            ]
        );
        
        return documents?.documents?.[0] || null;
    } catch (error) {
        console.error('Appwrite get order error:', error);
        throw error;
    }
};

export { client, account, ID, databases };