import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
  Divider,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Mock data for MVP
const mockRecipe = {
  id: '1',
  name: 'Chicken Alfredo',
  description: 'Creamy pasta with grilled chicken',
  servingSize: 4,
  ingredients: [
    { id: '1', inventoryItemId: '2', name: 'Chicken Breast', quantity: 2, unit: 'kg', cost: 17.5 },
    { id: '2', inventoryItemId: '5', name: 'Flour', quantity: 0.25, unit: 'kg', cost: 0.22 },
    { id: '3', inventoryItemId: '3', name: 'Olive Oil', quantity: 0.1, unit: 'liter', cost: 1.30 },
  ],
  instructions: 'Cook pasta according to package instructions. In a large skillet, heat olive oil over medium heat. Add chicken and cook until golden brown, about 5-7 minutes per side. Remove chicken from skillet and set aside.\n\nIn the same skillet, melt butter. Add garlic and cook for 30 seconds. Whisk in flour and cook for 1 minute. Gradually whisk in milk and cream, and bring to a simmer. Stir in Parmesan cheese until melted and smooth. Season with salt and pepper.\n\nSlice chicken and return to the skillet. Add cooked pasta and toss until well coated. Garnish with parsley if desired.',
  categoryId: 'pasta',
  preparationTime: 30,
  costPerServing: 3.75,
  lastUsed: '2025-03-13T10:30:00Z',
  imageUrl: 'https://via.placeholder.com/300x200?text=Chicken+Alfredo',
};

const mockCategories = [
  { id: 'pasta', name: 'Pasta' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'dessert', name: 'Dessert' },
  { id: 'salad', name: 'Salad' },
  { id: 'soup', name: 'Soup' },
  { id: 'main', name: 'Main Course' },
];

const mockInventoryItems = [
  { id: '1', name: 'Tomatoes', unit: 'kg', costPerUnit: 2.5 },
  { id: '2', name: 'Chicken Breast', unit: 'kg', costPerUnit: 8.75 },
  { id: '3', name: 'Olive Oil', unit: 'liter', costPerUnit: 12.99 },
  { id: '4', name: 'Rice', unit: 'kg', costPerUnit: 1.49 },
  { id: '5', name: 'Flour', unit: 'kg', costPerUnit: 0.89 },
];

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isNewRecipe = id === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    servingSize: 4,
    categoryId: '',
    preparationTime: 30,
    instructions: '',
    ingredients: [] as any[],
  });

  const [newIngredient, setNewIngredient] = useState({
    inventoryItemId: '',
    quantity: 0,
  });

  useEffect(() => {
    if (isNewRecipe) {
      setLoading(false);
      return;
    }

    // Simulate API call to fetch recipe details
    setTimeout(() => {
      setFormData({
        name: mockRecipe.name,
        description: mockRecipe.description,
        servingSize: mockRecipe.servingSize,
        categoryId: mockRecipe.categoryId,
        preparationTime: mockRecipe.preparationTime,
        instructions: mockRecipe.instructions,
        ingredients: mockRecipe.ingredients,
      });
      setLoading(false);
    }, 1000);
  }, [id, isNewRecipe]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'servingSize' || name === 'preparationTime'
        ? parseInt(value, 10) || 0
        : value,
    }));
  };

  const handleNewIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIngredient(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddIngredient = () => {
    if (!newIngredient.inventoryItemId || newIngredient.quantity <= 0) {
      return;
    }

    const item = mockInventoryItems.find(i => i.id === newIngredient.inventoryItemId);
    if (!item) return;

    const newItem = {
      id: Date.now().toString(),
      inventoryItemId: newIngredient.inventoryItemId,
      name: item.name,
      quantity: newIngredient.quantity,
      unit: item.unit,
      cost: newIngredient.quantity * item.costPerUnit,
    };

    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newItem],
    }));

    setNewIngredient({
      inventoryItemId: '',
      quantity: 0,
    });
  };

  const handleRemoveIngredient = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i.id !== id),
    }));
  };

  const calculateCostPerServing = () => {
    const totalCost = formData.ingredients.reduce((sum, ing) => sum + ing.cost, 0);
    return formData.servingSize > 0 ? totalCost / formData.servingSize : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Simulate API call to save recipe
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        // Navigate back to recipe list
        if (isNewRecipe) {
          navigate('/recipes');
        }
      }, 3000);
    }, 1500);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/recipes')}
          sx={{ mr: 2 }}
        >
          Back to Recipes
        </Button>
        <Typography variant="h4" component="h1">
          {isNewRecipe ? 'Create New Recipe' : 'Edit Recipe'}
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {isNewRecipe ? 'Recipe created successfully!' : 'Recipe updated successfully!'}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Recipe Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Recipe Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              >
                {mockCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Serving Size"
                name="servingSize"
                type="number"
                value={formData.servingSize}
                onChange={handleInputChange}
                required
                inputProps={{ min: 1, step: 1 }}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Preparation Time (min)"
                name="preparationTime"
                type="number"
                value={formData.preparationTime}
                onChange={handleInputChange}
                required
                inputProps={{ min: 1, step: 1 }}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cost Per Serving
                </Typography>
                <Typography variant="h6" color="primary">
                  ${calculateCostPerServing().toFixed(2)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Ingredients
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <List>
                {formData.ingredients.length === 0 ? (
                  <ListItem>
                    <ListItemText 
                      primary="No ingredients added" 
                      secondary="Add ingredients using the form below" 
                    />
                  </ListItem>
                ) : (
                  formData.ingredients.map((ingredient) => (
                    <ListItem key={ingredient.id} divider>
                      <ListItemText
                        primary={ingredient.name}
                        secondary={`${ingredient.quantity} ${ingredient.unit} - $${ingredient.cost.toFixed(2)}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveIngredient(ingredient.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                )}
              </List>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={5}>
                    <TextField
                      select
                      fullWidth
                      label="Add Ingredient"
                      name="inventoryItemId"
                      value={newIngredient.inventoryItemId}
                      onChange={handleNewIngredientChange}
                    >
                      {mockInventoryItems.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name} (${item.costPerUnit}/${item.unit})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={8} md={5}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="quantity"
                      type="number"
                      value={newIngredient.quantity || ''}
                      onChange={handleNewIngredientChange}
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddIngredient}
                      startIcon={<AddIcon />}
                      disabled={!newIngredient.inventoryItemId || newIngredient.quantity <= 0}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Instructions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField
                fullWidth
                label="Preparation Instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                multiline
                rows={6}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/recipes')}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : isNewRecipe ? 'Create Recipe' : 'Update Recipe'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RecipeDetail;
