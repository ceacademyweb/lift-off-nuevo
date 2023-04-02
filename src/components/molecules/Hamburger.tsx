// @ts-nocheck
const Hamburger = ({ active, action }) => {
  return (
    <button
      onClick={action}
      className={` hamburger hamburger--squeeze ${
        active ? 'is-active' : ''
      } toggle-menu`}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};
export default Hamburger;
