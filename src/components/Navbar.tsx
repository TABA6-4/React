import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const Navbar: React.FC = () => {
    const { user, isAuthenticated, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(); // 상태 초기화 및 토큰 삭제
        navigate("/login"); // 로그인 페이지로 이동
    };

    console.log("isAuthenticated:", isAuthenticated); // 디버깅 로그 추가

    const goToLogin = () => {
        navigate("/login"); // Dashboard 페이지로 이동
    };

    const goToSignUp = () => {
        navigate("/Signup");
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>Focus</Link>
            </div>
            <ul style={styles.navLinks}>
                {isAuthenticated ? (
                    <>
                        <p>Welcome, {user?.email || "Guest"}</p>
                        <li><Link to="/planner" style={styles.link}>플래너</Link></li>
                        <li><Link to="/report" style={styles.link}>리포트</Link></li>
                        <li><Link to="/profile" style={styles.link}>마이페이지</Link></li>
                        <li>
                            <button onClick={handleLogout} style={styles.button1}>로그아웃</button>
                        </li>
                    </>
                ) : (
                    <>
                    <ul style={styles.navLinks}>
                            <li><Link to="/login" style={styles.link}>플래너</Link></li>
                            <li><Link to="/login" style={styles.link}>리포트</Link></li>
                            <li>
                                <button style={styles.button1} onClick={goToLogin}>로그인</button>
                            </li>
                            <li>
                                <button style={styles.button1} onClick={goToSignUp}>회원가입</button>
                            </li>
                        </ul>
                    </>
                )}
            </ul>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    logo:{
        fontSize: "1.5rem",
        fontWeight: "bolder",
    },
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        padding: "1rem 2rem",
        color: "#fff",
        overflow: "visible",
        boxSizing: "border-box",
    },
    navLinks: {
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem",
        margin: 0,
        padding: 0,
    },
    link: {
        color: "#000000",
        textDecoration: "none",
    },
    button: {
        background: "none",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "1rem",
    },
};

export default Navbar;