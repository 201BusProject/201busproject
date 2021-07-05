import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Popup (props) {

  const { busNo, steps, description } = props.busEvent.features[0].properties;

  const handleStartJourney = () => {
  };

  return (
    <div>
      {`You are at ${description}, waiting for bus ${busNo} to come`}
      <Button size="sm" onClick={() => handleStartJourney()}>
        Start Journey
      </Button>
    </div>
  );
};

export default Popup;
