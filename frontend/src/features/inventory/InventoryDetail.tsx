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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock data for MVP demo
const mockInventoryItem = {
  id: '1',
  name: 'Tomatoes',
  quantity: 10,
  unit: 'kg',
  categoryId: 'vegetables',
  supplierId: 'supplier1',
  costPerUnit: 2.5,
  threshold: 5,
  lastUpdated: '2025-03-10T10:30:00Z',
};

const mockCategories = [
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'meat', name: 'Meat & Poultry' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'grains', name: 'Grains & Pasta' },
  { id: 'oils', name: 'Oils & Condiments' },
  { id: 'baking', name: 'Baking Supplies' },
];

const mockSuppliers = [
  { id: 'supplier1', name: 'Fresh Farms Inc.' },
  { id: 'supplier2', name: 'Quality Meats Co.' },
  { id: 'supplier3', name: 'Gourmet Supplies Ltd.' },
  { id: 'supplier4', name: 'Wholesale Foods' },
];

const mockUnits = ['kg', 'g', 'liter', 'ml', 'piece', 'dozen', 'box', 'case'];

const InventoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isNewItem = id === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    unit: 'kg',
    categoryId: '',
    supplierId: '',
    costPerUnit: 0,
    threshold: 0,
  });

  useEffect(() => {
    if (isNewItem) {
      setLoading(false);
      return;
    }

    // Simulate API call to fetch item details
    setTimeout(() => {
      setFormData({
        name: mockInventoryItem.name,
        quantity: mockInventoryItem.quantity,
        unit: mockInventoryItem.unit,
        categoryId: mockInventoryItem.categoryId,
        supplierId: mockInventoryItem.supplierId || '',
        costPerUnit: mockInventoryItem.costPerUnit,
        threshold: mockInventoryItem.threshold,
      });
      setLoading(false);
    }, 1000);
  }, [id, isNewItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'costPerUnit' || name === 'threshold'
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Simulate API call to save item
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        // Navigate back to inventory list
        if (isNewItem) {
          navigate('/inventory');
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
          onClick={() => navigate('/inventory')}
          sx={{ mr: 2 }}
        >
          Back to Inventory
        </Button>
        <Typography variant="h4" component="h1">
          {isNewItem ? 'Add New Inventory Item' : 'Edit Inventory Item'}
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {isNewItem ? 'Item created successfully!' : 'Item updated successfully!'}
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
                Item Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Item Name"
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

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              >
                {mockUnits.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Cost Per Unit"
                name="costPerUnit"
                type="number"
                value={formData.costPerUnit}
                onChange={handleInputChange}
                required
                InputProps={{ startAdornment: '$' }}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                name="threshold"
                type="number"
                value={formData.threshold}
                onChange={handleInputChange}
                required
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Supplier"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {mockSuppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/inventory')}
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
                  {saving ? 'Saving...' : isNewItem ? 'Create Item' : 'Update Item'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default InventoryDetail;
