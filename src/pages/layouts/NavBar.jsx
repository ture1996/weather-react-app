export const NavBar = ({ children }) => {
  return (
    <div className="main">
      <nav id="menu">
        <ul width="100%" align="center">
          <li id="left">
            <button
              onClick={() => {
                window.location.replace("/addCity");
              }}
            >
              +
            </button>
          </li>
          <li id="right">
            <button
              onClick={() => {
                window.location.replace("/");
              }}
            >
              Main
            </button>
          </li>
        </ul>
      </nav>
      <br />
      {children}
    </div>
  );
};
