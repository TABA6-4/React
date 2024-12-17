import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.js 요소 및 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Report: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("daily");

    // 데이터 설정
    const dailyTasks = ["마더텅 비문학 3지문", "수학 자이스토리 2강", "영어 단어 암기"];
    const weeklyStats = {
        averageFocus: "67%",
        totalFocusTime: "12시간 36분 20초",
        totalSessions: "10회",
    };
    const contentStats = {
        longest: "공부 - 10시간",
        mostFocused: "독서 - 90%",
        shortest: "휴식 - 1시간",
        leastFocused: "운동 - 50%",
    };

    const pieData = {
        labels: ["집중", "비집중", "졸음"],
        datasets: [{ data: [66.5, 23, 10.5], backgroundColor: ["#4C8BF5", "#F5C150", "#E06464"] }],
    };

    const barData = {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [
            { label: "집중", data: [2, 3, 4, 5, 4, 3, 2], backgroundColor: "#4C8BF5" },
            { label: "비집중", data: [1, 2, 2, 3, 2, 1, 1], backgroundColor: "#F5C150" },
            { label: "졸음", data: [1, 2, 0, 2, 0, 1, 1], backgroundColor: "#E06464" },
        ],
    };

    const lineData = {
        labels: ["2분", "4분", "6분", "8분", "10분", "12분", "14분", "16분", "18분", "20분"],
        datasets: [
            {
                label: "집중도", // 데이터셋의 레이블
                data: [22.3, 50.6, 56.3, 48, 62.5, 66, 58, 54, 43.5, 57.8], // 데이터 값들
                borderColor: "#4C8BF5", // 선 색상
                backgroundColor: "rgba(75,192,192,0.2)", // 배경 색상
                borderWidth: 2, // 선 두께
                tension: 0.1, // 곡선의 부드러움 정도
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "",
            },
            datalabels: {
                display: false, // 막대 위 라벨 숨김
            },
            tooltip: {
                enabled: false, // 툴팁 비활성화
            },
        },
        scales: {
            y: {
                min: 0, // Y축 최소값
                max: 100, // Y축 최대값
                ticks: {
                    callback: function (value: number) {
                        return `${value}%`; // Y축 라벨에 % 표시
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "시간", // X축 제목
                },
            },
        },
    };

    return (
        <div style={styles.container}>
            {/* 왼쪽 컨테이너 */}
            <div style={styles.leftPanel}>
                <h1 style={styles.header}>리포트📊</h1>
                <div style={styles.tabs}>
                    <button
                        style={{...styles.tab, ...(activeTab === "daily" && styles.activeTab)}}
                        onClick={() => setActiveTab("daily")}
                    >
                        일일 리포트
                    </button>
                    <button
                        style={{...styles.tab, ...(activeTab === "weekly" && styles.activeTab)}}
                        onClick={() => setActiveTab("weekly")}
                    >
                        주간 리포트
                    </button>
                    <button
                        style={{...styles.tab, ...(activeTab === "content" && styles.activeTab)}}
                        onClick={() => setActiveTab("content")}
                    >
                        컨텐츠별 리포트
                    </button>
                </div>

                {/* 탭별 콘텐츠 */}
                {activeTab === "daily" && (
                    <ul style={styles.list}>
                        {dailyTasks.map((task, idx) => (
                            <h3 key={idx} style={styles.listItem}>{task}</h3>
                        ))}
                    </ul>
                )}
                {activeTab === "weekly" && (
                    <ul style={styles.list}>
                        <h3 style={styles.listItem}>평균 집중도: {weeklyStats.averageFocus}</h3>
                        <h3 style={styles.listItem}>총 집중 시간: {weeklyStats.totalFocusTime}</h3>
                        <h3 style={styles.listItem}>총 세션 수: {weeklyStats.totalSessions}</h3>
                    </ul>
                )}
                {activeTab === "content" && (
                    <ul style={styles.list}>
                        <h3 style={styles.listItem}>가장 오래 한 컨텐츠: {contentStats.longest}</h3>
                        <h3 style={styles.listItem}>가장 집중한 컨텐츠: {contentStats.mostFocused}</h3>
                        <h3 style={styles.listItem}>가장 짧게 한 컨텐츠: {contentStats.shortest}</h3>
                        <h3 style={styles.listItem}>가장 집중 안 한 컨텐츠: {contentStats.leastFocused}</h3>
                    </ul>
                )}
            </div>

            {/* 오른쪽 컨테이너 */}
            <div style={styles.rightPanel}>
                <div style={styles.controller}>
                    {/* 탭별 컨트롤러 */}
                    {activeTab === "daily" ? (
                        <div style={styles.dateController}>
                            <h2>
                                2024년 12월 18일
                            </h2>
                        </div>
                    ) : activeTab === "weekly" ? (
                        <div style={styles.dateController}>
                            <h2>
                                2024년 12월 17일 ~ 2024년 12월 23일
                            </h2>
                        </div>
                    ) : (
                        <div style={styles.dateController}>
                            {/* 기본 컨트롤러 */}
                            <h2>
                                대학영어 1 온라인강의 수강
                            </h2>
                        </div>
                    )}
                </div>
                <div style={styles.chartContainer}>
                    {activeTab === "daily" &&
                        <Pie data={pieData} options={{responsive: true, maintainAspectRatio: false}}/>}
                    {activeTab === "weekly" && (
                        <Bar data={barData} options={{
                            plugins: {
                                datalabels: {
                                    display: false, // 막대 위 라벨 숨김
                                },
                                tooltip: {
                                    enabled: false, // 툴팁 비활성화
                                },
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {x: {stacked: true}, y: {stacked: true}}
                        }}
                        />)}
                    {activeTab === "content" &&
                        <div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
                            <Line  data={lineData} options={options}/>
                        </div>}
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "space-around", // 좌우 간격을 적절하게 조정
        alignItems: "center", // 수직 중앙 정렬
        height: "100vh", // 전체 화면 높이
        width: "100vw", // 전체 화면 너비
        boxSizing: "border-box",
        padding: "1rem 2rem", // 상하 및 좌우 패딩 조정
        backgroundColor: "#fff",
    },
    leftPanel: {
        flex: "0 0 45%", // 왼쪽 패널 너비를 늘림
        maxWidth: "600px", // 최대 너비를 넉넉히 설정
        marginLeft: "2rem", // 왼쪽 마진 조정
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        borderRadius: "8px",
        overflowY: "auto",
    },

    rightPanel: {
        flex: "0 0 45%", // 오른쪽 패널 너비를 늘림
        maxWidth: "600px", // 최대 너비 설정
        marginRight: "2rem", // 오른쪽 마진 조정
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        borderRadius: "8px",
    },
    header: {
        fontSize: "5rem",
        marginBottom: "2rem",
        color: "#333",
        textAlign: "left",
    },
    tabs: {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
    },
    tab: {
        backgroundColor: "#fff",
        color: "#333",
        border: "1px solid #ddd",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    activeTab: {
        backgroundColor: "#4C8BF5",
        color: "#fff",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    listItem: {
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        fontSize: "1.2rem",
    },
    controller: {
        marginBottom: "1rem",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.5rem",
    },
    chartContainer: {
        width: "100%", // 차트 너비를 패널에 꽉 채움
        height: "400px", // 차트 높이 크게 설정
        marginTop: 0,
    },
    monthControl: {
        fontSize: "1.3rem",
        display: "flex",
        justifyContent: "flex-start", // 왼쪽 정렬
        alignItems: "center", // 수직 정렬
        gap: "1rem", // 버튼과 월 사이 간격
        marginBottom: "1rem",
        width: "100%", // 전체 너비 사용
        textAlign: "left",
    },
};

export default Report;