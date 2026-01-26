import { useEffect, useState } from "react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { checkAuth } from "./stdfunc";
import { log } from "./stdlog";

type Props = {
    drawDurationMs?: number;
};

// TODO: Animated fill
export default function LoadingScreen({ drawDurationMs = 4800 }: Props) {
    const textRef = React.useRef<SVGTextElement | null>(null);
    const [filled, setFilled] = React.useState(false);
    const text = "LOADING";

    React.useEffect(() => {
        log.trace("LoadingScreen effect start");

        const el = textRef.current;
        if (!el) {
            log.warn("Text ref not found");

            return;
        }

        // wait for font/render then measure
        requestAnimationFrame(() => {
            const len =
                (el.getComputedTextLength && el.getComputedTextLength()) ||
                4000;

            log.trace(`Computed text length: ${len}`);

            // set CSS variables used by styled component
            el.style.setProperty("--len", String(Math.ceil(len)));
            el.style.setProperty("--draw-duration", `${drawDurationMs}ms`);

            const t = setTimeout(() => {
                (setFilled(true), drawDurationMs + 80);

                log.trace(`${text} animation completed, filled set to true`);
            });

            return () => clearTimeout(t);
        });
    }, [drawDurationMs]);

    return (
        <Root role="status" aria-live="polite">
            <StyledSvg
                viewBox="0 0 1200 300"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                focusable="false"
            >
                {/* x=50% centers horizontally. y=60% centers visually (account for font baseline). */}
                <LoadingText
                    ref={textRef}
                    filled={filled}
                    x="50%"
                    y="60%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    {text}
                </LoadingText>
            </StyledSvg>
        </Root>
    );
}

/* ---------- styled components ---------- */

const Root = styled("div")({
    position: "fixed",
    inset: 0,
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    zIndex: 9999,
    // allow svg strokes to overflow the container edges if needed
    overflow: "visible",
});

const StyledSvg = styled("svg")({
    width: "min(80vw, 1200px)",
    height: "auto",
    display: "block",
    // ensure strokes that extend past viewBox are visible
    overflow: "visible",
});

/**
 * Use explicit SVG coordinate sizes so getComputedTextLength matches the visual text.
 * viewBox is 1200x300 and fontSize is 200 (SVG units).
 */
const LoadingText = styled("text")<{ filled: boolean }>(({ filled }) => ({
    fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans"',
    fontWeight: 800,
    fontSize: 200, // SVG units (matches viewBox scale)
    // stroke/fill handled by runtime state
    fill: filled ? "#ffffff" : "none",
    stroke: filled ? "transparent" : "#ffffff",
    strokeWidth: filled ? 0 : 8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    // stroke-dash trick, --len set at runtime
    strokeDasharray: "var(--len, 2000)",
    strokeDashoffset: "var(--len, 2000)",
    paintOrder: "stroke fill",
    transition: "fill 220ms ease, stroke 220ms ease, stroke-width 220ms ease",
    animation: filled
        ? "none"
        : "draw var(--draw-duration, 2400ms) cubic-bezier(.2,.9,.2,1) forwards",
    // keyframes
    "@keyframes draw": {
        to: {
            strokeDashoffset: 0,
        },
    },
    // reduced motion
    "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
        strokeDashoffset: 0,
        fill: "#fff",
        stroke: "transparent",
        strokeWidth: 0,
    },
}));

export function ProtectedRoute() {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        log.trace("ProtectedRoute: checking auth...");

        checkAuth()
            .then((result) => {
                log.trace(`Auth result: ${result}`);

                setAuthorized(result);
            })
            .catch((err) => {
                log.error(`Auth check failed: ${err}`);

                setAuthorized(false);
            });
    }, []);

    // Not yet known
    if (authorized === null) {
        log.trace("ProtectedRoute: auth status unknown, showing LoadingScreen");

        return <LoadingScreen />;
    }

    // Not authorized
    if (!authorized) {
        log.trace("ProtectedRoute: user not authorized, redirecting to login");

        return <Navigate to="/auth/login" replace />;
    }

    // Authorized
    log.trace("ProtectedRoute: user authorized, rendering outlet");

    return <Outlet />;
}
