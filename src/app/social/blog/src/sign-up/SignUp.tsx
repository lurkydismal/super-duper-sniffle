import * as React from "react";
import * as ReactHook from "react-hook-form";
import * as ReactRouter from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppTheme, { AppThemeProps } from "../shared-theme/AppTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CopyrightAligned as Copyright } from "../shared/Copyright";
import { isDev } from "../stdvar";
import { sendRequest, storeCredentials } from "../stdfunc";
import { styled } from "@mui/material/styles";
import { log } from "../stdlog";

const Card = styled(MuiCard)(({ theme }) => ({
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    margin: "auto",
    padding: theme.spacing(4),
    width: "100%",
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    [theme.breakpoints.up("sm")]: {
        width: "450px",
    },
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    position: "relative",
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        inset: 0,
        position: "absolute",
        zIndex: -1,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

type FormValues = {
    username: string;
    password: string;
};

export default function SignUp(props: AppThemeProps) {
    log.trace("SignUp component render");

    const navigate = ReactRouter.useNavigate();
    const { control, handleSubmit } = ReactHook.useForm<FormValues>();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: FormValues) => {
        log.trace(`onSubmit called: '${data}'`);

        setLoading(true);

        try {
            if (!isDev) {
                const json = await sendRequest("auth/register", {
                    username: data.username,
                    password: data.password,
                });

                storeCredentials(json);
            }

            navigate("/posts");

            log.trace("onSubmit finished");
        } catch (err) {
            log.error(`onSubmit error: '${err}'`);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        log.trace("SignUp component mounted");

        return () => {
            log.trace("SignUp component unmounted");
        };
    }, []);

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                        }}
                    >
                        <ReactHook.Controller
                            name="username"
                            control={control}
                            rules={{
                                required: "Username is required",
                                minLength: {
                                    value: 6,
                                    message: "Min 6 characters",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                log.trace(
                                    `Rendering username field: '${field}'`,
                                );

                                return (
                                    <FormControl>
                                        <FormLabel htmlFor="username">
                                            Username
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            autoComplete="username"
                                            autoFocus
                                            color={
                                                Boolean(fieldState.error)
                                                    ? "error"
                                                    : "primary"
                                            }
                                            error={Boolean(fieldState.error)}
                                            fullWidth
                                            helperText={
                                                fieldState.error?.message
                                            }
                                            id="username"
                                            name="username"
                                            placeholder="tralalero"
                                            required
                                            type="text"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                );
                            }}
                        />
                        <ReactHook.Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Min 8 characters",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                log.trace(
                                    `Rendering password field: '${field}'`,
                                );

                                return (
                                    <FormControl>
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            autoComplete="new-password"
                                            color={
                                                Boolean(fieldState.error)
                                                    ? "error"
                                                    : "primary"
                                            }
                                            error={Boolean(fieldState.error)}
                                            fullWidth
                                            helperText={
                                                fieldState.error?.message
                                            }
                                            id="password"
                                            name="password"
                                            placeholder="••••••"
                                            required
                                            type="password"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                );
                            }}
                        />
                        <Button
                            endIcon={<AccountCircle />}
                            fullWidth
                            loading={loading}
                            type="submit"
                            variant="outlined"
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: "text.secondary" }}>
                            or
                        </Typography>
                    </Divider>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography sx={{ textAlign: "center" }}>
                            Already have an account?{" "}
                            <Link
                                onClick={() => {
                                    log.trace("Navigate to login");

                                    navigate(`/auth/login`);
                                }}
                                href="#"
                                sx={{ alignSelf: "center" }}
                                variant="body2"
                            >
                                Sign in
                            </Link>
                        </Typography>
                        <Copyright />
                    </Box>
                </Card>
            </SignUpContainer>
        </AppTheme>
    );
}
