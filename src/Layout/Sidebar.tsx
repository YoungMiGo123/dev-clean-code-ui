import { useNavigate } from 'react-router-dom';


export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <ul className="sidebar navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" onClick={() => navigate('/')}>
                    <i className="fas fa-fw fa-home"></i>
                    <span>Courses</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Communication</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link">
                    <i className="fas fa-fw fa-user-alt"></i>
                    <span>Performance</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link">
                    <i className="fas fa-fw fa-video"></i>
                    <span>Insights</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/upload')}>
                    <i className="fas fa-fw fa-cloud-upload-alt"></i>
                    <span>Upload Video</span>
                </a>
            </li>
            <li className="nav-item channel-sidebar-list">
            </li>
        </ul>
    );

}