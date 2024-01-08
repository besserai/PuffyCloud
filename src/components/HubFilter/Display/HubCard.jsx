import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const HubCard = ({ hub }) => {

    const name = hub["Flying Base name"];

    const [photoHeader, setPhotoHeader] = useState("https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg")

    useEffect(() => {

        if (hub["Photo Header"]) {
            setPhotoHeader(hub["Photo Header"][0].url)
            console.log("hub photo for: ", name, hub["Photo Header"][0].url)
        }
    }
        , [])

    return (
        <Card style={{
            margin: "10px",
            flexGrow: 1,
            maxWidth: 350,
            key: name,
            backgroundColor: "rgba(255, 0, 255, 0.1)",
        }}>
            <CardMedia
                component="img"
                height="140"
                image={photoHeader}
                alt={`${name} flag`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {hub["Countries original"]}
                </Typography>
            </CardContent>
        </Card >
    );
};

export default HubCard;
