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

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ReportTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("daily");

    // 일일 리포트 (파이 차트)
    const pieData = {
        labels: ["ON", "OFF"],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ["#4D9DE0", "#F4A261"],
                hoverBackgroundColor: ["#338FD1", "#F28482"],
            },
        ],
    };

    // 주간 및 컨텐츠별 리포트 (적층 막대 그래프)
    const barData = {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [
            {
                label: "공부",
                data: [10, 15, 20, 25, 30, 35, 40],
                backgroundColor: "rgba(75, 192, 192, 0.7)",
            },
            {
                label: "휴식",
                data: [20, 25, 15, 10, 20, 25, 15],
                backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
            {
                label: "기타 활동",
                data: [5, 10, 5, 15, 10, 5, 10],
                backgroundColor: "rgba(255, 206, 86, 0.7)",
            },
        ],
    };

    return (
        <div>
            {/* 탭 메뉴 */}
            <div style={styles.tabsContainer}>
                <div
                    style={{
                        ...styles.tab,
                        ...(activeTab === "daily" ? styles.activeTab : {}),
                    }}
                    onClick={() => setActiveTab("daily")}
                >
                    일일 리포트
                </div>
                <div
                    style={{
                        ...styles.tab,
                        ...(activeTab === "weekly" ? styles.activeTab : {}),
                    }}
                    onClick={() => setActiveTab("weekly")}
                >
                    주간 리포트
                </div>
                <div
                    style={{
                        ...styles.tab,
                        ...(activeTab === "content" ? styles.activeTab : {}),
                    }}
                    onClick={() => setActiveTab("content")}
                >
                    일일 컨텐츠별 리포트
                </div>
            </div>

            {/* 콘텐츠 영역 */}
            <div style={styles.content}>
                {activeTab === "daily" && (
                    <div>
                        <h2 style={styles.title}>일일 리포트</h2>
                        <Pie data={pieData} />
                    </div>
                )}
                {activeTab === "weekly" && (
                    <div>
                        <h2 style={styles.title}>주간 리포트</h2>
                        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: true } }, scales: { x: { stacked: true }, y: { stacked: true } } }} />
                    </div>
                )}
                {activeTab === "content" && (
                    <div>
                        <h2 style={styles.title}>일일 컨텐츠별 리포트</h2>
                        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: true } }, scales: { x: { stacked: true }, y: { stacked: true } } }} />
                    </div>
                )}
            </div>
        </div>
    );
};

// 스타일 객체
const styles: { [key: string]: React.CSSProperties } = {
    tabsContainer: {
        position: "sticky", // 화면 상단에 고정
        top: "60px", // 내비게이션 바 높이만큼 아래에 배치
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 500,
        display: "flex",
        justifyContent: "center",
        padding: "0.5rem 0",
        width: "100vw"
    },
    tab: {
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontSize: "1rem",
        color: "#333",
    },
    activeTab: {
        backgroundColor: "#4D9DE0",
        color: "#fff",
        borderRadius: "8px",
    },
    content: {
        padding: "2rem",
        marginTop: "1rem",
        minHeight: "calc(100vh - 100px)", // 화면 높이에 맞춤
        backgroundColor: "#f8f9fa",
    },
};

export default ReportTabs;