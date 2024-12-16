import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode; // 페이지 내용을 감싸는 children props
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar /> {/* 내비게이션 바 추가 */}
            <main style={styles.main}>{children}</main>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    main: {
        marginTop: "80px", // 내비게이션 바 높이만큼 여백 추가
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 80px)", // 화면 높이에서 네비게이션 바 높이 제외
        backgroundColor: "#ffffff",
    },
};

export default Layout;