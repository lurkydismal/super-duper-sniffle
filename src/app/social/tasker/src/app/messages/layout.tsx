import * as React from "react";
import theme from "@/theme";
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CssVarsProvider
            defaultMode="dark"
            theme={theme}
            disableTransitionOnChange
        >
            <CssBaseline />

            {children}
        </CssVarsProvider>
    );
}
