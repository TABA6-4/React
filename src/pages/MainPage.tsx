import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 추가

const MainPage: React.FC = () => {
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [selectedContent, setSelectedContent] = useState<string | null>(null); // 선택된 컨텐츠
    const [inputValue, setInputValue] = useState(""); // 직접 입력 값
    const [uptime, setUptime] = useState<number>(0); // 업타임 (초 단위)
    const [currentTime, setCurrentTime] = useState<string>(""); // 현재 시간
    const plannerItems = ["마더텅 비문학 3지문", "수학 문제집 풀기", "영어 단어 암기"];
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 참조
    const navigate = useNavigate(); // 페이지 이동 훅 추가


    // 현재 날짜 가져오기
    const currentDate = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    });

    // 시간 및 업타임 업데이트
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
        };
        updateClock(); // 즉시 실행
        const clockInterval = setInterval(() => {
            updateClock();
            setUptime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(clockInterval);
    }, []);

    // 선택된 컨텐츠 반영
    const handleContentSelect = (content: string) => {
        setSelectedContent(content);
        setInputValue(""); // 직접 입력 필드를 비움
    };

    // 입력 필드 값 변경 시 selectedContent 업데이트
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setSelectedContent(value.trim() ? value : null); // 값이 비어있지 않으면 반영
    };

    // 입력 필드 활성화 시 선택된 항목 해제
    const handleInputFocus = () => {
        setSelectedContent(null); // 선택된 항목 해제
    };

    // 측정 시작
    const handleStartMeasurement = () => {
        if (selectedContent) setIsMeasuring(true);
    };


    // 측정 종료
    // 측정 종료 및 페이지 이동
    const handleStopMeasurement = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream)
                .getTracks()
                .forEach((track) => track.stop());
        }

        // Result 페이지로 이동하며 state에 데이터 전달
        navigate("/result", { state: { content: selectedContent, uptime } });
    };


    // 버튼 활성화 조건: 플래너 항목 선택 또는 입력 필드에 값이 채워졌을 때
    const isButtonEnabled = selectedContent || inputValue.trim();

    // 다른 부분 클릭 시 선택 해제
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(e.target as Node)
        ) {
            setSelectedContent(null);
        }
    };

    // 웹캠 스트림 설정
    useEffect(() => {
        if (isMeasuring && videoRef.current) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => (videoRef.current!.srcObject = stream))
                .catch((err) => console.error("Error accessing webcam:", err));
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, [isMeasuring]);



    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);



    return (
        <div style={styles.container}>
            {!isMeasuring ? (
                <div style={styles.contentSection}>
                    <h1 style={styles.title}>측정 컨텐츠 선택</h1>
                    {/* 플래너에서 선택 */}
                    <div>
                        <h3>플래너에서 선택</h3>
                        <ul style={styles.list}>
                            {plannerItems.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        ...styles.listItem,
                                        backgroundColor: selectedContent === item ? "#4D9DE0" : "#fff",
                                        color: selectedContent === item ? "#fff" : "#000",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // 이벤트 버블링 방지
                                        handleContentSelect(item);
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 직접 입력 */}
                    <div>
                        <h3 style={styles.subtitle}>직접 입력</h3>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="직접 입력하세요"
                            value={inputValue}
                            onChange={handleInputChange} // 입력값 반영
                            onFocus={handleInputFocus} // 입력 필드 활성화 시 선택 해제
                            style={styles.input}
                        />
                    </div>

                    {/* 측정 시작 버튼 */}
                    <button
                        style={{
                            ...styles.startButton,
                            backgroundColor: isButtonEnabled ? "#4D9DE0" : "#aaa",
                            color: isButtonEnabled ? "#fff" : "#000",
                            cursor: isButtonEnabled ? "pointer" : "not-allowed",
                        }}
                        onClick={handleStartMeasurement}
                        disabled={!isButtonEnabled} // 버튼 활성화 조건
                    >
                        측정 시작하기
                    </button>
                </div>
            ) : (
                // 집중 화면
                <div style={styles.focusSection}>
                    {/* 현재 날짜 */}
                    <h2 style={styles.dateText}>{currentDate}</h2>
                    {/* 현재 시간 */}
                    <h1 style={styles.clock}>{currentTime}</h1>
                    {/* 업타임 */}
                    <h3 style={styles.uptimeText}>업타임: {uptime}초</h3>
                    {/* 웹캠 화면 */}
                    <div style={styles.webcamContainer}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={styles.webcam}
                        ></video>
                        <h2 style={styles.contentText}>
                            {selectedContent}
                        </h2>

                        <button style={styles.stopButton} onClick={handleStopMeasurement}>
                            측정 종료
                        </button>
                    </div>
                </div>
            )}
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
        backgroundColor: "#1a1a1a",
        color: "#fff",
    },
    contentSection: {
        textAlign: "center",
        width: "80%",
        maxWidth: "600px",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "1rem",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    listItem: {
        padding: "0.5rem",
        border: "1px solid #555",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "0.5rem 0",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        marginBottom: "1rem",
        borderRadius: "4px",
        border: "none",
    },
    webcamContainer: {
        position: "absolute", // 화면 절대 위치 설정
        bottom: "2rem", // 하단 여백
        left: "50%", // 수평 중앙 정렬
        transform: "translateX(-50%)", // 중앙 정렬을 위한 변환
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "8px",
        overflow: "hidden",
    },
    webcam: {
        width: "300px", // 웹캠 화면 너비
        height: "auto", // 비율 유지
        borderRadius: "8px",
    },

    dateText: {
        fontSize: "1.5rem",
        marginBottom: "0.5rem",
    },
    clock: {
        fontSize: "5rem",
        margin: "1rem 0",
        fontWeight: "bold",
    },
    uptimeText: {
        fontSize: "1rem",
        color: "#aaa",
    },
};

export default MainPage;