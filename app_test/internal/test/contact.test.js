import supertest from "supertest";
import app from "../app/app.js";
import {createTestBook, getAllBooks, getBookByCode, getBookById} from "./test-util.js";

describe('POST /api/books', function () {
    let newBookId;
    it('should can create new book', async () => {
        const result = await supertest(app)
            .post("/api/books")
            .send({
                code: "C029",
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                stock: 10
            });

        expect(result.status).toBe(201);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.code).toBe("C029");
        expect(result.body.data.title).toBe("The Great Gatsby");
        expect(result.body.data.author).toBe("F. Scott Fitzgerald");
        expect(result.body.data.stock).toBe(10);
        newBookId = result.body.data.id;
    });

    afterEach(async () => {
        if (newBookId) {
            await supertest(app).delete(`/api/books/${newBookId}`);
        }
    });
});

describe('GET /api/books', function () {
    it('should get the all books', async () => {
        const response = await supertest(app)
            .get("/api/books")

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success get all books');
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
