import "../styles/globals.css";

import type { AppProps } from "next/app";
import Link from "next/link";
import Menu from "@rodrigosaint/menu";
import PageFrame from "@rodrigosaint/page-frame";
import { ThemeProvider } from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{}}>
      <PageFrame
        header={
          <Menu logo={<span>LOGO</span>}>
            <Link href="/about-us">
              <a>About us</a>
            </Link>
          </Menu>
        }
      >
        <Component {...pageProps} />
      </PageFrame>
    </ThemeProvider>
  );
}
export default MyApp;
