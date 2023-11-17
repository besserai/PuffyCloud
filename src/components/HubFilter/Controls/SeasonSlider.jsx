import Slider from '@mui/material/Slider';
import "./LevelSlider.css"
import { Card } from '@mui/material';
import { useState, useEffect } from 'react';

export default function SeasonSlider({ setFilterStateWrapper }) {
    const [selectedRange, setSelectedRange] = useState([1, 12]);

    const marks = [
        {
            value: 1,
            label: 'Jan',
        },
        {
            value: 2,
            label: 'Feb',
        },
        {
            value: 3,
            label: 'Mar',
        },
        {
            value: 4,
            label: 'Apr',
        },
        {
            value: 5,
            label: 'May',
        },
        {
            value: 6,
            label: 'Jun',
        },
        {
            value: 7,
            label: 'Jul',
        },
        {
            value: 8,
            label: 'Aug',
        },
        {
            value: 9,
            label: 'Sept',
        },
        {
            value: 10,
            label: 'Oct',
        },
        {
            value: 11,
            label: 'Nov',
        },
        {
            value: 12,
            label: 'Dec',
        },
    ];

    const convertRangeToLabels = (selectedRange) => {
        let selectedLabels = Array.from({ length: selectedRange[1] - selectedRange[0] + 1 }, (_, i) => i + selectedRange[0] - 1)
        selectedLabels = selectedLabels.map((month) => { return marks[month].label })
        return selectedLabels
    }

    const handleChange = (_, newVal) => {
        setSelectedRange(newVal)
        setFilterStateWrapper({ "seasons": { selectedValues: convertRangeToLabels(newVal) } })
    }

    return (
        <Card sx={{ padding: 5, flexGrow: 1, minWidth: 350, maxWidth: 100 }}>
            <b>
                Season:
            </b>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={selectedRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={1}
                max={12}
                marks={marks}
            // getAriaValueText={valuetext}
            />
        </Card>
    )
}