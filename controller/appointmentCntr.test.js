const request = require('supertest');
const app = require('../app');


describe('/appoinment', function () {

    test('check appoinment data', async () => {
        const response = await request(app).post("/appointment").send({ "doctor_id": "62724a9535802fcf6f1d7f3c", "date": "2022-05-10T18:30:00.000Z" });
        console.log(response.body);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Appointdata  get successfully.');
        expect(response.body).toHaveProperty("data");
        expect(response.statusCode).toBe(200);
    });


    test('check appoinment data with null value', async () => {
        const response = await request(app).post("/appointment").send({ "doctor_id": "", "date": "2022-05-10T18:30:00.000Z" });
        console.log(response.body);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Required a valid ID');
        expect(response.statusCode).toBe(500);
    });


    test('check appoinment data with null value', async () => {
        const response = await request(app).post("/appointment").send({ "doctor_id": "62724a9535802fcf6f1d7f3c", "date": "" });
        console.log(response.body);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Required a valid appointment_date');
        expect(response.statusCode).toBe(500);
    });



    test('check bok apooinment  ', async () => {
        const response = await request(app).post("/appointment/book").send(
            {
                "appointment_date":"05/17/2022",
                "doctor_id":"62724a4f35802fcf6f1d7f2c",
                "appointment_time":"09:30",
                "patient_name":"Ram nath sing",
                "patinet_email":"rama@yopmail.com",
                "patinet_phone":"5874145211"
            
            }
            );
        // console.log(response.body);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Appointment already exists');
        expect(response.statusCode).toBe(400);
    });


    test('check bok apooinment new data ', async () => {
        const response = await request(app).post("/appointment/book").send(
            // {
            //     "appointment_date":"05/18/2022",
            //     "doctor_id":"62724a4f35802fcf6f1d7f2c",
            //     "appointment_time":"09:30",
            //     "patient_name":"Ram nath sing",
            //     "patinet_email":"rama@yopmail.com",
            //     "patinet_phone":"5874145211"
            
            // }
            );
        // console.log(response.body);
        expect(response.body.status).toBe(false);
        // expect(response.body.message).toBe('Appointment booked successfully.');
        expect(response.statusCode).toBe(500);
    });





});
