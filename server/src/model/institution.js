import DataModel from "./data-model";

class Institution extends DataModel {
    
    async getAll() {      
        const client = await this.getPool().connect();
        let results = {};
        try {
            results = await client.query("SELECT * FROM institutions");
        } catch(err) {
            console.log(err);
        } finally {
            client.release();
            return results;
        }
    }
}

export default Institution;
