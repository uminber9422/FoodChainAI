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

// Define the form input types
interface RegisterInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>();

  const password = watch('password');

  const onSubmit = async (data: RegisterInputs) => {
    try {
      setError(null);
      
      // In a real app, this would be an API call
      // For MVP demo, simulate a successful registration
      setTimeout(() => {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }, 1000);
      
      // For actual implementation, uncomment this:
      /*
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      navigate('/login');
      */
    } catch (err) {
      setError((err as Error).message || 'Registration failed');
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
            Create Your Account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="name"
              autoFocus
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name should be at least 2 characters',
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="email"
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
              autoComplete="new-password"
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
            
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" variant="body2">
                  Log In
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
