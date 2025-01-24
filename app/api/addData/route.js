import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB

export async function POST(req) {
    try {
        const body = await req.json();
        const { _id, name, description, image } = body;

        if (!name || !description || !image) {
            return new Response(
                JSON.stringify({ error: 'All fields are required: name, description, and image' }),
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('form-data');
        const collection = db.collection('form-data');

        let result;

        if (_id) {
            // Update existing document
            const objectId = new ObjectId(_id);
            const updateResult = await collection.updateOne(
                { _id: objectId },
                {
                    $set: { name, description, image, updatedAt: new Date() },
                }
            );

            if (updateResult.matchedCount === 0) {
                return new Response(
                    JSON.stringify({ error: 'Document not found or update failed' }),
                    { status: 404 }
                );
            }

            result = { message: 'Data updated successfully', data: updateResult };
        } else {
            // Insert new document
            const insertResult = await collection.insertOne({
                name,
                description,
                image,
                createdAt: new Date(),
            });

            result = { message: 'Data added successfully', data: insertResult };
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Server Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function GET() {
    return new Response(
        JSON.stringify({ message: 'This is a POST API. Please use POST method to add or edit data.' }),
        { status: 405 }
    );
}
