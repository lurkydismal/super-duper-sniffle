import { ButtonDefinition } from "@/components/RootPageButton";

// Configuration list for buttons displayed on the main page
// Each entry defines the button label, MUI color variant, and navigation target
const buttons: ButtonDefinition[] = [
    {
        name: "Overview",
        color: "secondary",
        href: "/overview",
    },
    {
        name: "Gettier",
        color: "error",
        href: "/logic/gettier",
    },
    {
        name: "Table",
        color: "primary",
        href: "/dashboard/table",
    },
    {
        name: "Map",
        color: "info",
        href: "/logic/map",
    },
    {
        name: "Tasker",
        color: "success",
        href: "/social/tasker",
    },
    {
        name: "Blog",
        color: "warning",
        href: "/social/blog",
    },
];

export default buttons;
