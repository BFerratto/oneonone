const { resolve } = require("path");

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5435,
  username: "postgres",
  password: "example",
  database: "one_on_one",
  synchronize: false,
  logging: false,
  entities: [resolve(__dirname, "src/orm/entity/*{.ts,.js}")],
  migrations: [resolve(__dirname, "src/orm/migration/*{.ts,.js}")],
  subscribers: [resolve(__dirname, "src/orm/subscriber/*{.ts,.js}")],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscriberDir: "src/subscriber",
  },
};
