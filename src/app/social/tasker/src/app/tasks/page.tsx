"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import { CssBaseline, Box, Skeleton } from "@mui/material";
import TasksGrid from "@/components/TasksGrid";
import AppTheme from "@/shared-theme/AppTheme";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "@/theme/customizations";
import rows from "@/data/mockTasksRows";
import { useSearchParams } from "next/navigation";

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

/*
    <Box
        sx={{
            display: "flex",
            mb: 1,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",
        }}
    >
        <Button
            color="primary"
            startDecorator={<DownloadRoundedIcon />}
            size="sm"
        >
            Download PDF
        </Button>
    </Box>
*/

function DataGrid() {
    const params = useSearchParams();

    const routeToStatusMap: Record<string, string> = {
        "in-progress": "In Progress",
        finished: "Finished",
        cancelled: "Cancelled",
        outdated: "Outdated",
    };
    const filterParam = params?.get("filter") ?? undefined;
    const statusFilter = filterParam
        ? routeToStatusMap[filterParam]
        : undefined;

    return <TasksGrid showToolbar statusSearchFilter={statusFilter} rows={rows} />;
}

export default function Page() {
    return (
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />

            <Box
                sx={(theme) => ({
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: "auto",
                })}
                width="100%"
            >
                <React.Suspense fallback={<Skeleton variant="rectangular" />}>
                    <DataGrid />
                </React.Suspense>
            </Box>
        </AppTheme>
    );
}
