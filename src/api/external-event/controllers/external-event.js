"use strict";

/**
 *  external-event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::external-event.external-event",
  ({ strapi }) => ({
    async getSuggestions(ctx) {
      const externalEvents = await super.find({});
      console.log(externalEvents);
      return externalEvents.data;
    },
  })
);
