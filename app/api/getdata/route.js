import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        // MongoDB connection
        const client = await clientPromise;
        const db = client.db('form-data');
        const collection = db.collection('form-data');

        // Fetch all data from the collection
        const data = await collection.find({}).toArray(); // Find all documents in the collection

        // Return the data in the response
        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch data from the database' }),
            { status: 500 }
        );
    }
}