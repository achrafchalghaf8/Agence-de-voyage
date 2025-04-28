import {useEffect} from 'react';
import { useNavigate} from 'react-router-dom'
import {logout} from "../../services/authservice"
const Logout = () => {

const navigate = useNavigate();
useEffect(() => {
localStorage.removeItem("CC_Token");
localStorage.removeItem("user")
localStorage.removeItem("userName")

logout()
navigate("/login");
}, [navigate]);
return (
<div>
</div>
)
};
export default Logout;