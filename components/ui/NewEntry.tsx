import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material";

import SaveIcon from '@mui/icons-material/SaveAsOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';


export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);

    const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFielChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onSave = () => {
        if (inputValue.length === 0) return
        setIsAdding(false)
        setTouched(false)
        setInputValue('')
        addNewEntry(inputValue)
    }
    const undo = () => {
        setIsAdding(false)
        setTouched(false)
    }


    return (
        <Box sx={{ marginBottom: 2, padding: 1 }}>

            {
                (isAdding)
                    ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                helperText={inputValue.length === 0 && touched && 'ingrese valor'}
                                error={inputValue.length === 0 && touched}
                                value={inputValue}
                                onChange={onTextFielChanged}
                                onBlur={() => setTouched(true)}     //pierde focus
                            />

                            <Box display={'flex'} justifyContent={'space-between'} margin={.5}>
                                <Button onClick={undo} variant="text">
                                    Cancelar
                                </Button>

                                <Button
                                    disabled={!inputValue}
                                    onClick={onSave}
                                    color="secondary"
                                    endIcon={<SaveIcon />}
                                    variant="outlined"
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    : (
                        <Button
                            fullWidth
                            variant='outlined'
                            startIcon={<AddIcon />}
                            onClick={() => setIsAdding(true)}
                        >
                            Agregar Tarea
                        </Button>
                    )
            }



        </Box>
    )
};
