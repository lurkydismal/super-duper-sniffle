import { Components, Theme, alpha } from "@mui/material/styles";
import { gray, orange } from "../themePrimitives";

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations: Components<Theme> = {
    MuiAlert: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: orange[100],
                border: `1px solid ${alpha(orange[300], 0.5)}`,
                borderRadius: 10,
                color: (theme.vars || theme).palette.text.primary,
                "& .MuiAlert-icon": {
                    color: orange[500],
                },
                ...theme.applyStyles("dark", {
                    backgroundColor: `${alpha(orange[900], 0.5)}`,
                    border: `1px solid ${alpha(orange[800], 0.5)}`,
                }),
            }),
        },
    },
    MuiDialog: {
        styleOverrides: {
            root: ({ theme }) => ({
                "& .MuiDialog-paper": {
                    border: "1px solid",
                    borderColor: (theme.vars || theme).palette.divider,
                    borderRadius: "10px",
                },
            }),
        },
    },
    MuiLinearProgress: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: gray[200],
                borderRadius: 8,
                height: 8,
                ...theme.applyStyles("dark", {
                    backgroundColor: gray[800],
                }),
            }),
        },
    },
};
