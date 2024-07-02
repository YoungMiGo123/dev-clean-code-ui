import { useNavigate } from 'react-router-dom';
import { LoginRequest, AccessTokenResponse } from '../../api';
import { useEffect, useState } from 'react';
import { createApiServices } from '../../Core/Services/ApiService';
import { useAuth } from '../../Core/Hooks/AuthHook';
import { LoaderSpinner } from '../../Core/Common/Loader';


export default function Login() {
    const navigate = useNavigate();
    const { dispatch, state } = useAuth();
    const [accessToken, setAccessToken] = useState<AccessTokenResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginData = { email, password };

        setLoading(true);
        try {
            const api = createApiServices().authApi;
            debugger;
            const loginRequest: LoginRequest = {
                email: email,
                password: password
            };
            const response = await api.loginPost(undefined, undefined, loginRequest);
            console.log(response.data);
            debugger;
            const accessToken = response.data;
            dispatch({ type: 'LOGIN', payload: { token: accessToken } });
            localStorage.setItem('userToken', JSON.stringify(accessToken));

            setLoading(false);
            navigate('/');
            console.log(state);
        } catch (err) {
            console.error(err);
            setLoading(false);
          
        }
    };


    return (
        <div className="login-main-body">
            <section className="login-main-wrapper">
                <div className="container-fluid pl-0 pr-0">
                    <div className="row no-gutters">
                        <div className="col-md-5 p-5 bg-white full-height">
                            <div className="login-main-left">
                                <div className="text-center mb-5 login-main-left-header pt-4">
                                    <img src="img/favicon.png" className="img-fluid" alt="LOGO" />
                                    <h5 className="mt-3 mb-3">Welcome to Vidoe</h5>
                                    <p>It is a long established fact that a reader <br /> will be distracted by the readable.</p>
                                </div>
                                { !loading && error && (<span>
                                     {error}
                                </span>) }
                                {
                                    loading ? 
                                    <LoaderSpinner width={400} height={400} color="#F6435B" /> 
                                    :
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
                                            </div>
                                            <div className="mt-4">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-outline-primary btn-block btn-lg">Sign In</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                }

                                <div className="text-center mt-5">
                                    <p className="light-gray">Don’t have an account? <a onClick={() => navigate('/register')}>Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="login-main-right bg-white p-5 mt-5 mb-5">
                                <div className="item">
                                    <div className="carousel-login-card text-center">
                                        <img src="/img/login.png" className="img-fluid" alt="LOGO" />
                                        <h5 className="mt-5 mb-3">​Watch videos offline</h5>
                                        <p className="mb-4">when an unknown printer took a galley of type and scrambled<br /> it to make a type specimen book. It has survived not <br />only five centuries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}