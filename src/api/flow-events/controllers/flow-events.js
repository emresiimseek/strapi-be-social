const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async getEventsByUserId(ctx) {
    const user1 = await strapi
      .service("plugin::users-permissions.user")
      .fetch(ctx.request.body.userId, {
        filters: { id: { $eq: 1 } },
        sort: { createdAt: "DESC" },
        populate: {
          events: true,
          users_follow: {
            populate: {
              events: true,
            },
          },
        },
      });

    const friendsEvents = user1.users_follow.flatMap((f) => f.events);
    const events = [...user1.events, ...friendsEvents];

    return events;

    // const sanitizedEntries = await this.sanitizeOutput(allEvents, ctx);
    // return this.transformResponse(sanitizedEntries);
  },
}));
