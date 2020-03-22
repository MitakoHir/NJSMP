import { GroupController } from './GroupController';
import request from 'supertest';
import exampleServer from '../server';

describe('GroupController', () => {
    it('getGroupById should return 401 for unauthorized user', async () => {
        const result = await request(exampleServer.getApp()).get('/api/group/15');
        expect(result.status).toBe(401);
    });
});
