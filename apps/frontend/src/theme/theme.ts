import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      hero: {
        gradient: string;
        overlay: string;
      };
      mission: {
        gradient: string;
        pattern: string;
      };
      footer: {
        background: string;
        divider: string;
      };
      social: {
        instagram: string;
        x: string;
        linkedin: string;
        facebook: string;
        whatsapp: string;
        gmail: string;
      };
      success: string;
      shadow: {
        light: string;
        medium: string;
        heavy: string;
        colored: string;
      };
      overlay: {
        light: string;
        medium: string;
        dark: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: {
      hero?: {
        gradient?: string;
        overlay?: string;
      };
      mission?: {
        gradient?: string;
        pattern?: string;
      };
      footer?: {
        background?: string;
        divider?: string;
      };
      social?: {
        instagram?: string;
        x?: string;
        linkedin?: string;
        facebook?: string;
        whatsapp?: string;
        gmail?: string;
      };
      success?: string;
      shadow?: {
        light?: string;
        medium?: string;
        heavy?: string;
        colored?: string;
      };
      overlay?: {
        light?: string;
        medium?: string;
        dark?: string;
      };
    };
  }

  interface Theme {
    custom: {
      spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      borderRadius: {
        small: number;
        medium: number;
        large: number;
        round: string;
      };
      fontSize: {
        hero: {
          xs: string;
          md: string;
          lg: string;
        };
        subtitle: {
          xs: string;
          md: string;
          lg: string;
        };
        section: {
          xs: string;
          md: string;
        };
      };
      fontWeight: {
        light: number;
        normal: number;
        bold: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      spacing?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
      borderRadius?: {
        small?: number;
        medium?: number;
        large?: number;
        round?: string;
      };
      fontSize?: {
        hero?: {
          xs?: string;
          md?: string;
          lg?: string;
        };
        subtitle?: {
          xs?: string;
          md?: string;
          lg?: string;
        };
        section?: {
          xs?: string;
          md?: string;
        };
      };
      fontWeight?: {
        light?: number;
        normal?: number;
        bold?: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066ff',
      dark: '#004bb5',
    },
    secondary: {
      main: '#ff4081',
      dark: '#e91e63',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    custom: {
      hero: {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overlay: 'rgba(0, 0, 0, 0.3)',
      },
      mission: {
        gradient: 'linear-gradient(135deg, #0066ff 0%, #004bb5 100%)',
        pattern:
          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(255,255,255,0.03)" fill-rule="evenodd"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20zm0 0c11.046 0 20 8.954 20 20H20V20z"/%3E%3C/g%3E%3C/svg%3E")',
      },
      footer: {
        background: '#1a1a1a',
        divider: 'rgba(255, 255, 255, 0.1)',
      },
      social: {
        instagram: '#E4405F',
        x: '#000000',
        linkedin: '#0077B5',
        facebook: '#1877F2',
        whatsapp: '#25D366',
        gmail: '#ea4335',
      },
      success: '#4caf50',
      shadow: {
        light: '0 4px 20px rgba(0,0,0,0.1)',
        medium: '0 8px 25px rgba(0,0,0,0.1)',
        heavy: '0 12px 25px rgba(0,0,0,0.15)',
        colored: '0 8px 25px rgba(255, 64, 129, 0.3)',
      },
      overlay: {
        light: 'rgba(255, 255, 255, 0.1)',
        medium: 'rgba(255, 255, 255, 0.6)',
        dark: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  custom: {
    spacing: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 40,
    },
    borderRadius: {
      small: 2,
      medium: 3,
      large: 20,
      round: '50px',
    },
    fontSize: {
      hero: {
        xs: '3rem',
        md: '4.5rem',
        lg: '5.5rem',
      },
      subtitle: {
        xs: '1.2rem',
        md: '1.8rem',
        lg: '2rem',
      },
      section: {
        xs: '2.5rem',
        md: '3.5rem',
      },
    },
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 'bold',
    },
  },
});

export default theme;
