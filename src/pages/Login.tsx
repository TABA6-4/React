import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    // 로그인 처리 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://3.38.191.196/api/sign-in", {
                email: email,
                password: password
            });

            console.log("Login Response:", response);

            const { accessToken, refreshToken, userId } = response.data;

            // AuthContext의 loginUser 함수 호출
            await loginUser(email, password);

            // 홈 화면으로 이동
            navigate("/");
        } catch (error) {
            alert("로그인 실패. 이메일과 비밀번호를 확인하세요.");
            console.error("Login error:", error);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1 style={styles.heading}>로그인</h1>
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
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>
                    로그인
                </button>
                <button
                    style={styles.button2}
                    onClick={() => navigate("/register")} // 회원가입 페이지로 이동
                    type="button"
                >
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
        width: "100%", // 입력 필드 너비를 폼 너비에 맞춤
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
        color: "#999999"
    }
};
export default Login;