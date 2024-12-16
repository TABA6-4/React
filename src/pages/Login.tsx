import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // JWT 디코딩을 위해 추가
import axios from "axios"; // API 호출을 위해 추가

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext에서 로그인 상태 변경
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>(""); // 에러 상태 추가

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://3.38.191.196/api/sign-in", {
                email,
                password,
            });

            // JWT 토큰 받아오기
            const { accessToken } = response.data;

            // JWT 디코딩
            const decodedToken: any = jwtDecode(accessToken);
            console.log("Decoded Token:", decodedToken);

            // AuthContext에 로그인 상태 저장
            login(accessToken);

            // 홈 화면으로 이동
            navigate("/");
        } catch (err: any) {
            setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
            console.error("Login Error:", err.response || err.message);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1 style={styles.heading}>로그인</h1>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.inputGroup}>
                    <label style={styles.labelingText}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.labelingText}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>
                    로그인
                </button>
                <button style={styles.button2} onClick={() => navigate("/register")}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
    },
    form: {
        padding: "2rem",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box",
    },
    heading: {
        marginBottom: "1.5rem",
        textAlign: "center",
        fontSize: "1.8rem",
    },
    error: {
        color: "red",
        marginBottom: "1rem",
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: "1rem",
    },
    input: {
        width: "100%",
        padding: "0.8rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        boxSizing: "border-box",
    },
    button: {
        width: "100%",
        padding: "0.8rem",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "#fff",
        fontSize: "1rem",
        cursor: "pointer",
        border: "none",
    },
    button2: {
        width: "100%",
        marginTop: "0.5rem",
        padding: "0.8rem",
        borderRadius: "4px",
        backgroundColor: "#f8f9fa",
        color: "#000",
        fontSize: "1rem",
        cursor: "pointer",
        border: "none",
    },
    labelingText: {
        fontSize: "1rem",
        color: "#999999",
    },
};

export default Login;
