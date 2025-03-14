import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginStart, loginSuccess, loginFailure, selectError } from './authSlice';

// Define the form input types
interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    try {
      dispatch(loginStart());
      
      // In a real app, this would be an API call
      // For MVP demo, simulate a successful login
      setTimeout(() => {
        // Simulate successful login
        const mockUser = {
          id: '1',
          email: data.email,
          name: 'Demo User',
          role: 'owner' as const,
        };
        
        const mockToken = 'mock-jwt-token';
        
        dispatch(loginSuccess({ user: mockUser, token: mockToken }));
        navigate('/dashboard');
      }, 1000);
      
      // For actual implementation, uncomment this:
      /*
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const { user, token } = await response.json();
      dispatch(loginSuccess({ user, token }));
      navigate('/dashboard');
      */
    } catch (error) {
      dispatch(loginFailure((error as Error).message || 'Login failed'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          FoodChain AI
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          Smart Inventory & Recipe Management
        </Typography>
      </Box>
      
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
            Log In to Your Account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
            
            <Box textAlign="right" mb={2}>
              <Link component="button" variant="body2">
                Forgot password?
              </Link>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
