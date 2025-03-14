import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

// Mock data for MVP
const mockRecipes = [
  {
    id: '1',
    name: 'Chicken Alfredo',
    description: 'Creamy pasta with grilled chicken',
    servingSize: 4,
    ingredients: [],
    instructions: 'Cook pasta according to package instructions...',
    categoryId: 'pasta',
    preparationTime: 30,
    costPerServing: 3.75,
    lastUsed: '2025-03-13T10:30:00Z',
    imageUrl: 'https://via.placeholder.com/300x200?text=Chicken+Alfredo',
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with tomato, mozzarella, and basil',
    servingSize: 2,
    ingredients: [],
    instructions: 'Preheat oven to 450°F...',
    categoryId: 'pizza',
    preparationTime: 45,
    costPerServing: 2.50,
    lastUsed: '2025-03-12T18:15:00Z',
    imageUrl: 'https://via.placeholder.com/300x200?text=Margherita+Pizza',
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with frosting',
    servingSize: 8,
    ingredients: [],
    instructions: 'Mix all dry ingredients in a bowl...',
    categoryId: 'dessert',
    preparationTime: 60,
    costPerServing: 1.85,
    lastUsed: '2025-03-14T09:45:00Z',
    imageUrl: 'https://via.placeholder.com/300x200?text=Chocolate+Cake',
  },
  {
    id: '4',
    name: 'Garden Salad',
    description: 'Fresh salad with mixed greens and vegetables',
    servingSize: 4,
    ingredients: [],
    instructions: 'Wash and chop all vegetables...',
    categoryId: 'salad',
    preparationTime: 15,
    costPerServing: 1.25,
    lastUsed: '2025-03-11T12:30:00Z',
    imageUrl: 'https://via.placeholder.com/300x200?text=Garden+Salad',
  },
];

const RecipeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState(mockRecipes);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecipe = () => {
    navigate('/recipes/new');
  };

  const handleEditRecipe = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  const handleDeleteRecipe = (id: string) => {
    // In a real app, this would make an API call
    // For MVP, just filter the recipe out
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recipe Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddRecipe}
        >
          Add Recipe
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredRecipes.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" align="center" sx={{ py: 4 }}>
                  No recipes found
                </Typography>
              </Grid>
            ) : (
              filteredRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {recipe.imageUrl ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={recipe.imageUrl}
                        alt={recipe.name}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 140,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'grey.200',
                        }}
                      >
                        <RestaurantIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {recipe.name}
                        </Typography>
                        <Chip
                          label={`$${recipe.costPerServing.toFixed(2)}/serving`}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {recipe.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                          label={`${recipe.preparationTime} min`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={`${recipe.servingSize} servings`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditRecipe(recipe.id)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default RecipeList;
