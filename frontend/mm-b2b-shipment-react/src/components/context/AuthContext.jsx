import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {login as performLogin} from "../../services/userProfile.js";



const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                //save the token
                console.log(jwtToken)
                setUserProfile({
                    ...res.data.userProfileDTO
                })
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    return (
        <AuthContext.Provider value={{
            userProfile,
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;