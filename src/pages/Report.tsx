import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Report: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("daily");

    // 데이터 설정
    const dailyTasks = ["마더텅 비문학 3지문", "수학 자이스토리 2강", "영어 단어 암기"];
    const weeklyStats = {
        averageFocus: "85%",
        totalFocusTime: "40시간",
        totalSessions: "10회",
    };
    const contentStats = {
        longest: "공부 - 10시간",
        mostFocused: "독서 - 90%",
        shortest: "휴식 - 1시간",
        leastFocused: "운동 - 50%",
    };

    const pieData = {
        labels: ["ON", "OFF"],
        datasets: [{ data: [70, 30], backgroundColor: ["#4D9DE0", "#F4A261"] }],
    };

    const barData = {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [
            { label: "공부", data: [2, 3, 4, 5, 4, 3, 2], backgroundColor: "#4D9DE0" },
            { label: "휴식", data: [1, 2, 2, 3, 2, 1, 1], backgroundColor: "#F4A261" },
        ],
    };

    return (
        <div style={styles.container}>
            {/* 왼쪽 컨테이너 */}
            <div style={styles.leftPanel}>
                <h1 style={styles.header}>리포트 📊</h1>
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
                            <li key={idx} style={styles.listItem}>{task}</li>
                        ))}
                    </ul>
                )}
                {activeTab === "weekly" && (
                    <div>
                        <p>평균 집중도: {weeklyStats.averageFocus}</p>
                        <p>총 집중 시간: {weeklyStats.totalFocusTime}</p>
                        <p>총 세션 시간: {weeklyStats.totalSessions}</p>
                    </div>
                )}
                {activeTab === "content" && (
                    <div>
                        <p>가장 오래 한 컨텐츠: {contentStats.longest}</p>
                        <p>가장 집중한 컨텐츠: {contentStats.mostFocused}</p>
                        <p>가장 짧게 한 컨텐츠: {contentStats.shortest}</p>
                        <p>가장 집중 안 한 컨텐츠: {contentStats.leastFocused}</p>
                    </div>
                )}
            </div>

            {/* 오른쪽 컨테이너 */}
            <div style={styles.rightPanel}>
                <div style={styles.controller}>
                    {activeTab === "daily" ? "일 선택 컨트롤러" : activeTab === "weekly" ? "주 선택 컨트롤러" : "일 선택 컨트롤러"}
                </div>
                <div style={styles.chartContainer}>
                    {activeTab === "daily" &&
                        <Pie data={pieData} options={{responsive: true, maintainAspectRatio: false}}/>}
                    {(activeTab === "weekly" || activeTab === "content") && (
                        <Bar data={barData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {x: {stacked: true}, y: {stacked: true}}
                        }}/>
                    )}
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
        backgroundColor: "#F4A261",
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
        marginTop: "1rem",
    },
};

export default Report;