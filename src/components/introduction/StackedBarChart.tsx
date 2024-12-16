import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart: React.FC = () => {
    const barData2 = {
        labels: ["월", "화", "수", "목", "금", "토", "일"], // 요일
        datasets: [
            {
                label: "집중",
                data: [10, 20, 25, 30, 20, 25, 35], // 첫 번째 데이터
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 0.6)",
                borderWidth: 1,
            },
            {
                label: "비집중",
                data: [5, 10, 10, 15, 10, 15, 20], // 두 번째 데이터
                backgroundColor: "rgba(200, 200, 200, 0.6)",
                borderColor: "rgba(200, 200, 200, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const, // 범례 위치
            },
            title: {
                display: true,
                text: "주간 집중도 (적층 막대 그래프)",
            },
            datalabels: {
                display: false, // 막대 위 라벨 숨김
            },
            tooltip: {
                enabled: false, // 툴팁 비활성화
            },
        },
        scales: {
            x: {
                stacked: true, // X축 적층 활성화
            },
            y: {
                beginAtZero: true,
                stacked: true, // Y축 적층 활성화
            },
        },
    };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <Bar data={barData2} options={options} />
        </div>
    );
};

export default StackedBarChart;