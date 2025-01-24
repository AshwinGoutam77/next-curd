import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';  // Ensure correct import path

export async function DELETE(req) {
    try {
        // Parse the request body for the ID of the document to delete
        const { id } = await req.json();

        // Check if the ID is provided
        if (!id) {
            return new Response(
                JSON.stringify({ error: 'ID is required to delete the data.' }),
                { status: 400 }
            );
        }

        // MongoDB connection
        const client = await clientPromise; // Ensure clientPromise is resolving correctly
        const db = client.db('form-data'); // Replace with your actual database name
        const collection = db.collection('form-data'); // Replace with your actual collection name

        // Delete the document with the provided ID
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        // If no document is deleted, return an error message
        if (result.deletedCount === 0) {
            return new Response(
                JSON.stringify({ error: 'No data found with the provided ID.' }),
                { status: 404 }
            );
        }

        // Return success response
        return new Response(
            JSON.stringify({ message: 'Data deleted successfully.' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting data:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete data.' }),
            { status: 500 }
        );
    }
}
