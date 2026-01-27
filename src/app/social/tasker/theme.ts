"use client";

import { extendTheme } from "@mui/joy/styles";

export default extendTheme({
    colorSchemes: {
        // light: {},
        dark: {},
    },
    fontFamily: {
        body: "var(--font-main)",
        display: "var(--font-main)",
        code: "var(--font-main)",
    },
});

// export default createTheme({
//     colorSchemes: { light: true, dark: true },
//     cssVariables: {
//         colorSchemeSelector: "class",
//     },
//     typography: {
//         fontFamily: font.style.fontFamily,
//     },
//     components: {
//         MuiAlert: {
//             styleOverrides: {
//                 root: {
//                     variants: [
//                         {
//                             props: { severity: "info" },
//                             style: {
//                                 backgroundColor: "#60a5fa",
//                             },
//                         },
//                     ],
//                 },
//             },
//         },
//     },
// });
