import {createRoot} from 'react-dom/client'
import {createInertiaApp} from '@inertiajs/inertia-react'

import {Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', {eager: true})
        return pages[`./Pages/${name}.jsx`]
    },
    setup({el, App, props}) {
        const Root = () => {
            const darkTheme = createTheme({
                palette: {
                    mode: 'dark',
                },
            });

            return (
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline/>
                    <Container style={{marginTop: '1%'}}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <App {...props} />
                        </Typography>
                    </Container>
                </ThemeProvider>
            );
        };

        createRoot(el).render(<Root/>)
    },
})

