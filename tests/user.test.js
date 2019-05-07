const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const { user1, user1Id, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)


test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: "Paulo Tester",
            email: "paulo@test.com",
            password: "prlprlprl"
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    // expect(response.body.user.name).toBe('Paulo Tester')
    expect(response.body).toMatchObject({
        user: {
            name: 'Paulo Tester',
            email: 'paulo@test.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('prlprlprl')
})

test('Should log in existing user', async () => {
    response = await request(app)
        .post('/users/login')
        .send({
            email: user1.email,
            password: user1.password
    }).expect(200)

    const user = await User.findById(user1Id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login unknown user', async () => {
    await request(app).post('/users/login').send({
        name: user1.name,
        password: 'BAD PASSWORD123'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send().expect(200)
})

test('Should not get profile for unauth user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    
    const user = await User.findById(user1Id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/dump.jpg')
        .expect(200)

    const user = await User.findById(user1Id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})