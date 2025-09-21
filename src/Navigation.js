import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <div className="nav-container">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/report">Report</Link>
    </div>
  );
}

export default Navigation;
