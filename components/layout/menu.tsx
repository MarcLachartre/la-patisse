import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import menu from '../../styles/components/Menu.module.scss';

const Menu = () => {
    const { data: session, status } = useSession();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const links: [string, string, ReactElement | string][] = [
        ['Accueil', '/', <HomeRoundedIcon color="secondary" />],
        ['Recettes', '/recettes', <CakeRoundedIcon color="secondary" />],
        [
            'Contact me',
            'mailto:marc.lachartre@gmail.com',
            <EmailRoundedIcon color="secondary" />,
        ],
        [
            session ? 'Créer recette' : '',
            session ? '/recettes/create' : '',
            session ? <AddCircleRoundedIcon color="secondary" /> : '',
        ],
    ];

    const DrawerList = (
        <Box sx={{ width: 280 }} onClick={toggleDrawer(false)}>
            <ListItem
                className={menu.menuTitleContainer}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <h4> Menu </h4>
                <CloseRoundedIcon
                    cursor="pointer"
                    color="error"
                    className={menu.close}
                />
            </ListItem>
            <List>
                {links.map((link) => {
                    return (
                        <ListItem
                            key={link[0]}
                            disablePadding
                            sx={{ paddingLeft: '0px' }}
                        >
                            <Link
                                key={link[0]}
                                href={link[1]}
                                scroll={true}
                                className={menu.menuLink}
                            >
                                <ListItemButton sx={{ width: '100%' }}>
                                    <ListItemIcon>{link[2]}</ListItemIcon>
                                    {link[0]}
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <div>
            <div className={menu.menuContainer}>
                <div className={menu.menuIconContainer}>
                    <div
                        className={menu.menuIcon}
                        onClick={toggleDrawer(true)}
                    ></div>
                </div>
            </div>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor={'right'}
                sx={{ zIndex: '4' }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default Menu;
