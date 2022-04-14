import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "../../components/layouts"
import { EntryStatus } from '../../interfaces';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']


const EntryPage = () => {
    return (
        <Layout title='......'>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title='Entrada:'
                            subheader={`Creada hace: ... minutos`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                autoFocus
                                multiline
                                label="Nueva entrada"
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row={true}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                control={<Radio />}
                                                key={option}
                                                label={capitalize(option)}
                                                value={option}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant="contained"
                                fullWidth
                            >
                                save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30, right: 30,
                backgroundColor: 'error.dark'
            }}>
                <DeleteIcon />
            </IconButton>
        </Layout>
    )
}


export default EntryPage