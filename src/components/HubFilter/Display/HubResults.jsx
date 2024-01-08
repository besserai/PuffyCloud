import React, { useEffect, useState } from 'react'
import HubCard from './HubCard'
import './HubResults.css'

export default function HubResults({ hubsToDisplay }) {
    // const [hubs, setHubs] = useState(null)
    // const [filteredHubs, setFilteredHubs] = useState([])

    // const testfilteredHubs = ['Hub1', 'Hub2', 'Hub3'];


    // async function fetchHubs() {
    //     const res = await base.getAllHubs()
    //     setHubs(res)
    //     setFilteredHubs(res)
    // }

    // function filterHubs(filterState) {
    //     let newFilteredHubs = []
    //     for (const hub of hubs) {
    //         if (
    //             filterState.landmasses.selectedValues.length === 0 ||
    //             filterState.landmasses.selectedValues.includes(
    //                 hub["Name (from Landmass)"][0]
    //             )
    //         ) {
    //             newFilteredHubs.push(hub)
    //         }
    //     }
    //     setFilteredHubs(newFilteredHubs)
    // }

    // useEffect(() => {
    //     fetchHubs()
    // }, [])

    // useEffect(() => {
    //     console.log(filterState)
    //     if (hubs === null) {
    //         return
    //     }
    //     filterHubs(filterState)
    //     // console.log(hubs)
    //     console.log("filteredHubs after filtering", filteredHubs)

    // }, [filterState, hubs])


    return (
        <div className='hub-grid'>
            {hubsToDisplay.map((hub, index) => (
                // <div>{hub["Flying Hub name"]}</div>
                <HubCard key={`hubcard-${hub["Flying Base name"]}`} hub={hub} />
            ))}
        </div>
    )
}