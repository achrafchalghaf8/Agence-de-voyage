import {useState} from 'react'
import { useNavigate} from "react-router-dom";
import {signup} from "../../services/authservice"
import './registerForm.css';
const Register = () => {
const navigate = useNavigate();

const [name,setName]=useState("")
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [password2, setPassword2] = useState("");
const [avatar, setAvatar] = useState("");

const handleSubmit = (e) => {
e.preventDefault()
if (password !== password2) {
alert('Passwords do not match')

} else {
const userData = {
name:name,
email:email,
password:password,
password_confirmation:password2,
role:'user',
avatar:avatar
}
signup(userData).then((res) => { console.log(res)
if(res) navigate('/dashboard')
else alert("Register with errors");
})
.catch((err) => {alert("Register with errors");console.log(err)})
}
};

return (
<div className="register-container">
<div className="register-form-container">
<form onSubmit={handleSubmit} className="register-form">
<h2>Register</h2>
<div className="input-group">
<div className="input-label">Name</div>
<div className="input-wrapper">
<i className="fas fa-user"></i>
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
</div>
</div>
<div className="input-group">
<div className="input-label">Email</div>
<div className="input-wrapper">
<i className="fas fa-envelope"></i>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
</div>

<div className="input-group">
<div className="input-label">Password</div>
<div className="input-wrapper">
<i className="fas fa-lock"></i>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
</div>
<div className="input-group">
<div className="input-label">Retape Password</div>
<div className="input-wrapper">
<i className="fas fa-lock"></i>
<input
type="password"
value={password2}
onChange={(e) => setPassword2(e.target.value)}
required
/>
</div>
</div>
<div className="input-group">
<div className="input-label">Avatar</div>
<div className="input-wrapper">
<i className="fas fa-image"></i>
<input
type="text"
value={avatar}
onChange={(e) => setAvatar(e.target.value)}
/>
</div>
</div>
<button className="buttonRegister" type="submit">Sign up</button>
</form>
</div>
</div>
);
};
export default Register;