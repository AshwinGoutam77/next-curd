import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://ashwindevwings:X11r4TK9SpyDM7nn@cluster0.jw0iu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV !== 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
