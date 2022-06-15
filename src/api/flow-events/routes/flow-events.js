module.exports = {
  routes: [
    {
      method: "POST",
      path: "/flow-events",
      handler: "flow-events.getEventsByUserId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
