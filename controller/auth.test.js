const auth = require('./auth');
const request = require('supertest');
const app = require('../app');



test('testing test api', async () => {
    const response = await request(app).get("/");

    expect(response.body.status).toBe(true);
    expect(response.statusCode).toBe(200);
})

test('login api with valid data', async () => {
    const response = await request(app).post("/auth/login").send(
        {
            email: 'Gouri@ams.com',
            password: 'testuser'
        }
    );
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(201);
})



test('login api with invalid password', async () => {
    const response = await request(app).post("/auth/login").send(
        {
            email: 'Gouri@ams.com',
            password: 'testingpassword'
        }
    );
    expect(response.body.message).toBe('Unauthorized');
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(401);
})



test('login api with null value', async () => {
    const response = await request(app).post("/auth/login").send(
        {
            email: '',
            password: 'fgdfgdfgsdsgfg'
        }
    );
    // console.log(response.body);
    expect(response.body.message).toBe('Email is required.');
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(500);
})



test('login api with-out password', async () => {
    const response = await request(app).post("/auth/login").send(
        {
            email: 'test@gmail.com',
            password: ''
        }
    );
    expect(response.body.message).toBe('password is required.');
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(500);
})


test('login api with invalid email id ', async () => {
    const response = await request(app).post("/auth/login").send(
        {
            email: 'test@gmail.com',
            password: 'testpassword'
        }
    );
    expect(response.body.message).toBe('User not exist');
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(401);
})





test('signup with existing data', async () => {
    const response = await request(app).post("/auth/signup").send(
        {
            "email": "Gouri@ams.com",
            "password": "testuser",
            "name": "Dr. Gouri",
            "doctor": {
                "doctor_name": "Dr. Gouri",
                "appointment_slot_time": "15",
                "day_start_time": "11:00",
                "day_end_time": "16:00"
            }
        }
    );
    expect(response.body.message).toBe('Alreay exist');
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(401);
})


// test('signup with new  data', async () => {
//     const response = await request(app).post("/auth/signup").send(
//         {
//             "email": Date.now() + "@ams.com",
//             "password": "testuser",
//             "name": "Dr. Gouri",
//             "doctor": {
//                 "doctor_name": "Dr. test",
//                 "appointment_slot_time": "15",
//                 "day_start_time": "11:00",
//                 "day_end_time": "16:00"
//             }
//         }
//     );
//     // console.log(response.body);
//     expect(response.body.status).toBe(true);
//     expect(response.body).toHaveProperty("token");
//     expect(response.statusCode).toBe(201);

// });


test('signup with new inproper data', async () => {
    const response = await request(app).post("/auth/signup").send(
        {
            "email": "@ams.com",
            "password": "",
            "name": "Dr. Gouri",
            "doctor": {
                "doctor_name": "Dr. test",
                "appointment_slot_time": "15",
                "day_start_time": "11:00",
                "day_end_time": "16:00"
            }
        }
    );
    expect(response.body.message).toBe('password is required.');
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(500);
})



test('test comparePassword function', async () => {
    let output = await auth.comparePassword('gdfgdfg','sgdfgrgytaeretgfgsr4y');
    expect(output).toBe(false);
    
},3000)




