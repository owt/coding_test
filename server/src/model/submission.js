import DataModel from "./data-model";

class Submission extends DataModel {
    
    async getAll() {
        const client = await this.getPool().connect();
        let results = {};
        try {
            results = await client.query("SELECT * FROM submissions");
        } catch(err) {
            console.log(err);
        } finally {
            client.release();
            return results;
        }
    }

    async getByInstitution(institutionId) {
        const client = await this.getPool().connect();
        let results = {};
        try {
            results = await client.query("SELECT * FROM submissions WHERE institution_id=$1", [ institutionId ]);
        } catch(err) {
            console.log(err);
        } finally {
            client.release();
            return results;
        }
    }
}

export default Submission;