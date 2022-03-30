import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
    return (
        <Drawer
            anchor="left"
            open={true}
            onClose={() => {
                console.log('cerrando');
            }}
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menu</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem key={text} button>
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon /> : <MailOutlineIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem key={text} button>
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon /> : <MailOutlineIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
};
