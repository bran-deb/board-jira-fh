import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const darkTheme = createTheme({
    palette: {  //colors palette
        mode: 'dark',
        secondary: {
            main: '#19874b'
        },
        error: {
            main: red.A400
        }
    },
    components: {   //styles components
        MuiAppBar: {    //Appbar
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c',
                }
            }
        }
    }
})