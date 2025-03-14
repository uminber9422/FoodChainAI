import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define inventory item interface
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  categoryId: string;
  supplierId: string | null;
  costPerUnit: number;
  threshold: number;
  lastUpdated: string;
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryItems: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
    },
    addInventoryItem: (state, action: PayloadAction<InventoryItem>) => {
      state.items.push(action.payload);
    },
    updateInventoryItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeInventoryItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  removeInventoryItem,
  setLoading,
  setError,
} = inventorySlice.actions;

// Selectors
export const selectInventoryItems = (state: RootState) => state.inventory.items;
export const selectInventoryLoading = (state: RootState) => state.inventory.loading;
export const selectInventoryError = (state: RootState) => state.inventory.error;
export const selectLowStockItems = (state: RootState) => 
  state.inventory.items.filter(item => item.quantity <= item.threshold);

export default inventorySlice.reducer;
