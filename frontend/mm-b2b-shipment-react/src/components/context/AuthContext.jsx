import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {login as performLogin} from "../../services/userProfile.js";
import {jwtDecode} from "jwt-decode";


const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const setUserProfileFromToken = () => {
        let token = localStorage.getItem("access_token");
        if(token){
            token = jwtDecode(token);
            setUserProfile({
                email: token.sub,
                userType: token.scopes
            })
        }
    }

    useEffect(() => {
        setUserProfileFromToken()
    }, [])



    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken)
                const decodedToken = jwtDecode(jwtToken);
                setUserProfile({
                    email: decodedToken.sub,
                    userType: decodedToken.scopes
                })
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        setUserProfile(null);
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token){
            return false;
        }

        const {exp : expiration} = jwtDecode(token);

        if (Date.now() > expiration * 1000) {
            logout()
            return false;
        }

        return true;

    }

    return (
        <AuthContext.Provider value={{
            userProfile,
            login,
            logout,
            isUserAuthenticated,
            setUserProfileFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;