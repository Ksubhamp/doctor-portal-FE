const request = require('supertest');
const app = require('../app');

describe('/doctor', function () {

    test('get all doctor', async () => {
        const response = await request(app).get("/doctor");

        expect(response.body.status).toBe(true);
        expect(response.body).toHaveProperty("data");
        expect(response.statusCode).toBe(200);
    })

    test('test dashboard api', async () => {
        const user = await request(app).post("/auth/login").send(
            { email: 'Gouri@ams.com', password: 'testuser' });
        const response = await request(app).post("/doctor/dashboard").send({
            "date": "2022-05"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });
        // console.log(response.body);
        expect(response.body.status).toBe(true);
        expect(response.body).toHaveProperty("data");
        expect(response.statusCode).toBe(200);
    });


    test('test dashboard api with out date', async () => {
        const user = await request(app).post("/auth/login").send(
            { email: 'Gouri@ams.com', password: 'testuser' });
        const response = await request(app).post("/doctor/dashboard").send({
            // "date": "2022-05"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });
        expect(response.body.status).toBe(false);
        // expect(response.body.msg).toBe('Server error');
        expect(response.body.message).toBe("Required a valid date");
        expect(response.statusCode).toBe(500);
    });


    test('test appoinment  update status  api with  valid data', async () => {
        const user = await request(app).post("/auth/login").send(
            { email: 'Gouri@ams.com', password: 'testuser' });
        console.log(`Bearer ${user.body.token}`);
        const appouinments = await request(app).post("/doctor/dashboard").send({
            "date": "2022-05"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });

        const response = await request(app).post("/appointment/statusUpdate").send({
            id: appouinments.body.data.groupData[0]._id,
            appointment_status: "Closed"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });
            // console.log(response.body);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('status changed');
        expect(response.statusCode).toBe(200);
    });



    test('test appoinment  update status  api with out ID ', async () => {
        const user = await request(app).post("/auth/login").send(
            { email: 'Gouri@ams.com', password: 'testuser' });
        const response = await request(app).post("/appointment/statusUpdate").send({
            // id:appouinments.body.data.groupData[0]._id,
            appointment_status: "Closed"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });
        // console.log(response.body);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Required a valid appoinment ID');
        expect(response.statusCode).toBe(500);
    });

    test('test appoinment  update status  api with out appointment_status  ', async () => {
        const user = await request(app).post("/auth/login").send(
            { email: 'Gouri@ams.com', password: 'testuser' });
        // console.log(`Bearer ${user.body.token}`);
        const appouinments = await request(app).post("/doctor/dashboard").send({
            "date": "2022-05"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });

        const response = await request(app).post("/appointment/statusUpdate").send({
            id: appouinments.body.data.groupData[0]._id,
            // appointment_status:"Closed"
        })
            .set({ Authorization: `Bearer ${user.body.token}` });
        // console.log(response.body);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Required a valid appointment_status');
        expect(response.statusCode).toBe(500);
    });



});




// test('get all doctor', async () => {
//     const response = await request(app).get("/doctor");

//     expect(response.body.status).toBe(true);
//     expect(response.body).toHaveProperty("data");
//     expect(response.statusCode).toBe(201);
// })

// test('get all doctor', async () => {
//     const response = await request(app).post("/auth/login").send(
//         {
//             email: 'Gouri@ams.com',
//             password: 'testuser'
//         }
//     );
//     expect(response.body.status).toBe(true);
//     expect(response.body).toHaveProperty("data");
//     expect(response.statusCode).toBe(201);
// })
