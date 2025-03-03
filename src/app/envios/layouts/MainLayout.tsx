"use client";

import { Layout } from "antd";
import Image from "next/image";


const { Header, Content } = Layout;


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Image src="/boxful.gif" alt="Login" width={50} height={50} />
            </Header>



            <Content style={{ padding: "0 48px" }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,

                        borderRadius: 8,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    );
}
