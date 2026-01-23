"use client";

import * as React from "react";
import {
    type ThemeOptions,
    createTheme,
    ThemeProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { inputsCustomizations } from "./customizations/inputs";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";

export interface AppThemeProps {
    children?: React.ReactNode;
    themeComponents?: ThemeOptions["components"];
}

export default function AppTheme(props: AppThemeProps) {
    const { children, themeComponents } = props;
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const prefersDarkMode = true;

    const theme = createTheme({
        // TODO: Remove
        palette: {
            mode: prefersDarkMode ? "dark" : "light",
        },
        // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
        cssVariables: {
            colorSchemeSelector: "data",
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

    return (
        <ThemeProvider
            theme={{ [MATERIAL_THEME_ID]: theme }}
            disableTransitionOnChange
        >
            <JoyCssVarsProvider disableTransitionOnChange>
                <CssBaseline enableColorScheme />

                {children}
            </JoyCssVarsProvider>
        </ThemeProvider>
    );
}
