module.exports = {
  routes: [
    {
      method: "POST",
      path: "/flow-event",
      handler: "flow-event.getEventsByUserId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
