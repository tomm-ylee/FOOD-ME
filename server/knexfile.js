// Update with your config settings.

const sharedConfig = {
  client: 'pg',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      database: 'meal_planner_dev'
    }
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'meal_planner_staging'
    }
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'meal_planner_production'
    }
  }

};
