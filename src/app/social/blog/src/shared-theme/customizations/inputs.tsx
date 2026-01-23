import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { Components, Theme, alpha } from '@mui/material/styles';
import { brand, gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations: Components<Theme> = {
    MuiButtonBase: {
        defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                boxSizing: 'border-box',
                transition: 'all 100ms ease-in',
                '&:focus-visible': {
                    outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    outlineOffset: '2px',
                },
            }),
        },
    },
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: (theme.vars || theme).shape.borderRadius,
                boxShadow: 'none',
                textTransform: 'none',
                variants: [
                    {
                        props: {
                            size: 'small',
                        },
                        style: {
                            height: '2.25rem',
                            padding: '8px 12px',
                        },
                    },
                    {
                        props: {
                            size: 'medium',
                        },
                        style: {
                            height: '2.5rem', // 40px
                        },
                    },
                    {
                        props: {
                            color: 'primary',
                            variant: 'contained',
                        },
                        style: {
                            backgroundColor: gray[900],
                            backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
                            border: `1px solid ${gray[700]}`,
                            boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: gray[700],
                                backgroundImage: 'none',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: gray[800],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: gray[50],
                                backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                                border: `1px solid ${gray[50]}`,
                                boxShadow: 'inset 0 -1px 0  hsl(220, 30%, 80%)',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: gray[300],
                                    backgroundImage: 'none',
                                    boxShadow: 'none',
                                },
                                '&:active': {
                                    backgroundColor: gray[400],
                                },
                            }),
                        },
                    },
                    {
                        props: {
                            color: 'secondary',
                            variant: 'contained',
                        },
                        style: {
                            backgroundColor: brand[300],
                            backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                            border: `1px solid ${brand[500]}`,
                            boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: brand[700],
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: brand[700],
                                backgroundImage: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            backgroundColor: alpha(gray[50], 0.3),
                            border: '1px solid',
                            borderColor: gray[200],
                            color: (theme.vars || theme).palette.text.primary,
                            '&:hover': {
                                backgroundColor: gray[100],
                                borderColor: gray[300],
                            },
                            '&:active': {
                                backgroundColor: gray[200],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: gray[800],
                                borderColor: gray[700],

                                '&:hover': {
                                    backgroundColor: gray[900],
                                    borderColor: gray[600],
                                },
                                '&:active': {
                                    backgroundColor: gray[900],
                                },
                            }),
                        },
                    },
                    {
                        props: {
                            color: 'secondary',
                            variant: 'outlined',
                        },
                        style: {
                            backgroundColor: brand[50],
                            border: '1px solid',
                            borderColor: brand[200],
                            color: brand[700],
                            '&:hover': {
                                backgroundColor: brand[100],
                                borderColor: brand[400],
                            },
                            '&:active': {
                                backgroundColor: alpha(brand[200], 0.7),
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: alpha(brand[900], 0.3),
                                border: '1px solid',
                                borderColor: brand[900],
                                color: brand[50],
                                '&:hover': {
                                    backgroundColor: alpha(brand[900], 0.6),
                                    borderColor: brand[700],
                                },
                                '&:active': {
                                    backgroundColor: alpha(brand[900], 0.5),
                                },
                            }),
                        },
                    },
                    {
                        props: {
                            variant: 'text',
                        },
                        style: {
                            color: gray[600],
                            '&:hover': {
                                backgroundColor: gray[100],
                            },
                            '&:active': {
                                backgroundColor: gray[200],
                            },
                            ...theme.applyStyles('dark', {
                                color: gray[50],
                                '&:hover': {
                                    backgroundColor: gray[700],
                                },
                                '&:active': {
                                    backgroundColor: alpha(gray[700], 0.7),
                                },
                            }),
                        },
                    },
                    {
                        props: {
                            color: 'secondary',
                            variant: 'text',
                        },
                        style: {
                            color: brand[700],
                            '&:hover': {
                                backgroundColor: alpha(brand[100], 0.5),
                            },
                            '&:active': {
                                backgroundColor: alpha(brand[200], 0.7),
                            },
                            ...theme.applyStyles('dark', {
                                color: brand[100],
                                '&:hover': {
                                    backgroundColor: alpha(brand[900], 0.5),
                                },
                                '&:active': {
                                    backgroundColor: alpha(brand[900], 0.3),
                                },
                            }),
                        },
                    },
                ],
            }),
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: alpha(gray[50], 0.3),
                border: '1px solid ',
                borderColor: gray[200],
                borderRadius: (theme.vars || theme).shape.borderRadius,
                boxShadow: 'none',
                color: (theme.vars || theme).palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
                letterSpacing: 0,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: gray[100],
                    borderColor: gray[300],
                },
                '&:active': {
                    backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                    backgroundColor: gray[800],
                    borderColor: gray[700],
                    '&:hover': {
                        backgroundColor: gray[900],
                        borderColor: gray[600],
                    },
                    '&:active': {
                        backgroundColor: gray[900],
                    },
                }),
                variants: [
                    {
                        props: {
                            size: 'small',
                        },
                        style: {
                            height: '2.25rem',
                            padding: '0.25rem',
                            width: '2.25rem',
                            [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
                        },
                    },
                    {
                        props: {
                            size: 'medium',
                        },
                        style: {
                            height: '2.5rem',
                            width: '2.5rem',
                        },
                    },
                ],
            }),
        },
    },
    MuiToggleButtonGroup: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: '10px',
                boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
                [`& .${toggleButtonGroupClasses.selected}`]: {
                    color: brand[500],
                },
                ...theme.applyStyles('dark', {
                    [`& .${toggleButtonGroupClasses.selected}`]: {
                        color: '#fff',
                    },
                    boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
                }),
            }),
        },
    },
    MuiToggleButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: '10px',
                fontWeight: 500,
                padding: '12px 16px',
                textTransform: 'none',
                ...theme.applyStyles('dark', {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
                    color: gray[400],
                    [`&.${toggleButtonClasses.selected}`]: {
                        color: brand[300],
                    },
                }),
            }),
        },
    },
    MuiCheckbox: {
        defaultProps: {
            disableRipple: true,
            icon: (
                <CheckBoxOutlineBlankRoundedIcon
                    sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }}
                />
            ),
            checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
            indeterminateIcon: (
                <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />
            ),
        },
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: alpha(gray[100], 0.4),
                border: '1px solid ',
                borderColor: alpha(gray[300], 0.8),
                borderRadius: 5,
                boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
                height: 16,
                margin: 10,
                transition: 'border-color, background-color, 120ms ease-in',
                width: 16,
                '&:hover': {
                    borderColor: brand[300],
                },
                '&.Mui-focusVisible': {
                    borderColor: brand[400],
                    outline: `3px solid ${alpha(brand[500], 0.5)}`,
                    outlineOffset: '2px',
                },
                '&.Mui-checked': {
                    backgroundColor: brand[500],
                    borderColor: brand[500],
                    boxShadow: `none`,
                    color: 'white',
                    '&:hover': {
                        backgroundColor: brand[600],
                    },
                },
                ...theme.applyStyles('dark', {
                    backgroundColor: alpha(gray[900], 0.8),
                    borderColor: alpha(gray[700], 0.8),
                    boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
                    '&:hover': {
                        borderColor: brand[300],
                    },
                    '&.Mui-focusVisible': {
                        borderColor: brand[400],
                        outline: `3px solid ${alpha(brand[500], 0.5)}`,
                        outlineOffset: '2px',
                    },
                }),
            }),
        },
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                border: 'none',
            },
            input: {
                '&::placeholder': {
                    color: gray[500],
                    opacity: 0.7,
                },
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                padding: 0,
            },
            root: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.background
                    .default,
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                borderRadius: (theme.vars || theme).shape.borderRadius,
                color: (theme.vars || theme).palette.text.primary,
                padding: '8px 12px',
                transition: 'border 120ms ease-in',
                '&:hover': {
                    borderColor: gray[400],
                },
                [`&.${outlinedInputClasses.focused}`]: {
                    borderColor: brand[400],
                    outline: `3px solid ${alpha(brand[500], 0.5)}`,
                },
                ...theme.applyStyles('dark', {
                    '&:hover': {
                        borderColor: gray[500],
                    },
                }),
                variants: [
                    {
                        props: {
                            size: 'small',
                        },
                        style: {
                            height: '2.25rem',
                        },
                    },
                    {
                        props: {
                            size: 'medium',
                        },
                        style: {
                            height: '2.5rem',
                        },
                    },
                ],
            }),
            notchedOutline: {
                border: 'none',
            },
        },
    },
    MuiInputAdornment: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: (theme.vars || theme).palette.grey[500],
                ...theme.applyStyles('dark', {
                    color: (theme.vars || theme).palette.grey[400],
                }),
            }),
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: ({ theme }) => ({
                marginBottom: 8,
                typography: theme.typography.caption,
            }),
        },
    },
};
