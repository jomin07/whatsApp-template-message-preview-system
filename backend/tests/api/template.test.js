import request from "supertest";
import express from "express";
import templateRoutes from "../../routes/templateRoutes.js";
import { errorHandler } from "../../middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use("/api/templates", templateRoutes);
app.use(errorHandler);

describe("Template API", () => {
  it("should parse template and replace placeholders", async () => {
    const res = await request(app)
      .post("/api/templates/parse")
      .send({
        template: "Hello, {{name}}!",
        data: { name: "John" },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("parsedMessage", "Hello, John!");
  });

  it("should validate template and extract placeholders", async () => {
    const res = await request(app).get(
      "/api/templates/validate?template=Hello, {{user}}!"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("placeholders");
    expect(res.body.placeholders).toContain("user");
  });

  it("should generate preview with sample data", async () => {
    const res = await request(app)
      .post("/api/templates/preview")
      .send({
        template: "Welcome, {{username}}!",
        sampleData: { username: "Alice" },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("preview", "Welcome, Alice!");
  });

  it("should return error for invalid template in parse", async () => {
    const res = await request(app).post("/api/templates/parse").send({});
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty(
      "message",
      "Invalid or missing template string."
    );
  });

  it("should return error for invalid template in validation", async () => {
    const res = await request(app).get("/api/templates/validate");
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty(
      "message",
      "Invalid or missing template string."
    );
  });

  it("should return error for invalid placeholders in preview", async () => {
    const res = await request(app).post("/api/templates/preview").send({
      template: "Hello, {{name}}!",
      sampleData: {},
    });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty(
      "message",
      "Value for placeholder 'name' is missing or invalid."
    );
  });
});
