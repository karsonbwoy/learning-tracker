import test, { after, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

let mongoServer;

before('Setup MongoDB', async () => {
    try {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    } catch (err) {
        console.error('Error setting up MongoDB:', err);
        throw err;
    }
});

beforeEach(() => {
    app.use((req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
    });
});

after('Teardown MongoDB', async () => {
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