import { Pool, Client } from 'pg';

class DataModel {

    getPool() {
        return new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
    }
}

export default DataModel;