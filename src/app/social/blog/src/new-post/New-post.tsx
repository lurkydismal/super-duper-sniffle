import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme, { AppThemeProps } from '../shared-theme/AppTheme';
import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';
import MainContent from './components/MainContent';

export default function NewPost(props: AppThemeProps) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <NavBar />
            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // center horizontally
                    justifyContent: 'flex-start',
                    mt: 16,
                    marginBottom: 5,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 3, sm: 6 },
                    gap: 4,
                }}
            >
                <MainContent />
            </Container>
            <Footer />
        </AppTheme>
    );
}
