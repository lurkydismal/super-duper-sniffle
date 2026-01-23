import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import log from "@/utils/stdlog";
import {
    DataGrid,
    DataGridProps,
    GridFilterModel,
    GridRowParams,
    GridRowsProp,
} from "@mui/x-data-grid";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid,
    IconButton,
    Divider,
} from "@mui/material";
import columns from "./columns";
import Markdown from '@/components/Markdown';

type TasksGridProps = Omit<DataGridProps, 'columns'> & {
    rows: GridRowsProp;
    statusSearchFilter?: string;
};

type SelectedRow = {
    id: string | number;
    title: string;
    status: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    endDate?: string | Date;
    tag: string;
    author: string;
    tracker: string;
    content: string;
} | null;

export default function TasksGrid({
    rows,
    statusSearchFilter,
    ...props
}: TasksGridProps) {
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>(() =>
        statusSearchFilter
            ? {
                items: [
                    {
                        field: "status",
                        operator: "equals",
                        value: statusSearchFilter,
                    },
                ],
            }
            : { items: [] },
    );

    React.useEffect(() => {
        if (statusSearchFilter) {
            setFilterModel({
                items: [
                    {
                        field: "status",
                        operator: "equals",
                        value: statusSearchFilter,
                    },
                ],
            });
        } else {
            setFilterModel({ items: [] });
        }
    }, [statusSearchFilter]);

    const [selectedRow, setSelectedRow] = React.useState<SelectedRow>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleRowClick = (params: GridRowParams) => {
        setSelectedRow(params.row as SelectedRow);
        setDialogOpen(true);
    };

    const handleClose = () => setDialogOpen(false);

    const renderValue = (value: any) => {
        if (value === null || value === undefined) {
            return <Typography color="text.secondary">—</Typography>;
        }

        if (typeof value === "object") {
            try {
                return (
                    <Typography
                        component="pre"
                        variant="body2"
                        sx={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace",
                            m: 0,
                        }}
                    >
                        {JSON.stringify(value, null, 2)}
                    </Typography>
                );
            } catch {
                return (
                    <Typography
                        variant="body2"
                        sx={{ fontFamily: "monospace" }}
                    >
                        {String(value)}
                    </Typography>
                );
            }
        }

        return (
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                {String(value)}
            </Typography>
        );
    };

    const renderSelectedRow = (row: SelectedRow) => {
        if (!row) return null;

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/*<AuthorsWithDateAndLink {...properties} />*/}
                <Typography variant="subtitle1" component="div">
                    {row.tag}
                </Typography>
                <Typography gutterBottom tabIndex={0} variant="h3">
                    {row.title}
                </Typography>
                <Markdown>{row.content}</Markdown>
            </Box>
        );
    };

    return (
        <>
            <DataGrid
                {...props}
                disableColumnResize
                disableRowSelectionOnClick
                autoPageSize
                density="compact"
                rows={rows}
                columns={columns}
                filterModel={filterModel}
                onFilterModelChange={setFilterModel}
                sx={{
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                }}
                onRowClick={handleRowClick}
            />

            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                keepMounted
                slotProps={{
                    transition: {
                        onExited: () => {
                            // only clear the heavy/volatile data after exit animation completes
                            setSelectedRow(null);
                        },
                    },
                }}
            >
                <DialogTitle>
                    <Typography variant="h4">{selectedRow?.title}</Typography>

                    {/* top-right close button */}
                    <IconButton
                        aria-label="Close"
                        onClick={() => setDialogOpen(false)}
                        size="small"
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            bgcolor: "action.hover",
                            "&:hover": { bgcolor: "action.selected" },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedRow && (
                        /*
                        <Box sx={{ mt: 1 }}>
                            <Grid container spacing={1}>
                                {Object.entries(selectedRow).map(
                                    ([key, value]) => (
                                        <React.Fragment key={key}>
                                            <Grid size={{ xs: 4, sm: 3 }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                >
                                                    {key}
                                                </Typography>
                                            </Grid>
                                            <Grid size={{ xs: 8, sm: 9 }}>
                                                {renderValue(value)}
                                            </Grid>
                                        </React.Fragment>
                                    ),
                                )}
                            </Grid>
                        </Box>
                        */
                        renderSelectedRow(selectedRow)
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
