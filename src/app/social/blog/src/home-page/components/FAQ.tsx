import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const items = [
    { panel: "panel1", question: "Question 1", answer: "Answer 1" },
    { panel: "panel2", question: "Question 2", answer: "Answer 2" },
    { panel: "panel3", question: "Question 3", answer: "Answer 3" },
    { panel: "panel4", question: "Question 4", answer: "Answer 4" },
];

function AccordionItem({
    panel,
    question,
    answer,
    expanded,
    onChange,
}: {
    panel: string;
    question: string;
    answer: string;
    expanded: string[];
    onChange: (
        panel: string,
    ) => (e: React.SyntheticEvent, isExpanded: boolean) => void;
}) {
    return (
        <Accordion
            expanded={expanded.includes(panel)}
            onChange={onChange(panel)}
        >
            <AccordionSummary
                aria-controls={`${panel}d-content`}
                expandIcon={<ExpandMoreIcon />}
                id={`${panel}d-header`}
            >
                <Typography component="span" variant="subtitle2">
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    gutterBottom
                    sx={{ maxWidth: { sm: "100%", md: "70%" } }}
                    variant="body2"
                >
                    {answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default function FAQ() {
    const [expanded, setExpanded] = React.useState<string[]>([]);

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(
                isExpanded
                    ? [...expanded, panel]
                    : expanded.filter((item) => item !== panel),
            );
        };

    return (
        <Container
            id="faq"
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: { xs: 3, sm: 6 },
                pb: { xs: 8, sm: 16 },
                position: "relative",
                pt: { xs: 4, sm: 12 },
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                sx={{
                    color: "text.primary",
                    textAlign: { sm: "left", md: "center" },
                    width: { sm: "100%", md: "60%" },
                }}
            >
                Frequently asked questions
            </Typography>
            <Box sx={{ width: "100%" }}>
                {items.map((it) => (
                    <AccordionItem
                        key={it.panel}
                        panel={it.panel}
                        question={it.question}
                        answer={it.answer}
                        expanded={expanded}
                        onChange={handleChange}
                    />
                ))}
            </Box>
        </Container>
    );
}
