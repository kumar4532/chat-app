import {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext'

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({username, password}) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;   

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();            

            if (data) {
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("Logged In Successfully")
            }

        } catch (error) {
            console.log("Error is from catch");
            
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors ({username, password}){

    console.log(username);
    console.log(password);
    

    if (!username || !password) {
       toast.error("Please fill all the fields"); 
       return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true
}