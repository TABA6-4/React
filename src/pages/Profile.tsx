import React from "react";

const Profile: React.FC = () => {
    // 예시 유저 데이터
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Profile</h1>
            <div style={styles.profileBox}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100vw",
        textAlign: "center" as const,
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "1.5rem",
    },
    profileBox: {
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
    },
};

export default Profile;