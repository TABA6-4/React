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
import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.js 요소 및 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const HorizontalBarChart: React.FC = () => {
    const barData = {
        labels: [
            "집중력이 나빠졌다",
            "기억력이 나빠졌다",
            "흥미가 줄었다",
            "글을 이해하기가 어려워졌다",
            "일/공부를 하는 것이 어려워졌다",
            "긴 영상을 보는 것이 어려워졌다",
            "가족/친구/지인과의 관계가 나빠졌다",
            "우울감이 늘었다",
        ],
        datasets: [
            {
                label: "숏폼의 부정적 영향력 (%)",
                data: [52.6, 45.2, 40.2, 37.5, 27.5, 23.8, 15.4, 12.4],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                barThickness: 25, // 막대 두께 조정
            },
        ],
    };

    const options = {
        indexAxis: "y" as const, // 가로 막대 그래프 설정
        responsive: true,
        plugins: {
            legend: {
                display: false, // 범례 숨기기
            },
            title: {
                display: true,
                text: "숏폼의 부정적 영향력 (단위: %)",
                font: {
                    size: 16,
                    weight: "bold",
                },
                padding: {
                    bottom: 20,
                },
            },
            datalabels: {
                anchor: "end", // 텍스트 위치
                align: "end",  // 텍스트 정렬
                formatter: (value: number) => `${value}`, // 텍스트 표시 형식
                color: "#999", // 글자 색상
                font: {
                    size: 12,
                    weight: "bold",
                },
            },
            tooltip: {
                enabled: false, // 툴팁 비활성화
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
            <Bar data={barData} options={options} />
        </div>
    );
};

export default HorizontalBarChart;