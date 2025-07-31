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
      main: '#16697A',
      dark: '#0D4A56',
      light: '#489FB5',
    },
    secondary: {
      main: '#FFA62B',
      dark: '#E5941C',
      light: '#FFB84D',
    },
    background: {
      default: '#EDE7E3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#16697A',
      secondary: '#489FB5',
    },
    error: {
      main: '#D32F2F',
      dark: '#B71C1C',
    },
    warning: {
      main: '#FFA62B',
      dark: '#E5941C',
    },
    info: {
      main: '#489FB5',
      dark: '#16697A',
    },
    success: {
      main: '#2E7D32',
      dark: '#1B5E20',
    },
    custom: {
      hero: {
        gradient: 'linear-gradient(135deg, #16697A 0%, #489FB5 50%, #82C0CC 100%)',
        overlay: 'rgba(22, 105, 122, 0.4)',
      },
      mission: {
        gradient: 'linear-gradient(135deg, #489FB5 0%, #16697A 100%)',
        pattern:
          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(237,231,227,0.1)" fill-rule="evenodd"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20zm0 0c11.046 0 20 8.954 20 20H20V20z"/%3E%3C/g%3E%3C/svg%3E")',
      },
      footer: {
        background: '#16697A',
        divider: 'rgba(130, 192, 204, 0.2)',
      },
      social: {
        instagram: '#FFA62B',
        x: '#16697A',
        linkedin: '#489FB5',
        facebook: '#16697A',
        whatsapp: '#2E7D32',
        gmail: '#D32F2F',
      },
      success: '#2E7D32',
      shadow: {
        light: '0 4px 20px rgba(22, 105, 122, 0.1)',
        medium: '0 8px 25px rgba(22, 105, 122, 0.15)',
        heavy: '0 12px 25px rgba(22, 105, 122, 0.2)',
        colored: '0 8px 25px rgba(255, 166, 43, 0.3)',
      },
      overlay: {
        light: 'rgba(237, 231, 227, 0.1)',
        medium: 'rgba(237, 231, 227, 0.7)',
        dark: 'rgba(237, 231, 227, 0.9)',
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
