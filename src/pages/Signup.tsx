import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const navigate = useNavigate();

    // 상태 변수 설정
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    // 폼 제출 핸들러
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // 비밀번호 일치 확인
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // 여기서 백엔드로 회원가입 데이터를 전송할 수 있습니다.
        console.log("Email:", email);
        console.log("Password:", password);

        // 성공적으로 회원가입 후, 로그인 페이지로 이동
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1 style={styles.heading}>회원가입</h1>

                {/* 에러 메시지 */}
                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.inputGroup}>
                    <label style={styles.labelingText}>Email</label>
                    <div style={{display: "flex", gap: "0.5rem"}}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <button type="button" style={styles.buttonInline}>
                            중복 확인
                        </button>
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.labelingText}>Name</label>
                    <div style={{display: "flex", gap: "0.5rem"}}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <button type="button" style={styles.buttonInline}>
                            중복 확인
                        </button>
                    </div>
                </div>

                <div style={styles.inputRow}>
                    <div style={{flex: "1"}}>
                        <label style={styles.labelingText}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={{flex: "1"}}>
                        <label style={styles.labelingText}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                </div>

                <button type="submit" style={styles.button}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

// 스타일 객체
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
    },

    inputRow: {
        display: "flex",         // 수평 배치
        gap: "1rem",             // 입력칸 사이의 간격
        marginBottom: "1rem",    // 입력칸 아래 여백
        width: "100%",
    },

    inputContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1rem",
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column", // 입력 필드를 세로로 배치
        gap: "0.5rem",           // 라벨과 입력칸 사이 간격
        marginBottom: "1rem",
        width: "100%",           // 너비를 폼에 맞게 설정
    },

    input: {
        flex: "1",               // 두 입력칸이 동일한 너비를 차지하도록 설정
        padding: "0.8rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        boxSizing: "border-box",
        width: "100%",           // 너비를 폼에 맞게 설정
    },
    buttonInline: {
        padding: "0.8rem",
        backgroundColor: "#f8f9fa",
        color: "#000000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
        width: "30%",            // 버튼의 너비를 조절
        alignSelf: "flex-end",   // 버튼을 오른쪽으로 정렬
    },

    form: {
        padding: "2rem",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "500px",
        boxSizing: "border-box",
    },

    heading: {
        marginBottom: "1.5rem",
        textAlign: "center",
        fontSize: "1.8rem",
        color: "#333",
    },

    error: {
        color: "red",
        marginBottom: "1rem",
        textAlign: "center",
    },

    button: {
        width: "100%",
        padding: "0.8rem",
        borderRadius: "4px",
        backgroundColor: "#28a745",
        color: "#fff",
        fontSize: "1rem",
        cursor: "pointer",
        border: "none",
    },

    labelingText: {
        fontSize: "1rem",
        color: "#999999"
    }
};

export default Signup;