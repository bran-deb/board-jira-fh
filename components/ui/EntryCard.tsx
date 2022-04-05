import { DragEvent, FC } from "react";

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

import { Entry } from "../../interfaces";

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const onDragStart = (e: DragEvent) => {
        console.log(e);
        e.dataTransfer.setData('text', entry._id)

        //TODO: modificar el estado para indicar que se hace drag
    }
    const onDragEnd = () => {
        // TODO: cancelar on drag
    }

    return (
        //NOTE: las cards se pueden arrastrar
        <Card
            sx={{ marginBottom: 1 }}
            //eventos drag
            draggable
            onDragStart={onDragStart}       //desde donde arrastra
            onDragEnd={onDragEnd}           //hasta donde arrastra
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};
