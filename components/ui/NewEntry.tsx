import { Box, Button, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/SaveAsOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
    return (
        <Box sx={{ marginBottom: 2, padding: 1 }}>
            <Button
                fullWidth
                variant='outlined'
                startIcon={<AddIcon />}
            >
                Agregar Tarea
            </Button>


            <TextField
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                helperText='ingrese valor'
            />

            <Box display={'flex'} justifyContent={'space-between'} margin={.5}>
                <Button variant="text">
                    Cancelar
                </Button>

                <Button
                    color="secondary"
                    endIcon={<SaveIcon />}
                    variant="outlined"
                >
                    Guardar
                </Button>
            </Box>
        </Box>
    )
};
