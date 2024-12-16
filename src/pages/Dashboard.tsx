import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Dashboard</h1>
            <p style={styles.text}>
                Welcome to the Dashboard! This is where you can see an overview of your data and activities.
            </p>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties }= {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center" as const,
        height: "100%",
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    text: {
        fontSize: "1.2rem",
        color: "#555",
        maxWidth: "600px",
    },
};

export default Dashboard;