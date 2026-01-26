"use client";
// export default function Layout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     const isDark = true;
//
//     const containerBg = isDark
//         ? "bg-gray-900 text-gray-100"
//         : "bg-gray-50 text-gray-900";
//
//     return (
//         <main
//             className={`min-h-screen flex items-center justify-center ${containerBg} p-8 select-none`}
//         >
//             {children}
//         </main>
//     );
// }

import { Box, Grid, Paper, SelectChangeEvent, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";
import { FormControlLabel, Switch, Select, MenuItem, Button } from "@mui/material";

export default function Playground() {
    const [code, setCode] = useState(`const x = 1`);
    const [useTabs, setUseTabs] = useState(false);
    const [printWidth, setPrintWidth] = useState(80);
    const [formattedCode, setFormattedCode] = useState(code);

    const toggleUseTabs = () => {
        setUseTabs(!useTabs);
    };

    const handleWidthChange = (event: SelectChangeEvent<number>) => {
        setPrintWidth(event.target.value);
    };

    const formatCode = async () => {
        try {
            // FIX: ConfigError: Couldn't find plugin for AST format "estree". Plugins must be explicitly added to the standalone bundle.
            const result = prettier.format(code, {
                parser: "babel-ts",
                plugins: [parserBabel, parserTypescript],
                singleQuote: true,
                useTabs,
                tabWidth: 4,
            });
            setFormattedCode(await result);
        } catch (err) {
            console.error("Formatting error:", err);
        }
    };

    return (
        <Box px={2} py={3}>
            <Typography variant="h4" mb={2}>
                My Prettier‑like Playground
            </Typography>

            <Grid container spacing={2}>
                {/* Left Editor */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ height: "60vh", p: 1 }}>
                        {/* Code Editor component goes here */}
                        <CodeMirror
                            theme='dark'
                            value={code}
                            height="100%"
                            extensions={[basicSetup, javascript({ typescript: true })]}
                            onChange={(value) => setCode(value)}
                        />
                    </Paper>
                </Grid>

                {/* Right Output */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ height: "60vh", p: 1 }}>
                        {/* Formatted code or result preview */}
                        <CodeMirror
                            theme='dark'
                            value={formattedCode}
                            height="100%"
                            extensions={[basicSetup, javascript({ typescript: true })]}
                            editable={false} // make it read-only
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* Options Panel */}
            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                {/* Add toggles, selects, buttons here */}
                <Box>
                    <FormControlLabel
                        control={<Switch checked={useTabs} onChange={toggleUseTabs} />}
                        label="Use Tabs"
                    />

                    <Select value={printWidth} onChange={handleWidthChange}>
                        <MenuItem value={80}>80</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={120}>120</MenuItem>
                    </Select>

                    <Button variant="contained" onClick={formatCode}>
                        Format
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
