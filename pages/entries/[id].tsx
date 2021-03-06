import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "../../components/layouts"
import { dbEntries } from '../../database';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunction } from '../../utilities';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}


const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    const router = useRouter()


    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);
    //cambia cuando sus dependencias cambian
    const isNotValid = useMemo(() => inputValue.length === 0 && touched, [inputValue, touched]);


    const onInputValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    }
    const onSave = () => {
        if (inputValue.length === 0) return;
        const updatedEntry: Entry = {
            ...entry,
            description: inputValue,
            status
        }
        updateEntry(updatedEntry, true)
        router.push('/')
    }
    const onDelete = () => {
        const entryToDelete: Entry = {
            ...entry,
            _id: entry._id
        }
        deleteEntry(entryToDelete, true)
        router.push('/')
    }


    return (
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada ${dateFunction.getFormatDistanceToNow(entry.createAt)} minutos`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
                                onBlur={() => setTouched(true)}     //lose focus
                                // onFocus={() => setTouched(true)}
                                value={inputValue}
                                onChange={onInputValueChanged}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row={true}
                                    value={status}
                                    onChange={onStatusChanged}
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
                                onClick={onSave}
                                disabled={!inputValue}
                            >
                                save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                onClick={onDelete}
                sx={{
                    position: 'fixed',
                    bottom: 30, right: 30,
                    backgroundColor: 'error.dark'
                }}>
                <DeleteIcon />
            </IconButton>
        </Layout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string }//obtiene id page serverside

    const entry = await dbEntries.getEntryById(id)

    //NOTE: verifica si el entry.id no es valido para no renderizar una pagina con id invalido
    //no retorna el entry de la pagina, retorna redirect
    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage