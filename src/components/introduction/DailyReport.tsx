import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // 플러그인 가져오기

// Chart.js 파이 차트 요소 및 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DailyReport: React.FC = () => {
    // 파이 차트 데이터
    const pieData = {
        labels: ["ON", "OFF"],
        datasets: [
            {
                data: [70, 30], // 예시 데이터: ON 70%, OFF 30%
                backgroundColor: ["#4D9DE0", "#3C6E71"], // 색상 설정
                hoverBackgroundColor: ["#338FD1", "#2E5E61"],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // 범례 숨김
            },
            datalabels: {
                color: "#fff", // 라벨 글씨 색상
                font: {
                    size: 18, // 글씨 크기
                    weight: "bold", // 굵기 설정
                },
                formatter: (value: number, context: any) => {
                    return `${value}%`; // 값에 % 표시
                },
            },
            tooltip: {
                enabled: false, // 툴팁 비활성화
            },
        },
    };

    return (
        <div style={styles.container}>
            {/* 왼쪽: 오늘 집중도 현황 테이블 */}
            <div style={styles.tableSection}>
                <h2 style={styles.sectionTitle}>
                    일일 리포트📊
                </h2>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.tableHeader}>순서</th>
                        <th style={styles.tableHeader}>항목</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={styles.tableCell}>1</td>
                        <td style={styles.tableCell}>대학영어 1 온라인강의 수강</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}>2</td>
                        <td style={styles.tableCell}>데이터베이스 스키마 작성</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}>3</td>
                        <td style={styles.tableCell}>조별과제 자료조사</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* 가운데: 집중도 파이 차트 */}
            <div style={styles.chartSection}>
                <h3 style={styles.dateTitle}>2024년 11월 22일</h3>
                <Pie data={pieData} options={options} />
            </div>

            {/* 오른쪽: 설명 텍스트 */}
            <div style={styles.textSection}>
                <h2 style={styles.sectionTitle}>일일 리포트</h2>
                <p style={styles.description}>
                    매일 집중도를 측정하고 이를 일일 리포트로 기록해줍니다.
                </p>
            </div>
        </div>
    );
};

// 스타일 객체
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        gap: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    tableSection: {
        flex: 1,
        textAlign: "center",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
    },
    tableHeader: {
        backgroundColor: "#f8f9fa",
        padding: "0.75rem",
        border: "1px solid #ddd",
        fontWeight: "bold",
    },
    tableCell: {
        padding: "0.75rem",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    chartSection: {
        flex: 1,
        textAlign: "center",
    },
    dateTitle: {
        marginBottom: "1rem",
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
    textSection: {
        flex: 1,
        textAlign: "left",
    },
    sectionTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
    },
    description: {
        fontSize: "1rem",
        color: "#555",
    },
};

export default DailyReport;