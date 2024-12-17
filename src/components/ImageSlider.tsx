import React, { useEffect, useState } from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

// 사진 배열
const images = [
    "https://via.placeholder.com/1920x500?text=Image+1",
    "https://via.placeholder.com/1920x500?text=Image+2",
    "https://via.placeholder.com/1920x500?text=Image+3",
];

const ImageSlider: React.FC = () => {

    const navigate = useNavigate(); // 네비게이션 함수 가져오기
    const { isAuthenticated } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToLogin = () => {
        navigate("/login"); // Dashboard 페이지로 이동
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.sliderContainer}>
            {/* 이미지 컨테이너 */}
            <div style={styles.imageContainer}>
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index}`}
                        style={{
                            ...styles.image,
                            opacity: currentIndex === index ? 1 : 0,
                            transition: "opacity 1s ease-in-out",
                        }}
                    />
                ))}
                {/* 오른쪽 네모칸 */}
                <div style={styles.rightBox}>
                    {isAuthenticated ? (
                        <>
                            <h2 style={styles.boxTitle}>4조님의 오늘을 응원합니다</h2>
                            <p style={styles.boxText}>
                                더 효율적인 하루를 만들어 드립니다.
                            </p>
                            <button style={ styles.button } onClick={() => navigate("/concentration")}>측정 시작하기</button>
                        </>
                    ) : (
                        <>
                            <h2 style={styles.boxTitle}>환영합니다</h2>
                            <p style={styles.boxText}>
                                더 효율적인 하루를 만들어 드립니다.
                            </p>
                                <button style={ styles.button } onClick={goToLogin}>로그인</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    sliderContainer: {
        position: "relative", // 부모 요소
        width: "100vw",
        height: "500px",
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    image: {
        position: "absolute", // 이미지를 겹치게 배치
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "opacity 1s ease-in-out", // 부드러운 Fade 효과
        top: 0,
        left: 0,
    },
    rightBox: {
        position: "absolute", // 이미지 위에 겹침
        top: "50%",           // 세로 중앙
        right: "2rem",        // 오른쪽 여백
        transform: "translateY(-50%)", // 세로 중앙 정렬을 위한 보정
        backgroundColor: "rgba(255, 255, 255, 0.9)", // 반투명한 배경
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과
        maxWidth: "300px",     // 네모칸 최대 너비
        textAlign: "center",
        zIndex: 10,            // 이미지 위에 표시
    },
    boxTitle: {
        fontSize: "1.8rem",
        marginBottom: "1rem",
        color: "#333",
    },
    boxText: {
        fontSize: "1rem",
        color: "#555",
    },

    button:{
        width: "100%",
        color: "#ffffff",
        backgroundColor: "#007bff"
    }
};

export default ImageSlider;