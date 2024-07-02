import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
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
                                <form action="#">
                                    <div className="form-group">
                                        <label>Mobile number</label>
                                        <input type="text" className="form-control" placeholder="Enter mobile number" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label>Promocode</label>
                                        <input type="text" className="form-control" placeholder="Promocode" />
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-outline-primary btn-block btn-lg">Sign Up</button>
                                    </div>
                                </form>
                                <div className="text-center mt-5">
                                    <p className="light-gray">Already have an Account? <a onClick={() => navigate('/login')}>Sign In</a></p>
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