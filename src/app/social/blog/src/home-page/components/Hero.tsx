import * as ReactRouter from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
    alignSelf: "center",
    backgroundImage: `url(/static/screenshots/dashboard.png)`,
    backgroundSize: "cover",
    border: "1px solid",
    borderColor: (theme.vars || theme).palette.grey[200],
    borderRadius: (theme.vars || theme).shape.borderRadius,
    boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
    height: 400,
    marginTop: theme.spacing(8),
    outline: "3px solid",
    outlineColor: "hsla(220, 25%, 80%, 0.2)",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        height: 700,
        marginTop: theme.spacing(10),
    },
    ...theme.applyStyles("dark", {
        backgroundImage: `url(/static/screenshots/dashboard-dark.png)`,
        borderColor: (theme.vars || theme).palette.grey[700],
        boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
        outlineColor: "hsla(220, 20%, 42%, 0.1)",
    }),
}));

export default function Hero() {
    const navigate = ReactRouter.useNavigate();

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                backgroundImage:
                    "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
                backgroundRepeat: "no-repeat",
                width: "100%",
                ...theme.applyStyles("dark", {
                    backgroundImage:
                        "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
                }),
            })}
        >
            <Container
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    pb: { xs: 8, sm: 12 },
                    pt: { xs: 4, sm: 10 },
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        width: { xs: "100%", sm: "70%" },
                    }}
                    useFlexGap
                >
                    <Typography
                        variant="h1"
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            fontSize: "clamp(3rem, 10vw, 3.5rem)",
                        }}
                    >
                        vigilant&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={(theme) => ({
                                color: "primary.main",
                                fontSize: "inherit",
                                ...theme.applyStyles("dark", {
                                    color: "primary.light",
                                }),
                            })}
                        >
                            funicular
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            textAlign: "center",
                            width: { sm: "100%", md: "80%" },
                        }}
                    >
                        Explore our community of developers and creators sharing
                        in-depth articles, insights, and project stories. Dive
                        into topics that shape modern tech and innovation.
                    </Typography>
                    <Button
                        color="primary"
                        size="small"
                        sx={{ minWidth: "fit-content" }}
                        variant="contained"
                        onClick={() => {
                            navigate(`/auth/register`);
                        }}
                        href="#"
                    >
                        Sign up
                    </Button>
                    <Typography
                        color="text.secondary"
                        sx={{ textAlign: "center" }}
                        variant="caption"
                    >
                        By clicking &quot;Sign up&quot; you agree to our&nbsp;
                        <Link
                            onClick={() => {
                                navigate(`/terms`);
                            }}
                            href="#"
                            color="primary"
                        >
                            Terms & Conditions
                        </Link>
                        .
                    </Typography>
                </Stack>
                <StyledBox id="image" />
            </Container>
        </Box>
    );
}
