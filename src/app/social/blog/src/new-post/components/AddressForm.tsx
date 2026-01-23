import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function AddressForm() {
    return (
        <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    autoComplete="first name"
                    id="first-name"
                    name="first-name"
                    placeholder="John"
                    required
                    size="small"
                    type="name"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    autoComplete="last name"
                    id="last-name"
                    name="last-name"
                    placeholder="Snow"
                    required
                    size="small"
                    type="last-name"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address1" required>
                    Address line 1
                </FormLabel>
                <OutlinedInput
                    autoComplete="shipping address-line1"
                    id="address1"
                    name="address1"
                    placeholder="Street name and number"
                    required
                    size="small"
                    type="address1"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address2">Address line 2</FormLabel>
                <OutlinedInput
                    autoComplete="shipping address-line2"
                    id="address2"
                    name="address2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    required
                    size="small"
                    type="address2"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    autoComplete="City"
                    id="city"
                    name="city"
                    placeholder="New York"
                    required
                    size="small"
                    type="city"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="state" required>
                    State
                </FormLabel>
                <OutlinedInput
                    autoComplete="State"
                    id="state"
                    name="state"
                    placeholder="NY"
                    required
                    size="small"
                    type="state"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                </FormLabel>
                <OutlinedInput
                    autoComplete="shipping postal-code"
                    id="zip"
                    name="zip"
                    placeholder="12345"
                    required
                    size="small"
                    type="zip"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="country" required>
                    Country
                </FormLabel>
                <OutlinedInput
                    autoComplete="shipping country"
                    id="country"
                    name="country"
                    placeholder="United States"
                    required
                    size="small"
                    type="country"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </FormGrid>
        </Grid>
    );
}
