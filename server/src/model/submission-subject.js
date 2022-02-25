import DataModel from "./data-model";

class SubmissionSubject extends DataModel {
    
    async getAll() {
        const client = await this.getPool().connect();
        let results = {};
        try {
            results = await client.query("SELECT * FROM submission_subjects");
        } catch(err) {
            console.log(err);
        } finally {
            client.release();
            return results;
        }
    }

    async getBySubmission(submissionId) {
        const client = await this.getPool().connect();
        let results = {};
        try {
            results = await client.query("SELECT * FROM submission_subjects WHERE submission_id=$1", [ submissionId ]);
        } catch(err) {
            console.log(err);
        } finally {
            client.release();
            return results;
        }
    }
}

export default SubmissionSubject;