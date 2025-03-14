import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';

// Layout
import MainLayout from './components/templates/MainLayout';

// Auth components
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProtectedRoute from './features/auth/ProtectedRoute';

// Lazy loaded components
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const InventoryList = lazy(() => import('./features/inventory/InventoryList'));
const InventoryDetail = lazy(() => import('./features/inventory/InventoryDetail'));
const RecipeList = lazy(() => import('./features/recipes/RecipeList'));
const RecipeDetail = lazy(() => import('./features/recipes/RecipeDetail'));

// Loading component for suspense fallback
const LoadingPage = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<InventoryList />} />
            <Route path="inventory/:id" element={<InventoryDetail />} />
            <Route path="recipes" element={<RecipeList />} />
            <Route path="recipes/:id" element={<RecipeDetail />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
