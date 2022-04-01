import { FC, useContext, useMemo } from "react";

import { List, Paper } from "@mui/material";

import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { EntryCard } from "./";


interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);

    // const entriesByStatus = entries.filter(entry => entry.status === status)
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])//status no cambia



    return (
        //TODO: aqui hacemos drop
        <div>
            <Paper sx={{
                height: 'calc(100vh - 180px)',
                overflow: 'auto',
                backgroundColor: 'transparent',
                padding: '.5px 5px'
            }}>
                {/* cambia si se hace drag */}
                <List sx={{ opacity: 1 }}>
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
