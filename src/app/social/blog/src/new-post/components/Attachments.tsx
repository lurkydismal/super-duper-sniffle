import * as React from "react";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";

export default function Attachments() {
    const [cardNumber, setCardNumber] = React.useState("");

    const handleCardNumberChange = (event: { target: { value: string } }) => {
        const value = event.target.value.replace(/\D/g, "");
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    return (
        <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "space-between",
                            width: "100%",
                            flexGrow: 1,
                        }}
                    >
                        <OutlinedInput
                            id="card-number"
                            onChange={handleCardNumberChange}
                            placeholder="Image"
                            size="small"
                            value={cardNumber}
                            endAdornment={
                                <InputAdornment position="start">
                                    <CreditCardRoundedIcon />
                                </InputAdornment>
                            }
                        />
                    </Box>
                </Card>
            </Box>
        </Stack>
    );
}
