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
      main: '#D2691E',
      dark: '#A0522D',
      light: '#DEB887',
    },
    secondary: {
      main: '#CD853F',
      dark: '#8B4513',
      light: '#F4A460',
    },
    background: {
      default: '#FFF8DC',
      paper: '#FFFAF0',
    },
    text: {
      primary: '#2F1B14',
      secondary: '#8B4513',
    },
    error: {
      main: '#B22222',
      dark: '#8B0000',
    },
    warning: {
      main: '#FF8C00',
      dark: '#FF7F50',
    },
    info: {
      main: '#4682B4',
      dark: '#2F4F4F',
    },
    success: {
      main: '#228B22',
      dark: '#006400',
    },
    custom: {
      hero: {
        gradient: 'linear-gradient(135deg, #D2691E 0%, #CD853F 50%, #DEB887 100%)',
        overlay: 'rgba(47, 27, 20, 0.4)',
      },
      mission: {
        gradient: 'linear-gradient(135deg, #CD853F 0%, #A0522D 100%)',
        pattern:
          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(255,248,220,0.05)" fill-rule="evenodd"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20zm0 0c11.046 0 20 8.954 20 20H20V20z"/%3E%3C/g%3E%3C/svg%3E")',
      },
      footer: {
        background: '#2F1B14',
        divider: 'rgba(222, 184, 135, 0.2)',
      },
      social: {
        instagram: '#E07B39',
        x: '#2F1B14',
        linkedin: '#CD853F',
        facebook: '#D2691E',
        whatsapp: '#228B22',
        gmail: '#B22222',
      },
      success: '#228B22',
      shadow: {
        light: '0 4px 20px rgba(47, 27, 20, 0.1)',
        medium: '0 8px 25px rgba(47, 27, 20, 0.15)',
        heavy: '0 12px 25px rgba(47, 27, 20, 0.2)',
        colored: '0 8px 25px rgba(210, 105, 30, 0.3)',
      },
      overlay: {
        light: 'rgba(255, 248, 220, 0.1)',
        medium: 'rgba(255, 248, 220, 0.7)',
        dark: 'rgba(255, 248, 220, 0.9)',
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
