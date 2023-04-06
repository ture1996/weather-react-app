import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div className="main">
      <nav id="menu">
        <ul width="100%" align="center">
          <li id="left">
            <button
              onClick={() => {
                navigate("/addCity");
              }}
            >
              +
            </button>
          </li>
          <li id="right">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Main
            </button>
          </li>
        </ul>
      </nav>
      <br />
      <Outlet />
    </div>
  );
};
