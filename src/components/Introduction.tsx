import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";

// Chart.js 요소 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    ChartDataLabels
);
import ChartDataLabels from "chartjs-plugin-datalabels";
import HorizontalBarChart from "./introduction/HorizontalBarChart.tsx"
import DailyReport from "./introduction/DailyReport.tsx"
import StackedBarChart from "./introduction/StackedBarChart.tsx"

const Introduction: React.FC = () => {

    return (
        <div style={styles.container}>
            {/* About Section */}

            <section style={styles.section}>
                <h2 style={styles.heading}>About Focus</h2>
                <h3 style={styles.subHeading}>
                    2000년대 이후로 문제가 되고 있는 청년들의 집중력..!
                </h3>
                <HorizontalBarChart/>
            </section>

            {/* 리포트 */}
            <section style={styles.section}>
                <h2 style={styles.heading}>리포트</h2>
                <p style={styles.text}>집중도 측정한 결과를 멋지게 보여줘요.</p>
                <DailyReport/>

                <h3 style={styles.subHeading}>주간 리포트</h3>
                <p style={styles.text}>주간 집중도를 그래프로 보여주고 맞춤형 솔루션을 제공해 줍니다.</p>
                <StackedBarChart/>


                <h3 style={styles.subHeading}>컨텐츠별 리포트</h3>
                <p style={styles.text}>주간 집중도를 그래프로 보여주고 맞춤형 솔루션을 제공해 줍니다.</p>
                <StackedBarChart/>
            </section>

            {/* 플래너 섹션 */}
            <section style={styles.section}>
                <h3 style={styles.subHeading}>플래너</h3>
                <p style={styles.text}>플래너 기능을 통해 할 일을 기록합니다.</p>
            </section>
        </div>
    );
};

// 스타일
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
        margin: "0 auto",
    },
    section: {
        padding: "1.5rem",
        borderRadius: "8px",
    },
    heading: {
        fontSize: "1.8rem",
        marginBottom: "1rem",
        color: "#333",
    },
    subHeading: {
        fontSize: "1.4rem",
        marginBottom: "1rem",
        color: "#555",
    },
    text: {
        fontSize: "1rem",
        color: "#777",
        marginBottom: "1rem",
    },
    clockBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "8px",
        padding: "1rem",
    },
};

export default Introduction;