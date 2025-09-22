// import { Link } from 'react-router-dom';
import Link from 'next/link';
import './Navigation.css';

function Navigation() {
  return (
    <div className="nav-container">
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/report">Report</Link>
    </div>
  );
}

export default Navigation;
