import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        });
        console.log("User Auth Check:", res.data); // should be { ok: true }
        setOk(res.data.ok);
      } catch (err) {
        console.error("Auth check error:", err.response?.data || err.message);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
