import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'f1d2d2f924e986ac86fdf7b36c94bcdf32e3d34971b3c4b6f0a7e09dbf2abf6a';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'Email and password are required' }),
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('auth-data');
        const usersCollection = db.collection('users');

        // Find user by email
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 401 }
            );
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 401 }
            );
        }

        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
export async function GET() {
    return new Response(
        JSON.stringify({ message: 'This is a POST API. Please use POST method to log in.' }),
        { status: 405 }
    );
}
