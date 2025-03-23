/**
 * dadi-joke service
 */

import { factories } from "@strapi/strapi";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
export default factories.createCoreService(
  "api::dadi-joke.dadi-joke",
  ({ strapi }) => ({
    async find(params = {}) {
      const { results, pagination } = await super.find(params);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const text = "old age";
      const result = await model.generateContent(
        `Tell me a dad joke about: ${text}`
      );
      const joke = result.response.text();
      console.log(joke);

      return { results, pagination };
    },

    async findOne(entityId: string, params = {}) {
      // entityId is now string
      const result = await super.findOne(entityId, params);
      return result;
    },

    async create(data: { data: any }, params = {}) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(
        `Tell me a dad joke about: ${data.data.text}`
      );
      const joke = result.response.text();
      data.data.text = joke;
      const res = await super.create(data, params);
      return res;
    },

    async update(entityId: string, data: { data: any }, params = {}) {
      // entityId is now string
      const result = await super.update(entityId, data, params);
      return result;
    },

    async delete(entityId: string, params = {}) {
      // entityId is now string
      const result = await super.delete(entityId, params);
      return result;
    },
  })
);
