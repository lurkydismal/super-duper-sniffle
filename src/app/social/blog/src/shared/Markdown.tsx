import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGFM from "remark-gfm";
import remarkMath from "remark-math";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CodeBlock from "./CodeBlock";

const MarkdownComponents = {
    // Code
    code: CodeBlock,

    // Heading
    h1: ({ children }: any) => (
        <Typography variant="h3" gutterBottom>
            {children}
        </Typography>
    ),
    h2: ({ children }: any) => (
        <Typography variant="h4" gutterBottom>
            {children}
        </Typography>
    ),
    h3: ({ children }: any) => (
        <Typography variant="h5" gutterBottom>
            {children}
        </Typography>
    ),
    h4: ({ children }: any) => (
        <Typography variant="h6" gutterBottom>
            {children}
        </Typography>
    ),
    h5: ({ children }: any) => (
        <Typography variant="subtitle1" gutterBottom>
            {children}
        </Typography>
    ),
    h6: ({ children }: any) => (
        <Typography variant="subtitle2" gutterBottom>
            {children}
        </Typography>
    ),

    // Paragraph
    p: ({ children }: any) => (
        <Typography variant="subtitle1">{children}</Typography>
    ),

    // Link
    // TODO: Sanitize link maybe
    a: ({ href, children }: any) => (
        <Link href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </Link>
    ),

    // Lists
    // TODO: Ordered list
    ul: ({ children }: any) => (
        <ListItem>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    ),
    ol: ({ children }: any) => (
        <ListItem>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    ),
    li: ({ children }: any) => <List>{children}</List>,

    // Blockquote
    blockquote: ({ children }: any) => (
        <Typography
            component="blockquote"
            sx={{
                borderLeft: "4px solid",
                paddingLeft: 2,
                color: "text.secondary",
                fontStyle: "italic",
            }}
        >
            {children}
        </Typography>
    ),

    // Horizontal rule
    hr: () => <Divider sx={{ borderColor: "#ccc", margin: "16px 0" }} />,

    // Image
    img: ({ src, alt }: any) => (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <CardMedia
                component="img"
                image={src}
                alt={alt}
                sx={{
                    minWidth: "10%",
                    maxWidth: "50%",
                    borderRadius: 4,
                }}
            />
        </Container>
    ),

    // remark-gfm
    // Table
    table: ({ children }: any) => (
        <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                {children}
            </Table>
        </TableContainer>
    ),
    thead: ({ children }: any) => <TableHead>{children}</TableHead>,
    tbody: ({ children }: any) => <TableBody>{children}</TableBody>,
    tr: ({ children }: any) => <TableRow>{children}</TableRow>,
    th: ({ children }: any) => <TableCell>{children}</TableCell>,
    td: ({ children }: any) => <TableCell>{children}</TableCell>,

    del: ({ node, ...props }: any) => <del {...props}></del>,
};

export default function Markdown({ children }: { children: string }) {
    return (
        <Box
            sx={{
                typography: "subtitle1",
                "& math": {
                    fontSize: "1.8rem",
                },
            }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGFM, remarkMath]}
                rehypePlugins={[[rehypeKatex, { output: "mathml" }]]}
                components={{ ...MarkdownComponents }}
            >
                {children}
            </ReactMarkdown>
        </Box>
    );
}
