"use client";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MainGrid from "@/components/MainGrid";
import AppTheme from "@/shared-theme/AppTheme";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "@/theme/customizations";
import rows from "@/data/mockTasksRows";

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function Page() {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />

            <Box sx={{ display: "flex" }}>
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: "auto",
                    })}
                >
                    <Stack
                        className="pb-2"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            mx: 3,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <MainGrid rows={rows} />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
