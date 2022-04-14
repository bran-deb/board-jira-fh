import { ChangeEvent, useState, useMemo } from 'react';
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "../../components/layouts"
import { EntryStatus } from '../../interfaces';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']


const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
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
        setTouched(false)
        console.log({ inputValue, status });
    }


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
                            title={`Entrada: ${inputValue}`}
                            subheader={`Creada hace: ... minutos`}
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