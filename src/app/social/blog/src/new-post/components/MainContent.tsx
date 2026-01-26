import * as React from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./Attachments";
import Review from "./Review";

interface Step {
    title: string;
    item: React.ReactElement;
}

const steps: Step[] = [
    { title: "Shipping address", item: <AddressForm /> },
    { title: "Payment details", item: <PaymentForm /> },
    { title: "Review your order", item: <Review /> },
];

export default function MainContent() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                px: { xs: 0, sm: 2 },
                // flex: 1, // let Container give it height
                // justifyContent: 'space-between', // push footer to bottom
            }}
        >
            {/* Header */}
            <Box>
                <Typography variant="h2" gutterBottom>
                    New post
                </Typography>

                {/* Desktop stepper (keeps original desktop behavior) */}
                <Box sx={{ display: { xs: "none", md: "block" }, mb: 2 }}>
                    <Stepper activeStep={activeStep} sx={{ px: 0 }}>
                        {steps.map((step) => (
                            <Step key={step.title}>
                                <StepLabel>{step.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Box>

            {/* Main content area - grows and scrolls if necessary */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flexGrow: 1,
                    minHeight: 0, // allow proper overflow within flex children
                    overflow: "auto",
                    maxHeight:
                        "calc(100dvh - var(--template-frame-height, 0px) - 220px)", // optional safeguard
                }}
            >
                {/* Mobile stepper */}
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ display: { sm: "flex", md: "none" } }}
                >
                    {steps.map((step) => (
                        <Step key={step.title}>
                            <StepLabel
                                sx={{
                                    ".MuiStepLabel-labelContainer": {
                                        maxWidth: "70px",
                                    },
                                }}
                            >
                                {step.title}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Current step content */}
                {activeStep === steps.length ? (
                    <Stack spacing={2} useFlexGap>
                        <Typography variant="h1">📦</Typography>
                        <Typography variant="h5">
                            Thank you for your order!
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            Your order number is <strong>&nbsp;#140396</strong>.
                            We have emailed your order confirmation and will
                            update you once it's shipped.
                        </Typography>
                        <Button variant="contained" sx={{ alignSelf: "start" }}>
                            Go to my orders
                        </Button>
                    </Stack>
                ) : (
                    <>{steps[activeStep].item}</>
                )}
            </Box>

            {/* Footer — buttons. With the parent using space-between, this will sit at the bottom */}
            <Box
                component="footer"
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                    // On small screens stack column-reverse (Previous above Next)
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                        activeStep !== 0 ? "space-between" : "flex-end",
                    pt: 1,
                }}
            >
                {activeStep !== 0 && (
                    // desktop "Previous"
                    <Button
                        onClick={handleBack}
                        startIcon={<ChevronLeftRoundedIcon />}
                        sx={{
                            display: { xs: "none", sm: "inline-flex" },
                        }}
                        variant="text"
                    >
                        Previous
                    </Button>
                )}
                {activeStep !== 0 && (
                    // mobile "Previous" (full width)
                    <Button
                        onClick={handleBack}
                        startIcon={<ChevronLeftRoundedIcon />}
                        sx={{
                            display: { xs: "flex", sm: "none" },
                            width: "100%",
                        }}
                        variant="outlined"
                    >
                        Previous
                    </Button>
                )}

                <Box sx={{ ml: { sm: "auto" } }}>
                    <Button
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleNext}
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                        variant="contained"
                    >
                        {activeStep === steps.length - 1
                            ? "Place order"
                            : "Next"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
