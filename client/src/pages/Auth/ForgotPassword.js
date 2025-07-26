import React,{ useState } from 'react';
import Layout from '../../components/Layout/Layout.js'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css"; 

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

  //form function
    const handelSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`/api/v1/auth/forgot-password`, {
          email,
          newPassword,
          answer
        });
        if (res && res.data.success) { 
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

  return (
    <Layout title="Forgot Password">
      <div className="form-container">
            <form onSubmit={handelSubmit}>
              <h4 className="title">RESET Password</h4>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email "
                  autoComplete='on'
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="answer"
                  placeholder="Enter Your Security Answer"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  id="Newpassword"
                  placeholder="Enter Your New Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                RESET
              </button>
            </form>
          </div>
    </Layout>
  );
}

export default ForgotPassword;