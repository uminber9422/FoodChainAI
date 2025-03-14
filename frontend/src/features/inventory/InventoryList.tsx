import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
} from '@mui/icons-material';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectInventoryItems, selectInventoryLoading } from './inventorySlice';

// Mock data for MVP
const mockInventoryItems = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 10,
    unit: 'kg',
    categoryId: 'vegetables',
    supplierId: 'supplier1',
    costPerUnit: 2.5,
    threshold: 5,
    lastUpdated: '2025-03-10T10:30:00Z',
  },
  {
    id: '2',
    name: 'Chicken Breast',
    quantity: 5,
    unit: 'kg',
    categoryId: 'meat',
    supplierId: 'supplier2',
    costPerUnit: 8.75,
    threshold: 3,
    lastUpdated: '2025-03-12T14:20:00Z',
  },
  {
    id: '3',
    name: 'Olive Oil',
    quantity: 2,
    unit: 'liter',
    categoryId: 'oils',
    supplierId: 'supplier3',
    costPerUnit: 12.99,
    threshold: 1,
    lastUpdated: '2025-03-09T09:15:00Z',
  },
  {
    id: '4',
    name: 'Rice',
    quantity: 25,
    unit: 'kg',
    categoryId: 'grains',
    supplierId: 'supplier4',
    costPerUnit: 1.49,
    threshold: 10,
    lastUpdated: '2025-03-11T11:45:00Z',
  },
  {
    id: '5',
    name: 'Flour',
    quantity: 15,
    unit: 'kg',
    categoryId: 'baking',
    supplierId: 'supplier4',
    costPerUnit: 0.89,
    threshold: 8,
    lastUpdated: '2025-03-10T16:30:00Z',
  }
];

const InventoryList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(mockInventoryItems);

  // In a real implementation, we would use this:
  // const loading = useAppSelector(selectInventoryLoading);
  // const items = useAppSelector(selectInventoryItems);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    // Navigate to add item form
    navigate('/inventory/new');
  };

  const handleEditItem = (id: string) => {
    navigate(`/inventory/${id}`);
  };

  const handleDeleteItem = (id: string) => {
    // In a real app, this would make an API call
    // For MVP, just filter the item out
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search inventory items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2">Name</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">Quantity</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">Cost</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">Status</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">Last Updated</Typography></TableCell>
                  <TableCell align="right"><Typography variant="subtitle2">Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" sx={{ py: 2 }}>
                        No inventory items found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{`${item.quantity} ${item.unit}`}</TableCell>
                      <TableCell>{`$${item.costPerUnit.toFixed(2)}/${item.unit}`}</TableCell>
                      <TableCell>
                        {item.quantity <= item.threshold ? (
                          <Chip
                            label="Low Stock"
                            color="warning"
                            size="small"
                          />
                        ) : (
                          <Chip
                            label="In Stock"
                            color="success"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditItem(item.id)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteItem(item.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default InventoryList;
