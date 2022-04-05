import { DragEvent, FC, useContext, useMemo } from "react";

import { List, Paper } from "@mui/material";

import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context';
import { UIContext } from '../../context';
import { EntryCard } from "./";

import styles from './EntryList.module.css'


interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { isDragging } = useContext(UIContext);
    const { entries } = useContext(EntriesContext);

    // const entriesByStatus = entries.filter(entry => entry.status === status)
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])//status no cambia

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }//obtiene el id de el dragStart()
    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text')
    }


    return (
        //NOTE: aqui hacemos drop por que la lista contiene las entradas
        <div
            onDragOver={allowDrop}      //puede arrastrar
            onDrop={onDropEntry}        //espera que suelte un elemento
            className={isDragging ? styles.dragging : undefined} //styles conditional
        >
            <Paper sx={{
                height: 'calc(100vh - 180px)',
                overflow: 'auto',
                backgroundColor: 'transparent',
                padding: '.5px 5px'
            }}>
                {/* cambia si se hace drag */}
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .4s' }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div >
    )
};
