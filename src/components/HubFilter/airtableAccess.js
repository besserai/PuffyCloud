import Airtable, { base } from 'airtable';

/// This token should be set as an environment variable!
const PUFFYCLOUD_AIRTABLE_ACCESS_TOKEN = "pat87sDjO2n3mzB1d.4ff2771a9085ecc0aaed6812bead7974b51e953831094c8d7ebfcb653a576cf4"
const defaultBaseId = "apppzVl7CSnEhSVLe"
const countriesTableId = "tblGwnRZsuKp1Wevv"
const landmassesTableName = "Landmasses"
const hubsTableName = "Flying Hubs"

export const typesOfFlyingOptions = [
    "Acro",
    "Competition",
    "Groundhandling",
    "Hike & Fly",
    "Paragliding",
    "Proximity",
    "SIV",
    "Soaring",
    "Speed Flying",
    "Tandem Paragliding",
    "Volbiv",
    "XC Flying",
    "Paratrike",
    "Hangglider",
    "Paramotor",
]
export const seasonsMapping = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
export const levelsMapping = ["Schooling", "Beginner", "Independent", "Expert"]

export let defaultFilterState = {
    landmasses: { possibleValues: [], selectedValues: [], fieldNameInHub: "Name (from Landmass)" },
    countries: { possibleValues: [], selectedValues: [], fieldNameInHub: "Country name" },
    flyingHubs: { possibleValues: [], selectedValues: [], fieldNameInHub: "Flying Hub name" },
    levels: { possibleValues: levelsMapping, selectedValues: [], fieldNameInHub: "Pilot Level" },
    seasons: { possibleValues: seasonsMapping, selectedValues: [], fieldNameInHub: "Best Season" },
    typesOfFlying: { possibleValues: typesOfFlyingOptions, selectedValues: [], fieldNameInHub: "Flying Category" },
}

export class AirtableAccess {
    constructor(apiKey = PUFFYCLOUD_AIRTABLE_ACCESS_TOKEN, baseId = defaultBaseId) {
        this.base = new Airtable({ apiKey }).base(baseId);
        this.ready = false
        this.init().then(() => this.ready = true);
    }

    async init() {
        this.filterState = defaultFilterState;
        this.AllCountries = await this.getAllCountries();
        this.filterState.countries.possibleValues = this.AllCountries.map(country => country["Country name"])
        this.AllLandmasses = await this.getAllLandmasses();
        this.filterState.landmasses.possibleValues = this.AllLandmasses.map(landmass => landmass["Landmass Name"])
        this.AllHubs = await this.getAllHubs();
        this.filterState.flyingHubs.possibleValues = this.AllHubs.map(hub => hub["Flying Hub name"])
    }

    async getAllCountries() {
        const table = this.base(countriesTableId);
        const records = await table.select().all();
        return records.map((record) => record.fields);
    }

    async getAllLandmasses() {
        const table = this.base(landmassesTableName);
        const records = await table.select().all();
        return records.map((record) => record.fields);
    }

    async getAllHubs() {
        const table = this.base(hubsTableName);
        const records = await table.select().all();
        return records.map((record) => record.fields);
    }

    async getRecordById(id, table) {
        const record = await this.base(table).find(id);
        return record.fields;
    }

    getHubsForFilter(filter) {
        console.log("filter", filter)
        if (filter === undefined) {
            console.warn("cannot apply undefined filter")
            return []
        }
        const filterCondition = (hub, filter) => {
            const result = Object.keys(filter).map((key) => {
                const filterName = filter[key].fieldNameInHub
                const filterFor = filter[key].selectedValues
                const hubProperty = hub[filterName]
                // check if filter is empty, in that case return true
                if (filterFor.length > 0) {
                    // console.log("filter[key].selectedValues", filter[key].selectedValues)
                    // check overlap between filter and hub properties
                    if (hubProperty === undefined) {
                        console.log("hubProperty undefined")
                        return true
                    }
                    if (Array.isArray(hubProperty)) {
                        // hubProperty is an array
                        console.log("hubProperty", hubProperty)
                        console.log("filterFor", filterFor)
                        const overlap = hubProperty.map((value) => { return filterFor.includes(value) })
                        console.log("overlap", overlap.some(element => element === true))
                        return overlap.some(element => element === true);
                    } else {
                        // hubProperty is not an array
                        return filterFor.includes(hubProperty)

                    }
                    // if (!filterFor.includes(hub[filterName][0])) {
                    //     // console.log(filter[key].selectedValues.includes(hub[filter[key].fieldNameInHub][0]))
                    //     // console.log("key not in selectedValues", hub[filter[key].fieldNameInHub])
                    //     return false
                    // }
                }
                return true
            }).every((value) => value === true)
            return result
        }

        // console.log("filterCondition", filterCondition(this.AllHubs[0], filter))
        // filter.landmasses.selectedValues.includes(hub["Name (from Landmass)"][0])
        const hubsForFilter = this.AllHubs.filter((hub) => (filterCondition(hub, filter)));
        return hubsForFilter
    }

    // this shall be used to limit the selectable elements in the filters to the ones that are relevant
    getCountriesForLandmasses(selectedLandmasses) {
        if (this.ready === false) {
            console.log("Airtable Data not ready yet")
            return []
        }

        const selectedLandmassesIds = this.AllLandmasses.filter(landmass => selectedLandmasses.includes(landmass["Landmass Name"])).map(landmass => landmass["Landmass ID"])

        const countryIds = this.AllLandmasses.filter(landmass => selectedLandmasses.includes(landmass["Landmass Name"])).reduce((countries, landmass) => [...countries, ...landmass["Countries"]], [])
        const countryNames = countryIds.map(id => this.getRecordById(id, countriesTableId)["Country name"])
        return countryNames

        this.AllCountries.filter(country => selectedLandmasses.includes())
    }

}

export let PuffyCloudData = new AirtableAccess();
