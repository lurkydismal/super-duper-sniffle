import { Components, Theme, alpha } from "@mui/material/styles";
import { gray } from "../themePrimitives";

/* eslint-disable import/prefer-default-export */
export const surfacesCustomizations: Components<Theme> = {
    MuiAccordion: {
        defaultProps: {
            disableGutters: true,
            elevation: 0,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.background
                    .default,
                border: "1px solid",
                borderColor: (theme.vars || theme).palette.divider,
                overflow: "clip",
                padding: 4,
                ":before": {
                    backgroundColor: "transparent",
                },
                "&:not(:last-of-type)": {
                    borderBottom: "none",
                },
                "&:first-of-type": {
                    borderTopLeftRadius: (theme.vars || theme).shape
                        .borderRadius,
                    borderTopRightRadius: (theme.vars || theme).shape
                        .borderRadius,
                },
                "&:last-of-type": {
                    borderBottomLeftRadius: (theme.vars || theme).shape
                        .borderRadius,
                    borderBottomRightRadius: (theme.vars || theme).shape
                        .borderRadius,
                },
            }),
        },
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: "none",
                borderRadius: 8,
                "&:focus-visible": { backgroundColor: "transparent" },
                "&:hover": { backgroundColor: gray[50] },
                ...theme.applyStyles("dark", {
                    "&:hover": { backgroundColor: gray[800] },
                }),
            }),
        },
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: { mb: 20, border: "none" },
        },
    },
    MuiPaper: {
        defaultProps: {
            elevation: 0,
        },
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => {
                return {
                    backgroundColor: gray[50],
                    border: `1px solid ${(theme.vars || theme).palette.divider}`,
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    boxShadow: "none",
                    gap: 16,
                    padding: 16,
                    transition: "all 100ms ease",
                    ...theme.applyStyles("dark", {
                        backgroundColor: gray[800],
                    }),
                    variants: [
                        {
                            props: {
                                variant: "outlined",
                            },
                            style: {
                                background: "hsl(0, 0%, 100%)",
                                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                                boxShadow: "none",
                                ...theme.applyStyles("dark", {
                                    background: alpha(gray[900], 0.4),
                                }),
                            },
                        },
                    ],
                };
            },
        },
    },
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: 0,
                "&:last-child": { paddingBottom: 0 },
            },
        },
    },
    MuiCardHeader: {
        styleOverrides: {
            root: {
                padding: 0,
            },
        },
    },
    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: 0,
            },
        },
    },
};
