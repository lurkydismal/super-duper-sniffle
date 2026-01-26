import * as React from "react";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import LocalOfferRounded from "@mui/icons-material/LocalOfferRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const items = [
    {
        description: "Tag-based discovery for topics and technologies.",
        icon: <LocalOfferRounded />,
        imageDark: `url(/static/images/dash-dark.png)`,
        imageLight: `url(/static/images/dash-light.png)`,
        title: "Tag",
    },
    {
        description:
            "User profiles showcasing authors’ expertise and contributions.",
        icon: <AccountCircleRounded />,
        imageDark: `url(/static/images/mobile-dark.png)`,
        imageLight: `url(/static/images/mobile-light.png)`,
        title: "Profiles",
    },
    {
        description: "Responsive design for seamless reading on any device.",
        icon: <DevicesRoundedIcon />,
        imageDark: `url(/static/images/devices-dark.png)`,
        imageLight: `url(/static/images/devices-light.png)`,
        title: "Available on all platforms",
    },
];

interface ChipProps {
    selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
    variants: [
        {
            props: ({ selected }) => !!selected,
            style: {
                background:
                    "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
                color: "hsl(0, 0%, 100%)",
                borderColor: (theme.vars || theme).palette.primary.light,
                "& .MuiChip-label": {
                    color: "hsl(0, 0%, 100%)",
                },
                ...theme.applyStyles("dark", {
                    borderColor: (theme.vars || theme).palette.primary.dark,
                }),
            },
        },
    ],
}));

interface MobileLayoutProps {
    handleItemClick: (index: number) => void;
    selectedFeature: (typeof items)[0];
    selectedItemIndex: number;
}

export function MobileLayout({
    selectedItemIndex,
    handleItemClick,
    selectedFeature,
}: MobileLayoutProps) {
    if (!items[selectedItemIndex]) {
        return null;
    }

    return (
        <Box
            sx={{
                display: { xs: "flex", sm: "none" },
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
                {items.map(({ title }, index) => (
                    <Chip
                        key={index}
                        label={title}
                        onClick={() => handleItemClick(index)}
                        selected={selectedItemIndex === index}
                        size="medium"
                    />
                ))}
            </Box>
            <Card variant="outlined">
                <Box
                    sx={(theme) => ({
                        backgroundImage: "var(--items-imageLight)",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        mb: 2,
                        minHeight: 280,
                        ...theme.applyStyles("dark", {
                            backgroundImage: "var(--items-imageDark)",
                        }),
                    })}
                    style={
                        items[selectedItemIndex]
                            ? ({
                                  "--items-imageDark":
                                      items[selectedItemIndex].imageDark,
                                  "--items-imageLight":
                                      items[selectedItemIndex].imageLight,
                              } as any)
                            : {}
                    }
                />
                <Box sx={{ px: 2, pb: 2 }}>
                    <Typography
                        gutterBottom
                        sx={{ color: "text.primary", fontWeight: "medium" }}
                    >
                        {selectedFeature.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 1.5 }}
                    >
                        {selectedFeature.description}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index: number) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
            <Box sx={{ width: { sm: "100%", md: "60%" } }}>
                <Typography
                    component="h2"
                    gutterBottom
                    sx={{ color: "text.primary" }}
                    variant="h4"
                >
                    Features
                </Typography>
                <Typography
                    sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
                    variant="body1"
                >
                    Our platform offers a clean, developer-focused space for
                    publishing and discovering technical articles.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row-reverse" },
                    gap: 2,
                }}
            >
                <div>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            flexDirection: "column",
                            gap: 2,
                            height: "100%",
                        }}
                    >
                        {items.map(({ icon, title, description }, index) => (
                            <Box
                                component={Button}
                                key={index}
                                onClick={() => handleItemClick(index)}
                                sx={[
                                    (theme) => ({
                                        height: "100%",
                                        p: 2,
                                        width: "100%",
                                        "&:hover": {
                                            backgroundColor: (
                                                theme.vars || theme
                                            ).palette.action.hover,
                                        },
                                    }),
                                    selectedItemIndex === index && {
                                        backgroundColor: "action.selected",
                                    },
                                ]}
                            >
                                <Box
                                    sx={[
                                        {
                                            alignItems: "left",
                                            color: "text.secondary",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                            textAlign: "left",
                                            textTransform: "none",
                                            width: "100%",
                                        },
                                        selectedItemIndex === index && {
                                            color: "text.primary",
                                        },
                                    ]}
                                >
                                    {icon}

                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <MobileLayout
                        handleItemClick={handleItemClick}
                        selectedFeature={selectedFeature}
                        selectedItemIndex={selectedItemIndex}
                    />
                </div>
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        height: "var(--items-image-height)",
                        width: { xs: "100%", md: "70%" },
                    }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            height: "100%",
                            pointerEvents: "none",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={(theme) => ({
                                backgroundImage: "var(--items-imageLight)",
                                backgroundSize: "contain",
                                height: 500,
                                m: "auto",
                                width: 420,
                                ...theme.applyStyles("dark", {
                                    backgroundImage: "var(--items-imageDark)",
                                }),
                            })}
                            style={
                                items[selectedItemIndex]
                                    ? ({
                                          "--items-imageDark":
                                              items[selectedItemIndex]
                                                  .imageDark,
                                          "--items-imageLight":
                                              items[selectedItemIndex]
                                                  .imageLight,
                                      } as any)
                                    : {}
                            }
                        />
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}
