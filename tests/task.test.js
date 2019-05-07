const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')

const { 
    user1,
    user1Id,
    user2,
    task1,
    task2,
    task3,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'From my Unit Test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should return all user1 tests', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('SHould not allow user1 to delete user2 tasks', async () => {
    await request(app)
        .delete(`/tasks/${task3._id}`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(task3._id)
    expect(task).not.toBeNull()
})