import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::thought.thought",
  ({ strapi }) => ({
    async find(params = {}) {
      console.log("params", params);
      const { results, pagination } = await super.find(params);
      // @ts-ignore
      if (params?.random) {
        const randomIndex = Math.floor(Math.random() * results.length);
        return { results: [results[randomIndex]], pagination };
      }

      return { results, pagination };
    },

    async findOne(entityId: string, params = {}) {
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
