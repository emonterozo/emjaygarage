'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

const pages = ['Home', 'Dashboard'];

const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

const ResponsiveAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handlePressItem = (page: string) => {
    router.push(
      page === 'Home'
        ? `/admin/${NEXT_PUBLIC_ADMIN_KEY}`
        : `/admin/dashboard/${NEXT_PUBLIC_ADMIN_KEY}`,
    );
  };

  const list = (
    <Box sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ flexGrow: 1, p: 3 }}>
        Emjay Garage
      </Typography>
      <List>
        {pages.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handlePressItem(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ backgroundColor: '#1E1E1E', borderBottom: `0.1px solid #fff` }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Emjay Garage
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => (
              <Button key={page} color="inherit" onClick={() => handlePressItem(page)}>
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </Box>
  );
};

export default ResponsiveAppBar;
