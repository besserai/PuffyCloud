import Airtable, { base } from 'airtable';
import { useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';
import './AirtableAccess.css';


/// This token should be set as an environment variable!
const PUFFYCLOUD_AIRTABLE_ACCESS_TOKEN = "pat87sDjO2n3mzB1d.4ff2771a9085ecc0aaed6812bead7974b51e953831094c8d7ebfcb653a576cf4"

class AirtableAccess {
    constructor(apiKey, baseId) {
        this.base = new Airtable({ apiKey }).base(baseId);
    }

    async getAllCountries() {
        const countriesTableId = "tblGwnRZsuKp1Wevv"
        const table = this.base(countriesTableId);
        const records = await table.select().all();
        return records.map((record) => record.fields);
    }

    async getAllLandmasses() {
        const landmassesTableName = "Landmasses"
        const table = this.base(landmassesTableName);
        const records = await table.select().all();
        return records.map((record) => record.fields);
    }

    async getRecordById(id) {
        const record = await this.table.find(id);
        return record.fields;
    }

    // async createRecord(fields) {
    //     const record = await this.table.create(fields);
    //     return record.fields;
    // }

    // async updateRecord(id, fields) {
    //     const record = await this.table.update(id, fields);
    //     return record.fields;
    // }

    // async deleteRecord(id) {
    //     await this.table.destroy(id);
    // }
}


export default function AirtableElememt() {

    const [countries, setCountries] = useState([]);

    const baseId = "apppzVl7CSnEhSVLe"
    const base = new AirtableAccess(PUFFYCLOUD_AIRTABLE_ACCESS_TOKEN, baseId);


    useEffect(() => {
        async function fetchCountries() {
            const records = await base.getAllCountries();

            const countriesToUse = ["Switzerland", "Guatemala", "Austria", "Canary Islands", "Israel"]
            let newCountries = []
            for (let country of records) {
                // console.log(country["Country name"])
                if (countriesToUse.includes(country["Country name"])) {
                    newCountries.push(country)
                    // console.log(country)
                }
                setCountries(newCountries)
            }
        }

        async function fetchLandmasses() {
            const records = await base.getAllLandmasses();
        }

        fetchCountries();
        fetchLandmasses();
    }, []);







    return (
        <div className="country-grid">
            {countries.map((country) => (
                <CountryCard country={country} key={country.id} />
            ))}
        </div>
    );

    // <div key={country["Country name"]}>
    {/* {country["Country name"]} */ }
    // </div>

}
