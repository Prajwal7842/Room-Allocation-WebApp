import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import app from "./server.js"
const request = require('supertest');
import {Room} from "./models/Room";

// Tested
describe("Get /activity", () => {
    test("Status Code should be 200 and type should be json list", async () => {
        const response = await request(app).get("/activity");
        console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("POST /activity/add", () => {
    describe("Given a applicant, activity, roomNumber, status",  () => {
        test("Should be status Code = 201", async () => {
            const response = await request(app).post("/activity/add").send({
                applicant: "Applicant Name",
                activity: "Test Activity",
                roomNumber: "A204",
                status: "Pending",
                createdAt: new Date()
            });
            console.log(response);
            expect(response.type).toBe("application/json");
            expect(response.statusCode).toBe(201);
        })
    })  
})

// Tested
describe("Get /rooms", () => {
    test("Status Code should be 200 and type should be json list", async () => {
        const response = await request(app).get("/rooms");
        console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("POST /rooms/add", () => {
    describe("Given a room Number",  () => {
        test("Should be status Code = 201", async () => {
            const response = await request(app).post("/rooms/add").send({
                roomNumber: "TestRoom"
            });
            // console.log(response);
            expect(response.type).toBe("application/json");
            expect(response.statusCode).toBe(201);
        })
        test("Should be status Code = 401", async () => {
            const response = await request(app).post("/rooms/add").send({
                roomNumber: "TestRoom"
            });
            // console.log(response);
            expect(response.type).toBe("text/html");
            expect(response.statusCode).toBe(401);
        })
    })  
})

// Tested
describe("UPDATE /rrom/delete/:id", () => {
    test("Should be status Code 201", async () => {
        const room = await Room.findOne({roomNumber: "TestRoom"});
        const id = room._id;
        const response = await request(app).patch(`/rooms/update/${id}`).send({
            roomNumber: "Test Room"
        })
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toBe(201);
    })
})

// Tested
describe("DELETE /rooms/delete/:id", () => {
    test("Should be status Code 201", async () => {
        const room = await Room.findOne({roomNumber: "Test Room"});
        const id = room._id
        const response = await request(app).delete(`/rooms/delete/${id}`)
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toBe(201);
    })
})
