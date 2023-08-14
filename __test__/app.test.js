const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/User.js');

jest.mock("../src/models/User.js", () => ({create: jest.fn()}));

describe('User Routes', () => {
    describe('CREATE functionality', () => {
        it('Should successfully createa  user, and return 200', async () => {
            // ARRANGE -
            const userData = {
                username: 'testUser',
                email:'test@test.com',
                password:'testpassword'
            };
            User.create.mockResolvedValue(userData);

            // ACT
            const response = await request(app).post('/users').send(userData);

            // ASSERT - expect response status to be 200
            expect(response.status).toBe(200);
            expect(response.text).toEqual(userData.username);
            expect(User.create).toHaveBeenCalled();
        });
        it('Should return an error if user creation fails', async () => {
            // ARRANGE
            const userData = {
                username: 'testUser',
                email:'test@test.com',
                password:'testpassword'
            };
            User.create.mockRejectedValue(new Error ('User Creation failed!'));

            // ACT
            const response = await request(app).post('/users').send(userData);

            // ASSERT
            expect(response.status).toBe(500);
            expect(response.text).toContain('User Creation failed!');
        })
    })
})