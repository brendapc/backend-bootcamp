import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

let surveyCollection: Collection;

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
  });

  describe("POST /surveys", () => {
    test("Should return 403 if no accessToken is provided", async () => {
      await request(app)
        .post("/api/surveys")
        .send({
          question: "any_question",
          answers: [
            {
              image: "any_image",
              answer: "any_answer",
            },
            {
              answer: "any_answer",
            },
          ],
        })
        .expect(403);
    });
  });
});
