module.exports = {
  routes: [
    {
      method: "POST",
      path: "/flow-events",
      handler: "flow-events.flowEvents",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
