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
          owner_events: true,
          users_follow: {
            populate: {
              owner_events: true,
            },
          },
        },
      });

    const friendsEvents = user1.users_follow.flatMap((f) => f.owner_events);
    const friendsAttendeesEvents = user1.users_follow.flatMap((f) => f.events);
    const events = [
      ...user1.events,
      ...user1.owner_events,
      ...friendsEvents,
      ...friendsAttendeesEvents,
    ];

    // return events;
    const shortedEvents = events
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((e) => e);

    console.log(shortedEvents);

    const filteredEvents = shortedEvents.filter(
      (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
    );

    return filteredEvents;

    // const sanitizedEntries = await this.sanitizeOutput(allEvents, ctx);
    // return this.transformResponse(sanitizedEntries);
  },
}));
