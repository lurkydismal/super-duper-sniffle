import mermaid from "mermaid";
import * as React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

export default function Mermaid({ chart }: { chart: string }) {
    const theme = useTheme();
    const container = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!container.current) return;

        mermaid.initialize({
            startOnLoad: false, // We render manually
            theme: theme.palette.mode === "dark" ? "dark" : "default",
        });

        const id = "mermaid-" + Math.random().toString(36).substring(2, 11);

        mermaid
            .render(id, chart)
            .then((result) => {
                container.current!.innerHTML = result.svg;
            })
            .catch((err) => {
                container.current!.innerHTML = `<pre style="color:red;">${
                    err instanceof Error ? err.message : String(err)
                }</pre>`;
            });
    }, [chart, theme]);

    return (
        <Container
            sx={{
                zoom: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
            ref={container}
        />
    );
}
