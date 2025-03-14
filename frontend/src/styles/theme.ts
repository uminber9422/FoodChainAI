import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Primary Green - representing food freshness, sustainability
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1565C0', // Secondary Blue - representing technology, reliability
      light: '#1E88E5',
      dark: '#0D47A1',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#FF8F00', // Accent Orange - representing energy, appetite
      light: '#FFA726',
      dark: '#EF6C00',
    },
    info: {
      main: '#0277BD',
      light: '#03A9F4',
      dark: '#01579B',
    },
    success: {
      main: '#388E3C',
      light: '#4CAF50',
      dark: '#2E7D32',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
      disabled: '#90A4AE',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: [
      'Inter',
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
        head: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
