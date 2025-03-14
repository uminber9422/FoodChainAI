import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define recipe-related interfaces
export interface RecipeIngredient {
  id: string;
  inventoryItemId: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  servingSize: number;
  ingredients: RecipeIngredient[];
  instructions: string;
  categoryId: string;
  preparationTime: number;
  costPerServing: number;
  lastUsed: string | null;
  imageUrl?: string;
}

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
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
  setRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
  setLoading,
  setError,
} = recipesSlice.actions;

// Selectors
export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectRecipesLoading = (state: RootState) => state.recipes.loading;
export const selectRecipesError = (state: RootState) => state.recipes.error;
export const selectRecipeById = (id: string) => (state: RootState) => 
  state.recipes.recipes.find(recipe => recipe.id === id);

export default recipesSlice.reducer;
