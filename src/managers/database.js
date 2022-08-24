import knex from 'knex';

export class DBController {
  constructor ({ connectionString }) {
    this.connection = connectionString;
  }

  getConfig () {
    const { connection } = this;

    return knex({
      client: 'pg',
      connection,
      searchPath: [ 'knex', 'public' ],
    });
  }
}