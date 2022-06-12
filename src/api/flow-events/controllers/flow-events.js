const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async flowEvents(ctx) {
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.request.body.userId,
      {
        filters: { id: { $eq: ctx.request.body.userId } },
        sort: { createdAt: "DESC" },
        populate: {
          events: true,
          users_follow: {
            populate: {
              events: true,
            },
          },
        },
      }
    );

    const friendEvents = user.users_follow
      .flatMap((f) => f.events)
      .flatMap((e) => e.id);

    const myEvents = user.events.flatMap((e) => e.id);

    const ids = [...friendEvents, ...myEvents];

    const allEvents = await strapi.entityService.findMany("api::event.event", {
      filters: { id: { $in: ids } },
      populate: {
        users: true,
        images: { fields: ["url"] },
        comments: true,
        categories: true,
        likes: true,
      },
      sort: { eventDate: "DESC" },
    });

    const sanitizedEntries = await this.sanitizeOutput(allEvents, ctx);
    return this.transformResponse(sanitizedEntries);
  },
}));
