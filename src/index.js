("use strict");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register: ({ strapi }) => {
    const { transformArgs, getContentTypeArgs } = strapi
      .plugin("graphql")
      .service("builders").utils;
    const extensionService = strapi.plugin("graphql").service("extension");

    const extension = ({ nexus }) => ({
      // Nexus
      types: [
        nexus.extendType({
          type: "Query",
          definition(t) {
            t.field("getEventsByUserId", {
              type: "EventEntityResponseCollection",
              args: { userId: nexus.intArg() },
              async resolve(parent, args, ctx) {
                const datas = await strapi
                  .controller("api::flow-events.flow-events")
                  .getEventsByUserId({
                    request: { body: { userId: args.userId } },
                  });

                const transformedArgs = transformArgs(args, {
                  contentType: strapi.contentTypes["api::event.events"],
                  usePagination: false,
                });
                const { toEntityResponseCollection } = strapi
                  .plugin("graphql")
                  .service("format").returnTypes;
                return toEntityResponseCollection(datas, {
                  args: transformedArgs,
                  resourceUID: "api::event.event",
                });
              },
            });
          },
        }),
      ],

      resolversConfig: {
        "Query.getEventsByUserId": {
          auth: false,
        },
      },
    });

    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
