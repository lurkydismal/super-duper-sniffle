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
        name: "Blog",
        color: "info",
        href: "/social/blog",
    },
    {
        name: "Tasker",
        color: "warning",
        href: "/social/tasker",
    },
    {
        name: "Table",
        color: "primary",
        href: "/dashboard/table",
    },
    {
        name: "Map",
        color: "success",
        href: "/logic/map",
    },
    {
        name: "Gettier",
        color: "error",
        href: "/logic/gettier",
    },
];

export default buttons;
