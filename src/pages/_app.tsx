import "@/styles/globals.css";
import '@/styles/ShoppingCart.css';
import '@/styles/Checkout.css';
import '@/styles/MessageList.module.css';
import '@/styles/vendorDashboard.module.css'
import type { AppProps } from "next/app";
import Modal from 'react-modal';
import Script from 'next/script'
import { useEffect } from "react";
import { useRouter } from 'next/router'
import * as gtag from '../../lib/gtag'

Modal.setAppElement('#__next');

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
  <Component {...pageProps} />;
  </>
  )
}

