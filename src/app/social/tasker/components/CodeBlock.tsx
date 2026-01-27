"use client";

import * as React from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
// TODO: Maybe import Light version instead
import {
    oneDark as darkTheme,
    oneLight as lightTheme,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Mermaid from "./Mermaid";
import { gray } from "@/shared-theme/themePrimitives";

export default function CodeBlock({
    inline,
    className,
    children,
    ...props
}: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    node?: unknown;
    [key: string]: any;
}) {
    const theme = useTheme();

    // Detect language dynamically
    const match = /language-(\w+)/.exec(className || "");

    if (inline || !match) {
        return (
            <Typography
                {...props}
                component="code"
                sx={[
                    (_) => ({
                        fontSize: "0.875rem",
                        borderRadius: 1,
                        px: 1,
                        py: 0,
                        backgroundColor: gray[200],
                        color: gray[900],
                    }),
                    (theme) =>
                        theme.applyStyles("dark", {
                            backgroundColor: gray[800],
                            color: gray[100],
                        }),
                ]}
            >
                {children}
            </Typography>
        );
    }

    const lang = match[1];

    if (lang === "mermaid") {
        return <Mermaid chart={String(children).trim()} />;
    }

    const text = Array.isArray(children) ? children.join("") : String(children);
    const trimmed = text.trimEnd();
    const lineAmount = trimmed.split("\n").length;

    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        if (!copied) return;

        const t = setTimeout(() => setCopied(false), 2000);

        return () => clearTimeout(t);
    }, [copied]);

    const copyToClipboard = async (s: string) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(s);

                setCopied(true);

                return;
            } catch {
                setCopied(false);
            }
        }
    };

    return (
        <Box position="relative" sx={{ mt: 2, mb: 2 }}>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    gap: 1,
                    position: "absolute",
                    right: 8,
                    top: 8,
                    zIndex: 3,
                }}
            >
                <Tooltip title={copied ? "Copied" : "Copy"} arrow>
                    <IconButton
                        aria-label="Copy code"
                        onClick={() => copyToClipboard(trimmed)}
                        size="small"
                        sx={[
                            (_) => ({
                                bgcolor: "rgba(0,0,0,0.04)",
                                "&:hover": {
                                    bgcolor: "rgba(0,0,0,0.08)",
                                },
                            }),
                            (theme) =>
                                theme.applyStyles("dark", {
                                    bgcolor: "rgba(255,255,255,0.04)",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.06)",
                                    },
                                }),
                        ]}
                    >
                        {copied ? (
                            <CheckIcon fontSize="small" />
                        ) : (
                            <ContentCopyIcon fontSize="small" />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <SyntaxHighlighter
                {...props}
                PreTag="div"
                language={lang}
                showLineNumbers={lineAmount > 1}
                style={
                    // TODO: Improve
                    theme.palette.mode === "dark" ? darkTheme : lightTheme
                }
            >
                {trimmed}
            </SyntaxHighlighter>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                autoHideDuration={2000}
                message="Copied to clipboard"
                onClose={() => setCopied(false)}
                open={copied}
                slotProps={{
                    content: {
                        sx: [
                            (_) => ({
                                backgroundColor: gray[200],
                                color: gray[900],
                                border: `1px solid ${gray[300]}`,
                                fontWeight: 500,
                            }),
                            (theme) =>
                                theme.applyStyles("dark", {
                                    backgroundColor: gray[800],
                                    color: gray[100],
                                    border: `1px solid ${gray[700]}`,
                                }),
                        ],
                    },
                }}
            />
        </Box>
    );
}
