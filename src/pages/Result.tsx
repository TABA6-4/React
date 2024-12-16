import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { content, uptime } = location.state || { content: "없음", uptime: 0 };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>측정 결과</h1>
            <div style={styles.resultContainer}>
                <p style={styles.resultText}>
                    측정한 컨텐츠: <strong>{content}</strong>
                </p>
                <p style={styles.resultText}>
                    집중 시간: <strong>{uptime}초</strong>
                </p>
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate("/")}>
                    메인으로 돌아가기
                </button>
                <button style={styles.button} onClick={() => navigate("/concentration")}>
                    새로 측정하기
                </button>
                <button style={styles.button} onClick={() => navigate("/report")}>
                    리포트
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "2rem", // 제목 아래 간격 추가
    },
    resultContainer: {
        marginBottom: "2rem", // 결과 텍스트 아래 간격
    },
    resultText: {
        fontSize: "1.5rem",
        margin: "0.5rem 0", // 텍스트 간격
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem", // 버튼 간 간격 설정
    },
    button: {
        padding: "1rem 2rem",
        backgroundColor: "#4D9DE0",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
    },
};

export default Result;