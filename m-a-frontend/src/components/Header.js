import { Link } from "react-router-dom";

export default function Header() {
  const linkStyle = {
    marginRight: 20,
    textDecoration: "none",
    color: "#4b2ea0",
    fontSize: 18,
    fontWeight: 500
  };

  const container = {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    background: "#f7f7f7",
    borderBottom: "1px solid #ddd",
    marginBottom: 20
  };

  return (
    <header style={container}>
      <Link to="/" style={linkStyle}>Home</Link>
    </header>
  );
}