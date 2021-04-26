import React from "react";
import './StopsModal.css';
 
function StopsModal() {
  return <Group8 {...group8Data} />;
}
 
export default StopsModal;
 
 
function Group8(props) {
  const { overlapGroup, line7, busStop11228, line8, busStop21229, line9, busStop312210, line10 } = props;
 
  return (
    <div className="group-8">
        <div className="overlap-group rectangleStops">
      {/* <div className="overlap-group" style={{ backgroundImage: `url(${overlapGroup})` }}> */}
        <img className="line-7" src={line7} />
        <h1 className="bus-stop-1-1228 valign-text-middle roboto-black-steel-blue-36px">{busStop11228}</h1>
        <img className="line-8" src={line8} />
        <div className="bus-stop-2-1229 valign-text-middle roboto-black-steel-blue-36px">{busStop21229}</div>
        <img className="line-9" src={line9} />
        <div className="bus-stop-3-12210 valign-text-middle roboto-black-steel-blue-36px">{busStop312210}</div>
        <img className="line-10" src={line10} />
      </div>
    </div>
  );
}
const group8Data = {
    overlapGroup: "https://anima-uploads.s3.amazonaws.com/projects/60754f9e3840f78fc11beaff/releases/6075a151f28b6b1d17a1feb0/img/rectangle-9@2x.png",
    line7: "https://anima-uploads.s3.amazonaws.com/projects/60754f9e3840f78fc11beaff/releases/6075a151f28b6b1d17a1feb0/img/line-7@2x.png",
    busStop11228: "Bus stop 1",
    line8: "https://anima-uploads.s3.amazonaws.com/projects/60754f9e3840f78fc11beaff/releases/6075a151f28b6b1d17a1feb0/img/line-7@2x.png",
    busStop21229: "Bus stop 2",
    line9: "https://anima-uploads.s3.amazonaws.com/projects/60754f9e3840f78fc11beaff/releases/6075a151f28b6b1d17a1feb0/img/line-7@2x.png",
    busStop312210: "Bus stop 3",
    line10: "https://anima-uploads.s3.amazonaws.com/projects/60754f9e3840f78fc11beaff/releases/6075a151f28b6b1d17a1feb0/img/line-10@2x.png",
};
