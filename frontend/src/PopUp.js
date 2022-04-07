import axios from "axios";
import React, { useState } from "react";
import "./popup.css";
const PopUp = ({ setShowpopupClose }) => {
  const [addVar, setAddVar] = useState("");
  const [addVal, setAddVal] = useState(null);

  const handleClose = (e) => {
    if (e.target.classList.contains("conatiner")) {
      setShowpopupClose(false);
    }
  };

  const handleaddVar = async (e) => {
    e.preventDefault();
    if (addVar.length > 0 && addVar.length > 0) {
      try {
        await axios.put(
          "https://drag-drop-backend-soren.herokuapp.com/addVariable",
          {
            id: "624f360e06599c8cabc6b261",
            keyValue: {
              variable: addVar,
              value: parseInt(addVal),
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      return;
    }
  };
  return (
    <div className="conatiner" onClick={handleClose}>
      <div className="popup">
        <form>
          <div className="inpu">
            <label htmlFor="vari">Variable Name</label>
            <input
              type="text"
              placeholder="eg: a"
              onChange={(e) => setAddVar(e.target.value)}
            />
          </div>
          <div className="inpu">
            <label htmlFor="vari">Value</label>
            <input
              type="text"
              placeholder="eg: 10"
              onChange={(e) => setAddVal(e.target.value)}
            />
          </div>
          <div className="addon">
            <button className="addbtn" onClick={handleaddVar}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
