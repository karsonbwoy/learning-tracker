import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import Task from '../models/Task.js';

let mongoServer;

before(async () => {
    try {
        mongoServer = await MongoMemoryServer.create();
        console.log('MongoMemoryServer started:'); // Log instance info
        const uri = mongoServer.getUri();
        console.log('MongoDB URI:', uri); // Log the URI for debugging
        await mongoose.connect(uri);
        console.log('MongoDB connection state after connect:', mongoose.connection.readyState); // Should log 1 (connected)
    } catch (err) {
        console.error('Error setting up MongoDB:', err);
        throw err;
    }
});

after(async () => {
    try {
        await mongoose.disconnect();
        await mongoServer.stop();
    } catch (err) {
        console.error('Error tearing down MongoDB:', err);
        throw err;
    }
});

test('GET /tasks returns empty array', async () => {
    const res = await request(app).get('/tasks');
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, []);
});