import { List, Paper } from "@mui/material";
import { EntryCard } from "./";

export const EntryList = () => {
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
                    <EntryCard />
                    <EntryCard />
                    <EntryCard />
                    <EntryCard />
                </List>
            </Paper>
        </div>
    )
};
