const Hapi = require("@hapi/hapi");
const Path = require("path");

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/vision"));
  await server.register(require("@hapi/inert"));

  server.views({
    engines: {
      html: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "templates",
    layoutPath: "templates/layout",
    helpersPath: "templates/helpers",
    context: {
      title: "Hello, Hapi!",
    },
  });

  server.route({
    method: "GET",
    path: "/index",
    handler: {
      view: {
        template: "index",
        context: {
          title: "Hello,",
          message: "World!",
        },
      },
    },
  });

  await server.start();

  console.log("Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start();
