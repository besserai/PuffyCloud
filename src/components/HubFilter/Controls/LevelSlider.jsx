import Slider from '@mui/material/Slider';
import "./LevelSlider.css"
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

export default function LevelSlider({ setFilterStateWrapper }) {
    const [selectedLevel, setSelectedLevel] = useState(1);

    const values = [0, 1, 2, 3]
    const labels = ["Schooling", "Beginner", "Independent", "Expert"]

    const marks = values.map((value, index) => { return { value: value, label: labels[index] } })

    const convertLevelToLabels = (selectedLevel) => {
        let selectedLabels = Array.from({ length: selectedLevel + 1 }, (_, i) => i)
        selectedLabels = selectedLabels.map((level) => { return labels[level] })
        return selectedLabels
    }

    const handleChange = (_, newVal) => {
        setFilterStateWrapper({ ["levels"]: { selectedValues: convertLevelToLabels(newVal) } })
        setSelectedLevel(newVal)
    }

    return (
        <Card sx={{ padding: 5, flexGrow: 1, minWidth: 250, maxWidth: 1000 }}>
            <b> Level of Flying:</b>
            <Slider
                // style={{
                //     color: "white", mark: {
                //         color: "red"
                //     }
                // }}
                aria-label="Restricted values"
                value={selectedLevel}
                onChange={handleChange}
                min={0}
                max={3}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Card>
    )
}