import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  AttachMoney as MoneyIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

// Mock data for the MVP demo
const mockStats = {
  totalInventoryItems: 87,
  lowStockItems: 12,
  totalRecipes: 34,
  estimatedFoodCost: '28.5%',
};

const mockLowStockItems = [
  { id: '1', name: 'Tomatoes', quantity: 2, unit: 'kg', threshold: 5 },
  { id: '2', name: 'Chicken Breast', quantity: 1.5, unit: 'kg', threshold: 3 },
  { id: '3', name: 'Olive Oil', quantity: 0.5, unit: 'liter', threshold: 1 },
];

const mockPopularRecipes = [
  { id: '1', name: 'Chicken Alfredo', lastUsed: '2 days ago' },
  { id: '2', name: 'Margherita Pizza', lastUsed: '1 day ago' },
  { id: '3', name: 'Chocolate Cake', lastUsed: 'Today' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [lowStockItems, setLowStockItems] = useState(mockLowStockItems);
  const [popularRecipes, setPopularRecipes] = useState(mockPopularRecipes);

  useEffect(() => {
    // Simulate API call to get dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // For MVP demo, simulate loading data
        setTimeout(() => {
          setStats(mockStats);
          setLowStockItems(mockLowStockItems);
          setPopularRecipes(mockPopularRecipes);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with actions */}
      <Box 
        sx={{ 
          mb: { xs: 3, sm: 4 }, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            color: 'text.primary',
            mb: { xs: 1, sm: 0 }
          }}
        >
          Dashboard
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={{ xs: 1, sm: 2 }}
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<InventoryIcon />}
            onClick={() => navigate('/inventory')}
            fullWidth={isXs}
            sx={{ 
              borderRadius: 2,
              py: { xs: 1, sm: 1 },
              px: { xs: 2, sm: 3 },
            }}
          >
            Manage Inventory
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<RestaurantIcon />}
            onClick={() => navigate('/recipes')}
            fullWidth={isXs}
            sx={{ 
              borderRadius: 2,
              py: { xs: 1, sm: 1 },
              px: { xs: 2, sm: 3 },
            }}
          >
            View Recipes
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InventoryIcon color="primary" sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' } }}>
                  Total Inventory
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ 
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 0.5
              }}>
                {stats.totalInventoryItems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                items in stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            bgcolor: 'rgba(255, 143, 0, 0.08)',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(255, 143, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(255, 143, 0, 0.12)',
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon color="warning" sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' } }}>
                  Low Stock
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ 
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 0.5,
                color: 'rgba(255, 143, 0, 0.8)'
              }}>
                {stats.lowStockItems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                items below threshold
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RestaurantIcon color="primary" sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' } }}>
                  Total Recipes
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ 
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 0.5
              }}>
                {stats.totalRecipes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                standardized recipes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(56, 142, 60, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(56, 142, 60, 0.12)',
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MoneyIcon color="success" sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' } }}>
                  Food Cost
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ 
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 0.5,
                color: 'rgba(56, 142, 60, 0.8)'
              }}>
                {stats.estimatedFoodCost}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                estimated average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock and Popular Recipes */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Low Stock Items */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: { xs: 2, sm: 3 }, 
            height: '100%', 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
              }}>
                Low Stock Items
              </Typography>
              
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={() => navigate('/inventory')}
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center'
                }}
              >
                View All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {lowStockItems.length === 0 ? (
              <Typography variant="body1">No items are currently low in stock.</Typography>
            ) : (
              <List disablePadding sx={{ mx: -2 }}>
                {lowStockItems.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`/inventory/${item.id}`)}
                        sx={{ 
                          borderRadius: 1.5,
                          minWidth: { xs: '70px', sm: '80px' }
                        }}
                      >
                        Update
                      </Button>
                    }
                    sx={{ 
                      px: { xs: 2, sm: 2 },
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.95rem', sm: '1rem' } 
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="error"
                            sx={{ fontWeight: 500 }}
                          >
                            {`${item.quantity} ${item.unit}`}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {` (Threshold: ${item.threshold} ${item.unit})`}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
            
            <Box sx={{ mt: 2, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                fullWidth
                onClick={() => navigate('/inventory')}
                size="large"
                sx={{ borderRadius: 2, py: 1 }}
              >
                View All Inventory
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Popular Recipes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: { xs: 2, sm: 3 }, 
            height: '100%', 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
              }}>
                Popular Recipes
              </Typography>
              
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={() => navigate('/recipes')}
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center'
                }}
              >
                View All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {popularRecipes.length === 0 ? (
              <Typography variant="body1">No recipes have been used yet.</Typography>
            ) : (
              <List disablePadding sx={{ mx: -2 }}>
                {popularRecipes.map((recipe) => (
                  <ListItem
                    key={recipe.id}
                    secondaryAction={
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                        sx={{ 
                          borderRadius: 1.5,
                          minWidth: { xs: '70px', sm: '80px' }
                        }}
                      >
                        View
                      </Button>
                    }
                    sx={{ 
                      px: { xs: 2, sm: 2 },
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.95rem', sm: '1rem' } 
                          }}
                        >
                          {recipe.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {`Last used: ${recipe.lastUsed}`}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
            
            <Box sx={{ mt: 2, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                fullWidth
                onClick={() => navigate('/recipes')}
                size="large"
                sx={{ borderRadius: 2, py: 1 }}
              >
                View All Recipes
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
