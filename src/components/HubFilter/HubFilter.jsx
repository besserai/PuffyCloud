import FilterControlsGrid from "./Controls/FilterControlsGrid";
import { useEffect, useState } from 'react';
import { PuffyCloudData, defaultFilterState } from "./airtableAccess"
import HubResults from "./Display/HubResults"


export default function HubFilter() {
    const [filterState, setFilterState] = useState(defaultFilterState);
    const [puffyCloudDataReady, setPuffyCloudDataReady] = useState(false);

    useEffect(() => {
        PuffyCloudData.init().then(() => {
            setPuffyCloudDataReady(true)
        })
    }, [])

    const setFilterStateWrapper = (newState) => {
        setFilterState((prevState) => {
            // return { ...prevState, ...newState }
            return merge(prevState, newState)
        });
    };

    const merge = (a, b) => [a, b].reduce((r, o) => Object
        .entries(o)
        .reduce((q, [k, v]) => ({
            ...q,
            [k]: v && typeof v === 'object' && !Array.isArray(v) ? merge(q[k] || {}, v) : v
        }), r),
        {})

    return (
        <>
            <FilterControlsGrid filterState={filterState} setFilterStateWrapper={setFilterStateWrapper} />
            {puffyCloudDataReady ?
                <div>
                    {filterState && <HubResults hubsToDisplay={PuffyCloudData.getHubsForFilter(filterState)} />}
                </div>
                :
                <div><img src="loading.gif" alt="loading"></img></div>}
        </>
    );

}
