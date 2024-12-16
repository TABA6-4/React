import React, { useState } from "react";

interface ContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plannerItems: string[]; // 플래너 항목 리스트
    onContentSelect: (content: string) => void;
}

const ContentModal: React.FC<ContentModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       plannerItems,
                                                       onContentSelect,
                                                   }) => {
    const [inputValue, setInputValue] = useState("");

    if (!isOpen) return null; // 모달이 닫힌 상태라면 렌더링하지 않음

    const handleSelect = (item: string) => {
        onContentSelect(item);
        onClose();
    };

    const handleCustomInput = () => {
        if (inputValue.trim()) {
            onContentSelect(inputValue);
            onClose();
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>컨텐츠 선택</h2>

                <div>
                    <h3>플래너에서 선택</h3>
                    <ul>
                        {plannerItems.map((item, index) => (
                            <li
                                key={index}
                                style={styles.item}
                                onClick={() => handleSelect(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginTop: "1rem" }}>
                    <h3>직접 입력</h3>
                    <input
                        type="text"
                        placeholder="직접 입력하세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleCustomInput} style={styles.button}>
                        입력
                    </button>
                </div>

                <button onClick={onClose} style={styles.closeButton}>
                    닫기
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "400px",
        textAlign: "center",
    },
    title: {
        marginBottom: "1rem",
    },
    item: {
        cursor: "pointer",
        padding: "0.5rem",
        borderBottom: "1px solid #ddd",
        transition: "background-color 0.3s",
    },
    input: {
        padding: "0.5rem",
        width: "100%",
        marginBottom: "0.5rem",
        boxSizing: "border-box",
    },
    button: {
        padding: "0.5rem 1rem",
        backgroundColor: "#4D9DE0",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    closeButton: {
        marginTop: "1rem",
        backgroundColor: "#ccc",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default ContentModal;