import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import { Albert_Sans } from "next/font/google";
import Providers from '@/components/Providers';

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${albertSans.className} antialiased`}>
        <Providers>
          <AntdRegistry >
            {children}
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
