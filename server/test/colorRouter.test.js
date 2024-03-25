const request = require("supertest");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

jest.mock("../src/DB/database", () => {
  return jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(true),
    disconnect: jest.fn().mockResolvedValue(true),
    addColor: jest.fn().mockResolvedValue(true),
    removeColor: jest.fn().mockResolvedValue(true),
    getColors: jest
      .fn()
      .mockResolvedValue([{ color: "#FFFFFF" }, { color: "#000000" }]),
  }));
});

const colorRoutes = require("../src/routes/colorRouter");

// Ensuring JSON parsing for the routes
app.use("/color", colorRoutes);

describe("Color API endpoints with controller and DB mock", () => {
  // Tests remain largely the same, but the setup now includes our mocked DB operations

  test("GET /color should return a list of color, mocking initial empty array", async () => {
    const response = await request(app).get("/color");
    expect(response.statusCode).toBe(200);
    // Assuming the db.getcolor() returns [{ color: '#FFFFFF' }, { color: '#000000' }] as mocked
    expect(response.body).toEqual(["#FFFFFF", "#000000"]);
  });

  test("POST /color should add a color, mocking successful DB addition", async () => {
    const color = "FF5733"; // Without the #, since it's added in the controller
    const response = await request(app).post("/color").send({ color });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Color submitted successfully" });
  });

  test("POST /color should return an error if color is not provided", async () => {
    const response = await request(app).post("/color").send({});
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual("Color not provided");
  });

  test("POST /color/delete should remove a color, mocking successful DB removal", async () => {
    const color = "#FF5733"; // Assuming color with # for removal
    const response = await request(app).post("/color/delete").send({ color });
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual("Removed Color Successfully");
  });

  test("POST /color/delete should return an error if color is not provided", async () => {
    const response = await request(app).post("/color/delete").send({});
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual("Color not provided");
  });
});
