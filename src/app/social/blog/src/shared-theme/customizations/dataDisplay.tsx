import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { Components, Theme, alpha } from '@mui/material/styles';
import { gray, green, red } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations: Components<Theme> = {
    MuiList: {
        styleOverrides: {
            root: {
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                padding: '8px',
            },
        },
    },
    MuiListItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                [`& .${svgIconClasses.root}`]: {
                    color: (theme.vars || theme).palette.text.secondary,
                    height: '1rem',
                    width: '1rem',
                },
                [`& .${typographyClasses.root}`]: {
                    fontWeight: 500,
                },
                [`& .${buttonBaseClasses.root}`]: {
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    display: 'flex',
                    gap: 8,
                    opacity: 0.7,
                    padding: '2px 8px',
                    '&.Mui-selected': {
                        backgroundColor: alpha(
                            theme.palette.action.selected,
                            0.3,
                        ),
                        opacity: 1,
                        [`& .${svgIconClasses.root}`]: {
                            color: (theme.vars || theme).palette.text.primary,
                        },
                        '&:focus-visible': {
                            backgroundColor: alpha(
                                theme.palette.action.selected,
                                0.3,
                            ),
                        },
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.action.selected,
                                0.5,
                            ),
                        },
                    },
                    '&:focus-visible': {
                        backgroundColor: 'transparent',
                    },
                },
            }),
        },
    },
    MuiListItemText: {
        styleOverrides: {
            primary: ({ theme }) => ({
                fontSize: theme.typography.body2.fontSize,
                fontWeight: 500,
                lineHeight: theme.typography.body2.lineHeight,
            }),
            secondary: ({ theme }) => ({
                fontSize: theme.typography.caption.fontSize,
                lineHeight: theme.typography.caption.lineHeight,
            }),
        },
    },
    MuiListSubheader: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: 'transparent',
                fontSize: theme.typography.caption.fontSize,
                fontWeight: 500,
                lineHeight: theme.typography.caption.lineHeight,
                padding: '4px 8px',
            }),
        },
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: 0,
            },
        },
    },
    MuiChip: {
        defaultProps: {
            size: 'small',
        },
        styleOverrides: {
            root: ({ theme }) => ({
                border: '1px solid',
                borderRadius: '999px',
                [`& .${chipClasses.label}`]: {
                    fontWeight: 600,
                },
                variants: [
                    {
                        props: {
                            color: 'default',
                        },
                        style: {
                            backgroundColor: gray[100],
                            borderColor: gray[200],
                            [`& .${chipClasses.label}`]: {
                                color: gray[500],
                            },
                            [`& .${chipClasses.icon}`]: {
                                color: gray[500],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: gray[800],
                                borderColor: gray[700],
                                [`& .${chipClasses.label}`]: {
                                    color: gray[300],
                                },
                                [`& .${chipClasses.icon}`]: {
                                    color: gray[300],
                                },
                            }),
                        },
                    },
                    {
                        props: {
                            color: 'success',
                        },
                        style: {
                            backgroundColor: green[50],
                            borderColor: green[200],
                            [`& .${chipClasses.label}`]: {
                                color: green[500],
                            },
                            [`& .${chipClasses.icon}`]: {
                                color: green[500],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: green[900],
                                borderColor: green[800],
                                [`& .${chipClasses.label}`]: {
                                    color: green[300],
                                },
                                [`& .${chipClasses.icon}`]: {
                                    color: green[300],
                                },
                            }),
                        },
                    },
                    {
                        props: {
                            color: 'error',
                        },
                        style: {
                            backgroundColor: red[50],
                            borderColor: red[100],
                            [`& .${chipClasses.label}`]: {
                                color: red[500],
                            },
                            [`& .${chipClasses.icon}`]: {
                                color: red[500],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: red[900],
                                borderColor: red[800],
                                [`& .${chipClasses.label}`]: {
                                    color: red[200],
                                },
                                [`& .${chipClasses.icon}`]: {
                                    color: red[300],
                                },
                            }),
                        },
                    },
                    {
                        props: { size: 'small' },
                        style: {
                            maxHeight: 20,
                            [`& .${chipClasses.label}`]: {
                                fontSize: theme.typography.caption.fontSize,
                            },
                            [`& .${svgIconClasses.root}`]: {
                                fontSize: theme.typography.caption.fontSize,
                            },
                        },
                    },
                    {
                        props: { size: 'medium' },
                        style: {
                            [`& .${chipClasses.label}`]: {
                                fontSize: theme.typography.caption.fontSize,
                            },
                        },
                    },
                ],
            }),
        },
    },
    MuiTablePagination: {
        styleOverrides: {
            actions: {
                display: 'flex',
                gap: 8,
                marginRight: 6,
                [`& .${iconButtonClasses.root}`]: {
                    minWidth: 0,
                    width: 36,
                    height: 36,
                },
            },
        },
    },
    MuiIcon: {
        defaultProps: {
            fontSize: 'small',
        },
        styleOverrides: {
            root: {
                variants: [
                    {
                        props: {
                            fontSize: 'small',
                        },
                        style: {
                            fontSize: '1rem',
                        },
                    },
                ],
            },
        },
    },
};
