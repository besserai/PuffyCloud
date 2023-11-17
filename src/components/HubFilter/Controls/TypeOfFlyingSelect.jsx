import * as React from 'react';
import Card from '@mui/material/Card';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const options = [
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


export default function TypeOfFlyingSelect({ setFilterStateWrapper }) {
    const [selectedCategory, setSelectedCategory] = React.useState(() => ["Paragliding"]);

    const handleChange = (_, newselectedCategory) => {
        setSelectedCategory(newselectedCategory);
        console.log(newselectedCategory)
        setFilterStateWrapper({ "typesOfFlying": { selectedValues: newselectedCategory } })
    };

    return (
        <Card sx={{ padding: 10, flexGrow: 1, minWidth: 300, maxWidth: 2000, justifyContent: "space-between" }}>
            <b>
                Select your type of flying:
            </b>
            <ToggleButtonGroup
                sx={{ flexWrap: "wrap", padding: "10px" }}
                value={selectedCategory}
                onChange={handleChange}
                aria-label="text formatting"
                color="primary"


            >
                {options.map((option) => (
                    <ToggleButton key={option} value={option} aria-label={option} sx={{ flexGrow: 1 }} >
                        {option}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Card>

    );
}