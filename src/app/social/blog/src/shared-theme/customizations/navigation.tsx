import * as React from 'react';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { tabClasses } from '@mui/material/Tab';
import { Components, Theme, alpha } from '@mui/material/styles';
import { brand, gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const navigationCustomizations: Components<Theme> = {
    MuiMenuItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: (theme.vars || theme).shape.borderRadius,
                padding: '6px 8px',
                [`&.${menuItemClasses.focusVisible}`]: {
                    backgroundColor: 'transparent',
                },
                [`&.${menuItemClasses.selected}`]: {
                    [`&.${menuItemClasses.focusVisible}`]: {
                        backgroundColor: alpha(
                            theme.palette.action.selected,
                            0.3,
                        ),
                    },
                },
            }),
        },
    },
    MuiMenu: {
        styleOverrides: {
            list: {
                gap: '0px',
                [`&.${dividerClasses.root}`]: {
                    margin: '0 -8px',
                },
            },
            paper: ({ theme }) => ({
                background: 'hsl(0, 0%, 100%)',
                backgroundImage: 'none',
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                borderRadius: (theme.vars || theme).shape.borderRadius,
                boxShadow:
                    'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
                marginTop: '4px',
                [`& .${buttonBaseClasses.root}`]: {
                    '&.Mui-selected': {
                        backgroundColor: alpha(
                            theme.palette.action.selected,
                            0.3,
                        ),
                    },
                },
                ...theme.applyStyles('dark', {
                    background: gray[900],
                    boxShadow:
                        'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
                }),
            }),
        },
    },
    MuiSelect: {
        defaultProps: {
            IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>(
                (props, ref) => (
                    <UnfoldMoreRoundedIcon
                        fontSize="small"
                        {...props}
                        ref={ref}
                    />
                ),
            ),
        },
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.background.paper,
                border: '1px solid',
                borderColor: gray[200],
                borderRadius: (theme.vars || theme).shape.borderRadius,
                boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
                '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.background
                        .paper,
                    borderColor: gray[300],
                    boxShadow: 'none',
                },
                [`&.${selectClasses.focused}`]: {
                    borderColor: gray[400],
                    outlineOffset: 0,
                },
                '&:before, &:after': {
                    display: 'none',
                },

                ...theme.applyStyles('dark', {
                    backgroundColor: (theme.vars || theme).palette.background
                        .paper,
                    borderColor: gray[700],
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
                    '&:hover': {
                        backgroundColor: (theme.vars || theme).palette
                            .background.paper,
                        borderColor: alpha(gray[700], 0.7),
                        boxShadow: 'none',
                    },
                    [`&.${selectClasses.focused}`]: {
                        borderColor: gray[900],
                        outlineOffset: 0,
                    },
                    '&:before, &:after': {
                        display: 'none',
                    },
                }),
            }),
            select: ({ theme }) => ({
                alignItems: 'center',
                display: 'flex',
                ...theme.applyStyles('dark', {
                    alignItems: 'center',
                    display: 'flex',
                    '&:focus-visible': {
                        backgroundColor: gray[900],
                    },
                }),
            }),
        },
    },
    MuiLink: {
        defaultProps: {
            underline: 'none',
        },
        styleOverrides: {
            root: ({ theme }) => ({
                color: (theme.vars || theme).palette.text.primary,
                fontWeight: 500,
                position: 'relative',
                textDecoration: 'none',
                width: 'fit-content',
                '&::before': {
                    backgroundColor: (theme.vars || theme).palette.text
                        .secondary,
                    bottom: 0,
                    content: '""',
                    height: '1px',
                    left: 0,
                    opacity: 0.3,
                    position: 'absolute',
                    transition: 'width 0.3s ease, opacity 0.3s ease',
                    width: '100%',
                },
                '&:hover::before': {
                    width: 0,
                },
                '&:focus-visible': {
                    borderRadius: '2px',
                    outline: `3px solid ${alpha(brand[500], 0.5)}`,
                    outlineOffset: '4px',
                },
            }),
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.background
                    .default,
            }),
        },
    },
    MuiPaginationItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&.Mui-selected': {
                    backgroundColor: (theme.vars || theme).palette.grey[900],
                    color: 'white',
                },
                ...theme.applyStyles('dark', {
                    '&.Mui-selected': {
                        backgroundColor: (theme.vars || theme).palette.grey[50],
                        color: 'black',
                    },
                }),
            }),
        },
    },
    MuiTabs: {
        styleOverrides: {
            root: { minHeight: 'fit-content' },
            indicator: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.grey[800],
                ...theme.applyStyles('dark', {
                    backgroundColor: (theme.vars || theme).palette.grey[200],
                }),
            }),
        },
    },
    MuiTab: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: '1px solid',
                borderColor: 'transparent',
                borderRadius: (theme.vars || theme).shape.borderRadius,
                color: (theme.vars || theme).palette.text.secondary,
                marginBottom: '8px',
                minHeight: 'fit-content',
                minWidth: 'fit-content',
                padding: '6px 8px',
                textTransform: 'none',
                ':hover': {
                    backgroundColor: gray[100],
                    borderColor: gray[200],
                    color: (theme.vars || theme).palette.text.primary,
                },
                [`&.${tabClasses.selected}`]: {
                    color: gray[900],
                },
                ...theme.applyStyles('dark', {
                    ':hover': {
                        backgroundColor: gray[800],
                        borderColor: gray[700],
                        color: (theme.vars || theme).palette.text.primary,
                    },
                    [`&.${tabClasses.selected}`]: {
                        color: '#fff',
                    },
                }),
            }),
        },
    },
    MuiStepConnector: {
        styleOverrides: {
            line: ({ theme }) => ({
                borderColor: (theme.vars || theme).palette.divider,
                borderRadius: '99px',
                borderTop: '1px solid',
                flex: 1,
            }),
        },
    },
    MuiStepIcon: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: `1px solid ${gray[400]}`,
                borderRadius: '50%',
                color: 'transparent',
                height: 12,
                width: 12,
                '& text': {
                    display: 'none',
                },
                '&.Mui-active': {
                    border: 'none',
                    color: (theme.vars || theme).palette.primary.main,
                },
                '&.Mui-completed': {
                    border: 'none',
                    color: (theme.vars || theme).palette.success.main,
                },
                ...theme.applyStyles('dark', {
                    border: `1px solid ${gray[700]}`,
                    '&.Mui-active': {
                        border: 'none',
                        color: (theme.vars || theme).palette.primary.light,
                    },
                    '&.Mui-completed': {
                        border: 'none',
                        color: (theme.vars || theme).palette.success.light,
                    },
                }),
                variants: [
                    {
                        props: { completed: true },
                        style: {
                            height: 12,
                            width: 12,
                        },
                    },
                ],
            }),
        },
    },
    MuiStepLabel: {
        styleOverrides: {
            label: ({ theme }) => ({
                '&.Mui-completed': {
                    opacity: 0.6,
                    ...theme.applyStyles('dark', { opacity: 0.5 }),
                },
            }),
        },
    },
};
