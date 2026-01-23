import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme, { AppThemeProps } from '../shared-theme/AppTheme';
import Footer from '../shared/Footer';
import FAQ from './components/FAQ';
import Features from './components/Features';
import Hero from './components/Hero';

export default function HomePage(props: AppThemeProps) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <Hero />
            <div>
                <Features />
                <Divider />
                <FAQ />
                <Divider />
                <Footer />
            </div>
        </AppTheme>
    );
}
