import "../App.css";

const spanStyle = {
    fontWeight: 600,
    fontSize: "1.8vw",
    cursor: "pointer",
    position: "absolute",
    top: "4vw",
    marginLeft: "0.5vw",
};

function FlightsTable() {
  const switchBetweenPage = () => {
    window.open("https://flight-information-system.vercel.app/#/arrival", "_blank");
  };

  return (
    <div className="table-conatianer">
      <div className="title">
        <h2>
          <span onClick={switchBetweenPage} style={spanStyle}>
            Flight Departure
          </span>
        </h2>
      </div>
    </div>
  );
}
export default FlightsTable;
