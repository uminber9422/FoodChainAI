import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Restaurant as RecipeIcon,
  Settings as SettingsIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout, selectUser } from '../../features/auth/authSlice';

// Responsive drawer width based on screen size
const getDrawerWidth = (screenWidth: number): number => {
  if (screenWidth < 600) return 240; // xs
  if (screenWidth < 960) return 240; // sm
  if (screenWidth < 1280) return 260; // md
  return 280; // lg and above - slightly wider for better spacing
};

const MainLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  
  const drawerWidth = getDrawerWidth(window.innerWidth);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Auto-close drawer on small screens
  useEffect(() => {
    if (isXs) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isXs]);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Navigation items for the sidebar
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Recipes', icon: <RecipeIcon />, path: '/recipes' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Sidebar content
  const drawer = (
    <Box>
      <Toolbar sx={{ 
        height: { xs: 56, sm: 64 },
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Typography variant="h6" component="div" sx={{ 
          color: 'primary.main',
          fontWeight: 600,
          letterSpacing: 0.5,
        }}>
          FoodChain AI
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ mt: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '0 24px 24px 0',
                  ml: 1,
                  pl: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.2 },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? 'primary.main' : 'text.secondary',
                  minWidth: { xs: 40, md: 48 },
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ 
          height: { xs: 56, sm: 64 },
          px: { xs: 1.5, sm: 2, md: 3 },
        }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: { xs: 1, sm: 2 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              component="div"
              sx={{ 
                mr: 2, 
                display: { xs: 'none', sm: 'block' },
                fontWeight: 500,
              }}
            >
              {user?.name || 'User'}
            </Typography>
            
            <IconButton
              size="small"
              edge="end"
              aria-label="account menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ p: { xs: 0.5, sm: 0.75 } }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                }}
              >
                {user?.name?.[0]?.toUpperCase() || <AccountCircle />}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              TransitionComponent={Fade}
              sx={{ mt: 0.5 }}
            >
              <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth }, 
          flexShrink: { sm: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={isXs && drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 3, sm: 4, md: 5 },
          pb: { xs: 4, sm: 5, md: 6 },
          mt: { xs: '56px', sm: '64px' },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: 'background.default',
          overflow: 'auto',
          maxWidth: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
