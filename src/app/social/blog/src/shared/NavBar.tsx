import * as React from "react";
import * as ReactRouter from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "center",
    backdropFilter: "blur(24px)",
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    borderColor: (theme.vars || theme).palette.divider,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    boxShadow: (theme.vars || theme).shadows[1],
    pborder: "1px solid",
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    adding: "8px 12px",
}));

export default function NavBar() {
    const navigate = ReactRouter.useNavigate();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            enableColorOnDark
            position="fixed"
            sx={{
                backgroundImage: "none",
                bgcolor: "transparent",
                boxShadow: 0,
                mt: "calc(var(--template-frame-height, 0px) + 28px)",
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            px: 0,
                        }}
                    >
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Button
                                variant="text"
                                color="info"
                                size="small"
                                onClick={() => {
                                    navigate("/epistles");
                                }}
                                href="#"
                            >
                                Epistles
                            </Button>
                            <Button
                                variant="text"
                                color="info"
                                size="small"
                                onClick={() => {
                                    navigate("/follows");
                                }}
                                href="#"
                            >
                                Follows
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            paddingRight: 2,
                            alignItems: "center",
                            display: { xs: "none", md: "flex" },
                            gap: 1,
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => {
                                navigate("/new-post");
                            }}
                            href="#"
                        >
                            New post
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => {
                                navigate("/posts");
                            }}
                            href="#"
                        >
                            Posts
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => {
                                navigate("/profile");
                            }}
                            href="#"
                        >
                            My profile
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
                        <IconButton
                            aria-label="Menu button"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            onClose={toggleDrawer(false)}
                            open={open}
                            slotProps={{
                                paper: {
                                    sx: {
                                        top: "var(--template-frame-height, 0px)",
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 1,
                                    backgroundColor: "background.default",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem
                                    onClick={() => {
                                        navigate("/epistles");
                                    }}
                                    href="#"
                                >
                                    Epistles
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        navigate("/follows");
                                    }}
                                    href="#"
                                >
                                    Follows
                                </MenuItem>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem sx={{ gap: 1 }}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            navigate("/new-posts");
                                        }}
                                        href="#"
                                        fullWidth
                                    >
                                        New posts
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            navigate("/posts");
                                        }}
                                        href="#"
                                        fullWidth
                                    >
                                        Posts
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            navigate("/profile");
                                        }}
                                        href="#"
                                        fullWidth
                                    >
                                        My profile
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
