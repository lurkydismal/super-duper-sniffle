"use client";

import * as React from "react";
import AppTheme from "@/shared-theme/AppTheme";
import {
    GlobalStyles,
    Avatar,
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    listItemButtonClasses,
    ListItemContent,
    Typography,
    Sheet,
} from "@mui/joy";
import NextLink from "@/components/Link";
import {
    DashboardRounded as DashboardRoundedIcon,
    AssignmentRounded as AssignmentRoundedIcon,
    QuestionAnswerRounded as QuestionAnswerRoundedIcon,
    LogoutRounded as LogoutRoundedIcon,
    PendingActionsRounded as PendingActionsRoundedIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import {
    FormatListBulleted as AllIcon,
    PendingOutlined as InProgressIcon,
    CheckCircleOutline as FinishedIcon,
    CancelOutlined as CancelledIcon,
    ScheduleOutlined as OutdatedIcon,
} from "@mui/icons-material";

// import ColorSchemeToggle from "./ColorSchemeToggle";

function Toggler(props: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const { defaultExpanded = false, renderToggle, children } = props;
    const [open, setOpen] = React.useState(defaultExpanded);

    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: "grid",
                        transition: "0.2s ease",
                        "& > *": {
                            overflow: "hidden",
                        },
                    },
                    open
                        ? { gridTemplateRows: "1fr" }
                        : { gridTemplateRows: "0fr" },
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar() {
    const pathnameRaw = usePathname() ?? "/";
    // normalize (remove trailing slash)
    const pathname = pathnameRaw.replace(/\/+$/, "") || "/";

    const taskLinks = [
        { label: "All tasks", icon: AllIcon, href: "/tasks" },
        {
            label: "In progress",
            icon: InProgressIcon,
            href: "/tasks?filter=in-progress",
        },
        {
            label: "Finished",
            icon: FinishedIcon,
            href: "/tasks?filter=finished",
        },
        {
            label: "Cancelled",
            icon: CancelledIcon,
            href: "/tasks?filter=cancelled",
        },
        {
            label: "Outdated",
            icon: OutdatedIcon,
            href: "/tasks?filter=outdated",
        },
    ];

    const menu = [
        {
            key: "dashboard",
            type: "link" as const,
            href: "/dashboard",
            label: "Dashboard",
            Icon: DashboardRoundedIcon,
            isSelected: (p: string) => p.includes("/dashboard"),
        },
        {
            key: "tasks",
            type: "nested" as const,
            label: "Tasks",
            Icon: AssignmentRoundedIcon,
            isSelected: (p: string) => p.includes("/tasks"),
            children: taskLinks,
        },
        {
            key: "messages",
            type: "link" as const,
            href: "/messages",
            label: "Messages",
            Icon: QuestionAnswerRoundedIcon,
            badge: 4,
            isSelected: (p: string) => p.includes("/messages"),
        },
    ];

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: "fixed", md: "sticky" },
                transform: {
                    xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
                    md: "none",
                },
                transition: "transform 0.4s, width 0.4s",
                zIndex: 10000,
                height: "100dvh",
                width: "var(--Sidebar-width)",
                top: 0,
                p: 2,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRight: "1px solid",
                borderColor: "divider",
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ":root": {
                        "--Sidebar-width": "220px",
                        [theme.breakpoints.up("lg")]: {
                            "--Sidebar-width": "240px",
                        },
                    },
                })}
            />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <NextLink href="/">
                    <IconButton variant="soft" color="primary" size="sm">
                        <PendingActionsRoundedIcon />
                    </IconButton>
                </NextLink>
                <Typography level="title-lg" href="/" component={NextLink}>
                    Tasker
                </Typography>
                {/*<ColorSchemeToggle sx={{ ml: "auto" }} />*/}
            </Box>
            <Divider />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: "hidden auto",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        "--List-nestedInsetStart": "30px",
                        "--ListItem-radius": (theme) => theme.vars.radius.sm,
                    }}
                >
                    {menu.map((item) => {
                        const Icon = item.Icon;

                        if (item.type === "link") {
                            return (
                                <ListItem
                                    key={item.key}
                                    href={item.href}
                                    component={NextLink}
                                >
                                    <ListItemButton
                                        selected={item.isSelected(pathname)}
                                    >
                                        <Icon />
                                        <ListItemContent>
                                            <Typography level="title-sm">
                                                {item.label}
                                            </Typography>
                                        </ListItemContent>
                                        {item.badge ? (
                                            <Chip
                                                size="sm"
                                                color="primary"
                                                variant="solid"
                                            >
                                                {item.badge}
                                            </Chip>
                                        ) : null}
                                    </ListItemButton>
                                </ListItem>
                            );
                        }

                        // Nested
                        const isSelected = item.isSelected(pathname);

                        return (
                            <ListItem key={item.key} nested>
                                <Toggler
                                    defaultExpanded={isSelected}
                                    renderToggle={({ open, setOpen }) => {
                                        return (
                                            <ListItemButton
                                                onClick={() => setOpen(!open)}
                                                selected={isSelected}
                                            >
                                                <Icon />
                                                <ListItemContent>
                                                    <Typography level="title-sm">
                                                        {item.label}
                                                    </Typography>
                                                </ListItemContent>
                                                <KeyboardArrowDownIcon
                                                    sx={[
                                                        open
                                                            ? {
                                                                  transform:
                                                                      "rotate(180deg)",
                                                              }
                                                            : {
                                                                  transform:
                                                                      "none",
                                                              },
                                                    ]}
                                                />
                                            </ListItemButton>
                                        );
                                    }}
                                >
                                    <List>
                                        {item.children.map((c, index) => {
                                            const Icon = c.icon;

                                            return (
                                                <ListItem
                                                    key={c.href}
                                                    sx={
                                                        index === 0
                                                            ? { mt: 0.5 }
                                                            : null
                                                    }
                                                    href={c.href}
                                                    component={NextLink}
                                                >
                                                    <ListItemButton>
                                                        <Icon />
                                                        {c.label}
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Toggler>
                            </ListItem>
                        );
                    })}
                </List>
                {/*
                <List
                    size="sm"
                    sx={{
                        mt: "auto",
                        flexGrow: 0,
                        "--ListItem-radius": (theme) => theme.vars.radius.sm,
                        "--List-gap": "8px",
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <SettingsRoundedIcon />
                            Settings
                        </ListItemButton>
                    </ListItem>
                </List>
                */}
                {/*
                    <Card
                        suppressHydrationWarning
                        invertedColors // A tree hydrated but some attributes of the server rendered HTML didn't match the client properties
                        variant='soft'
                        color='warning'
                        size='sm'
                        sx={{ boxShadow: 'none' }}
                    >
                        <Stack
                            direction='row'
                            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <Typography level='title-sm'>Used space</Typography>
                            <IconButton size='sm'>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Stack>
                        <Typography level='body-xs'>
                            Your team has used 80% of your available space. Need more?
                        </Typography>
                        <LinearProgress variant='outlined' value={80} determinate sx={{ my: 1 }} />
                        <Button size='sm' variant='solid'>
                            Upgrade plan
                        </Button>
                    </Card>
                */}
            </Box>
            <Divider />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Avatar variant="outlined" size="sm" alt="Siriwat K.">
                    {"Siriwat K."[0].toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">Siriwat K.</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
}

export function SidebarWrapper() {
    return (
        <AppTheme>
            <Sidebar />
        </AppTheme>
    );
}
