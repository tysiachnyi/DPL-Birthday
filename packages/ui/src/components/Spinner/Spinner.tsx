import "./Spinner.scss";

const Spinner = () => (
  <div className="spinner">
    <div className="mr-2">
      <div className="bounce1"></div>
    </div>
    <div className="mr-2">
      <div className="bounce2"></div>
    </div>
    <div>
      <div className="bounce3"></div>
    </div>
  </div>
);

export default Spinner;
