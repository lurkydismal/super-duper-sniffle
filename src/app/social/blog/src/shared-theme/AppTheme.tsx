import * as React from 'react';
import type { ThemeOptions } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colorSchemes, shadows, shape, typography } from './themePrimitives';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { inputsCustomizations } from './customizations/inputs';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';

export interface AppThemeProps {
    children?: React.ReactNode;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
    const { children, themeComponents } = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
            // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
            cssVariables: {
                colorSchemeSelector: 'data-mui-color-scheme',
                cssVarPrefix: 'template',
            },
            colorSchemes,
            shadows,
            shape,
            typography,
            components: {
                ...inputsCustomizations,
                ...dataDisplayCustomizations,
                ...feedbackCustomizations,
                ...navigationCustomizations,
                ...surfacesCustomizations,
                ...themeComponents,
            },
        });
    }, [themeComponents]);

    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}
