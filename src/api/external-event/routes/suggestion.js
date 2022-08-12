module.exports = {
  routes: [
    {
      method: "GET",
      path: "/external-event/suggestions",
      handler: "external-event.getSuggestions",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
