import "@/styles/globals.css";
import '@/styles/ShoppingCart.css';
import '@/styles/Checkout.css';
import '@/styles/MessageList.module.css';
import type { AppProps } from "next/app";
import Modal from 'react-modal';

// Make sure to import the styles if you need them
// import 'react-modal/dist/react-modal.css';

Modal.setAppElement('#__next');

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

