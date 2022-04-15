import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

import { Entry } from "../../interfaces";
import { UIContext } from '../../context';
import { dateFunction } from '../../utilities';
interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const router = useRouter()

    const onCLick = () => {
        router.push(`/entries/${entry._id}`)
    }

    const { startDragging, endDragging } = useContext(UIContext);


    const onDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text', entry._id)
        startDragging()

        //TODO: modificar el estado para indicar que se hace drag
    }
    const onDragEnd = () => {
        endDragging()
    }

    return (
        //NOTE: las cards se pueden arrastrar
        <Card
            sx={{ marginBottom: 1 }}
            onClick={onCLick}
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
                    <Typography variant='body2'>{dateFunction.getFormatDistanceToNow(entry.createAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};
