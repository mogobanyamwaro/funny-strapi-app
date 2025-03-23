import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::article.article",
  ({ strapi }) => ({
    async find(params = {}) {
      console.log("douglas mogoba is herer", strapi);

      const results = await super.find(params);
      return results;
    },

    async findOne(entityId: string, params = {}) {
      // entityId is now string
      const result = await super.findOne(entityId, params);
      return result;
    },

    async create(data: { data: any }, params = {}) {
      const result = await super.create(data, params);
      return result;
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
