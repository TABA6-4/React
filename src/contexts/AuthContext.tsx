import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { login } from '../services/Api';

interface User {
    email: string;
    role: string;
    userId: number;
}

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // 앱 시작 시 토큰 검증
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decoded: any = jwtDecode(accessToken);
            if (decoded.exp * 1000 > Date.now()) {
                setUser({ email: decoded.sub, role: decoded.auth, userId: decoded.user_id });
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
        }
    }, []);


    const loginUser = async (email: string, password: string) => {
        try {
            const response = await login(email, password); // API 호출
            const { accessToken, refreshToken, userId } = response.data;

            if (!accessToken || !refreshToken || !userId) {
                throw new Error("Invalid login response from server");
            }

            // 로컬 스토리지에 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", String(userId));

            // JWT 디코딩
            const decoded: any = jwtDecode(accessToken);

            if (!decoded || !decoded.sub || !decoded.auth || !decoded.user_id) {
                throw new Error("Invalid token structure");
            }

            // 상태 업데이트
            setUser({ email: decoded.sub, role: decoded.auth, userId: decoded.user_id });
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login failed:", error);
            alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loginUser , logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};