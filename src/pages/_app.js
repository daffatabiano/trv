import BaseLayout from '@/layout/BaseLayout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <BaseLayout>
            <Component {...pageProps} />
        </BaseLayout>
    );
}
