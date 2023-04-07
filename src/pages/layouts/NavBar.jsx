import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="main">
        <div id="menu" className="flex-main">
          <div>
            <div
              title="Add city"
              className="fa fa-building nav-button"
              onClick={() => {
                navigate("/addCity");
              }}
            ></div>
          </div>
          <div>
            <div
            title="Go to main page"
              className="fa fa-home nav-button"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
        <br />
        <Outlet />
      </div>
    </div>
  );
};
