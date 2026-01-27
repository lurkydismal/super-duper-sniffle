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
import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";
import { FormControlLabel, Switch, Select, MenuItem, Button } from "@mui/material";
import prettier from "prettier";
import { parse } from "@babel/parser";

/**
 * Infer a Prettier config from JS/TS code.
 * @param code - The source code string to analyze.
 * @param onlyNonDefault - If true, omit options that equal Prettier defaults.
 * @returns An object of inferred Prettier options.
 */
function inferPrettierConfig(code: string, onlyNonDefault = false): Record<string, any> {
    const config: Record<string, any> = {};
    const lines = code.split(/\r?\n/);

    // Helper: Prettier defaults for comparison
    const defaults = {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        quoteProps: "as-needed",
        trailingComma: "all",
        bracketSpacing: true,
        arrowParens: "always",
        proseWrap: "preserve",
    };

    // 1. Detect indentation style
    // Check if any line starts with a tab
    const hasTabs = lines.some(line => /^\t+/.test(line));
    const hasSpaces = lines.some(line => /^ +/.test(line));
    if (hasTabs && !hasSpaces) {
        config.useTabs = true;
    } else if (!hasTabs && hasSpaces) {
        config.useTabs = false;
        // Determine tabWidth by minimum indent (ignore 0 indent)
        const indents = lines
            .map(line => line.match(/^ +/)?.[0].length || 0)
            .filter(n => n > 0);
        if (indents.length > 0) {
            const minIndent = Math.min(...indents);
            if (minIndent && minIndent !== defaults.tabWidth) {
                config.tabWidth = minIndent;
            }
        }
    }
    // 2. Detect semicolons at end of statements
    const semiCount = lines.filter(line => line.trim().endsWith(";")).length;
    const noSemiCount = lines.filter(line => {
        const t = line.trim();
        return t && !t.endsWith(";") && !t.endsWith("}") && !t.startsWith("import") && !t.startsWith("//");
    }).length;
    if (semiCount < noSemiCount) {
        // More lines without semicolons -> likely no semicolons preferred
        config.semi = false;
    } else {
        config.semi = true;
    }

    // 3. Detect quote style
    // Count unescaped single vs double quotes
    const singleQuotes = (code.match(/(?<!\\)'/g) || []).length;
    const doubleQuotes = (code.match(/(?<!\\)"/g) || []).length;
    config.singleQuote = singleQuotes > doubleQuotes;

    // 4. Detect object property quotes (quoteProps)
    // Using Babel parser to examine object keys
    let ast;
    try {
        ast = parse(code, {
            sourceType: "module",
            plugins: ["jsx", "typescript"],
        });
    } catch {
        ast = null;
    }
    if (ast) {
        let quotedKeys = 0, unquotedKeys = 0;
        const stack: any[] = [ast];
        while (stack.length) {
            const node = stack.pop();
            if (!node || typeof node !== "object") continue;
            if (node.type === "ObjectExpression") {
                for (const prop of node.properties || []) {
                    if (prop.type === "ObjectProperty") {
                        if (prop.key.type === "StringLiteral" || prop.key.type === "Literal") {
                            quotedKeys++;
                        } else if (prop.key.type === "Identifier") {
                            unquotedKeys++;
                        }
                    }
                }
            }
            // traverse AST recursively
            for (const key of Object.keys(node)) {
                const child = node[key];
                if (Array.isArray(child)) {
                    for (const c of child) stack.push(c);
                } else if (typeof child === "object") {
                    stack.push(child);
                }
            }
        }
        if (quotedKeys > 0 && unquotedKeys === 0) {
            config.quoteProps = "consistent";
        } else if (quotedKeys > 0 && unquotedKeys > 0) {
            config.quoteProps = "preserve";
        } else {
            // no quoted keys -> as-needed (default)
            config.quoteProps = "as-needed";
        }
    }

    // 5. Detect trailing commas
    // Simple heuristic: look for ",]" or ",}" patterns
    // TODO: Improve
    const trailingCommaRegex = /,\s*[\]\}]/m;
    config.trailingComma = trailingCommaRegex.test(code) ? "all" : "none";

    // 6. Detect bracket spacing in object literals
    // Look for "{foo:" vs "{ foo:"
    const bracketSpacing = /\{\w/.test(code); // true if "{foo"
    if (bracketSpacing) {
        config.bracketSpacing = false;
    } else {
        config.bracketSpacing = true;
    }

    // 7. Detect arrow function parentheses
    // If any arrow function has a single param without parentheses => "avoid"
    const arrowParamRegex = /\b[\w]+\s*=>/m;
    const arrowParenRegex = /\(\s*[\w]+\s*\)\s*=>/m;
    if (arrowParamRegex.test(code) && !arrowParenRegex.test(code)) {
        config.arrowParens = "avoid";
    } else {
        config.arrowParens = "always";
    }

    // 8. Detect print width (use longest line or default)
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    if (longestLine > defaults.printWidth) {
        // Round up to nearest 10 for readability
        config.printWidth = Math.ceil(longestLine / 10) * 10;
    } else if (!onlyNonDefault) {
        // Optionally include default
        config.printWidth = defaults.printWidth;
    }

    // 9. Prose wrap (default preserve, no change needed)

    // Remove defaults if requested
    if (onlyNonDefault) {
        for (const [key, value] of Object.entries(config)) {
            if (defaults[key as keyof typeof defaults] === value) {
                delete config[key];
            }
        }
    }
    return config;
}

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
            // const result = prettier.format(code, {
            //     parser: "babel-ts",
            //     plugins: [parserBabel, parserTypescript],
            //     singleQuote: true,
            //     useTabs,
            //     tabWidth: 4,
            // });
            // setFormattedCode(await result);
            const inferred = inferPrettierConfig(code);
            console.log(inferred);
            setFormattedCode(JSON.stringify(inferred, null, 4));
        } catch (err) {
            console.error("Formatting error:", err);
        }
    };

    return (
        <Box px={2} py={3}>
            <Grid container spacing={2}>
                {/* Left Editor */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ height: "80vh", p: 1 }}>
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
                    <Paper elevation={3} sx={{ height: "80vh", p: 1 }}>
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
