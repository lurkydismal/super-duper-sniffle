import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const githubUrl = import.meta.env.VITE_GITHUB_LINK;

export function CopyrightAligned() {
    return (
        <Typography
            align="center"
            variant="body2"
            sx={{
                color: "text.secondary",
            }}
        >
            {"Copyright © "}
            <Link color="inherit" href={githubUrl}>
                LurkyDismal
            </Link>
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}

export function Copyright() {
    return (
        <Typography
            variant="body2"
            sx={{
                color: "text.secondary",
                mt: 1,
            }}
        >
            {"Copyright © "}
            <Link color="inherit" href={githubUrl}>
                LurkyDismal
            </Link>
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}
