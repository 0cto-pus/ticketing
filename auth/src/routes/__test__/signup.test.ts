import request from "supertest";
import { app } from "../../app";


it('returns a 201 on succesfull signup', async()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'deneme1@gmail.com',
            password: 'password123'
        })
        .expect(201);
})

it('return a 400 with an invalid email',async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'yanlis',
            password: 'password123'
        })
        .expect(400);
});

it('return a 400 with an invalid passwod', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'dogru@gmail.com',
            password: 'ynl'
        })
        .expect(400);
});

it('return a 400 with an invalid email and password', async () =>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'no',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password:'net',
        })
        .expect(400);
});

it('dissallows duplicate emails', async()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'duplicate@gmail.com',
            password: 'duplicate',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email:'duplicate@gmail.com',
            password: 'duplicate',
        })
        .expect(400);
});

it('sets a cookie after successfull signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password',
        })
        .expect(201)
        
    expect(response.get('Set-Cookie')).toBeDefined();
})