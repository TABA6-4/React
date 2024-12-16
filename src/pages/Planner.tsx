import React, { useState } from "react";

// 플래너 페이지 컴포넌트
const Planner: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null); // 선택된 날짜 상태
    const [tasks, setTasks] = useState<{ [key: number]: string[] }>({
        1: ["마더텅 비문학 3지문", "수학 자이스토리 2강"],
        5: ["영어 단어 암기 50개", "과학 리포트 제출"],
        12: ["플젝 코드 리뷰", "팀 회의 준비"],
        15: ["운동 1시간", "책 읽기 30분"],
        20: ["수학 문제집 풀기", "글쓰기 연습"],
    });

    // 달력 렌더링 함수
    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const calendar = [];
        for (let i = 0; i < firstDay; i++) {
            calendar.push(<div key={`empty-${i}`} style={styles.emptyDay}></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            calendar.push(
                <div
                    key={day}
                    style={{
                        ...styles.day,
                        ...(selectedDay === day ? styles.selectedDay : {}),
                    }}
                    onClick={() => setSelectedDay(day)} // 날짜 클릭 시 선택
                >
                    {day}
                </div>
            );
        }
        return calendar;
    };

    return (
        <div style={styles.container}>
            {/* 달력 섹션 */}
            <div style={styles.calendarSection}>
                <h1 style={styles.heading}>플래너📌</h1>
                <div style={styles.monthControl}>
                    <button
                        onClick={() =>
                            setCurrentDate(
                                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
                            )
                        }
                    >
                        ◀
                    </button>
                    <h2>
                        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </h2>
                    <button
                        onClick={() =>
                            setCurrentDate(
                                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
                            )
                        }
                    >
                        ▶
                    </button>
                </div>
                <div style={styles.calendarGrid}>
                    {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                        <div key={day} style={styles.dayHeader}>
                            {day}
                        </div>
                    ))}
                    {renderCalendar()}
                </div>
            </div>

            {/* 할 일 섹션 */}
            <div style={styles.taskSection}>
                <ul style={styles.taskList}>
                    {selectedDay && tasks[selectedDay] ? (
                        tasks[selectedDay].map((task, index) => (
                            <li key={index} style={styles.taskItem}>
                                <input type="checkbox" />
                                <span style={{ marginLeft: "0.5rem" }}>{task}</span>
                            </li>
                        ))
                    ) : (
                        <li>할 일이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

// 스타일 객체
const styles: { [key: string]: React.CSSProperties } = {
    heading:{
        fontSize: "5rem",
        width: "100%", // 너비를 화면에 맞게 설정
        maxWidth: "800px", // 최대 너비 지정
        margin: "0 auto", // 가운데 정렬
        textAlign: "left",
    },
    container: {
        display: "flex",
        justifyContent: "center", // 수평 중앙 정렬
        alignItems: "center", // 수직 중앙 정렬
        height: "100vh", // 화면 전체 높이
        width: "100vw", // 화면 전체 너비
        margin: "0", // 불필요한 마진 제거
        padding: "0", // 불필요한 패딩 제거
        boxSizing: "border-box", // 전체 너비에 패딩 포함
        overflow: "hidden", // 넘치는 부분 제거
        backgroundColor: "#fff", // 배경색이 적용되어 있는지 확인
    },
    calendarGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)", // 7개의 열을 동일한 너비로 배치
        gap: "1.5rem", // 날짜 간의 간격 설정
        justifyItems: "center", // 그리드 내 요소 중앙 정렬
        textAlign: "center", // 텍스트 중앙 정렬
        fontSize: "1.3rem",
        width: "80%", // 부모 컨테이너 전체 너비 사용
    },
    calendarSection: {
        flex: 1, // 동일 비율로 영역 차지
        textAlign: "center", // 중앙 정렬
        margin: "0 auto", // 중앙 배치
        marginLeft: "10rem",
    },
    taskSection: {
        flex: 1,
        maxWidth: "600px",
        padding: "1.5rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        margin: "0 auto",
        marginRight: "10rem",
    },
    taskTitle: {
        fontSize: "1.5rem",
        marginBottom: "1rem",
        textAlign: "center",
    },
    taskList: {
        listStyle: "none",
        padding: 0,
    },
    taskItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "left", // 내용을 좌우 정렬
        marginBottom: "1rem", // 항목 간 간격
        padding: "0.75rem 1rem", // 내부 여백
        border: "1px solid #ddd", // 테두리 스타일
        borderRadius: "8px", // 둥근 모서리
        backgroundColor: "#fff", // 배경색
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 박스 그림자 추가
    },
    dayHeader: {
        fontWeight: "bold",
        color: "#333",
        paddingBottom: "0.5rem",
    },
    day: {
        width: "2.5rem", // 날짜 요소의 너비
        height: "2.5rem", // 날짜 요소의 높이
        lineHeight: "2.5rem", // 텍스트 수직 중앙 정렬
        borderRadius: "50%", // 원형 유지
        cursor: "pointer",
        textAlign: "center",
        transition: "background-color 0.3s ease-in-out",
    },
    selectedDay: {
        backgroundColor: "#4D9DE0", // 선택된 날짜 배경색
        color: "#fff", // 글자색
        fontWeight: "bold",
        width: "2.5rem", // 원의 가로 길이
        height: "2.5rem", // 원의 세로 길이
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%", // 원형 유지
        margin: "0 auto", // 중앙 정렬
        transition: "opacity 0.3s ease, transform 0.3s ease", // 애니메이션
        opacity: 1,
    },
    emptyDay: {
        padding: "1rem",
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

export default Planner;