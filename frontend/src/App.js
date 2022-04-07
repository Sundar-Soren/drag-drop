import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import PopUp from "./PopUp";
const App = () => {
  const [variables, setVariables] = useState([]);
  const [dropedValue, setDropedValue] = useState([]);
  const [RHSvalue, setRHSvalue] = useState(null);
  const [compareSign, setCompareSign] = useState("");

  const [showpopupClose, setShowpopupClose] = useState(false);

  const opratorsList = [
    { variable: "+", value: "+", isOperator: true },
    { variable: "-", value: "-", isOperator: true },
    { variable: "*", value: "*", isOperator: true },
    { variable: "/", value: "/", isOperator: true },
  ];

  const dragItem = useRef();
  const dragOperator = useRef();

  const updateCalc = () => {
    let stringc = "";
    dropedValue.map((value) => {
      stringc = stringc + value.value;
    });
    try {
      let digitValue = eval(stringc);
      if (!RHSvalue && !compareSign) {
        alert("Invalid Input");
        return;
      }
      if (digitValue) {
        alert("true");
      } else {
        alert("false");
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert(e.message);
        return;
      }
    }
  };

  const dragStartOperator = (e, position) => {
    dragOperator.current = position;
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const drop = (e) => {
    e.preventDefault();
    if (dragItem.current == null || undefined) {
      const copyOperators = [...opratorsList];
      const copyDropOper = [...dropedValue];
      const dragOperatorcontect = copyOperators[dragOperator.current];
      copyDropOper.splice(dropedValue.length, 0, dragOperatorcontect);
      setDropedValue(copyDropOper);
      dragOperator.current = null;
      return;
    }
    const copyListItems = [...variables];
    const copyDropItem = [...dropedValue];
    const dragItemContent = copyListItems[dragItem.current];
    copyDropItem.splice(dropedValue.length, 0, dragItemContent);
    dragItem.current = null;
    setDropedValue(copyDropItem);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://drag-drop-backend-soren.herokuapp.com/getVariable"
        );
        setVariables(data.getValues[0].variableValue);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const dropOver = (e) => {
    e.preventDefault();
  };

  const closeItems = (index, op) => {
    if (op) {
      setRHSvalue(null);
    }
    const dropItemsCopy = [...dropedValue];
    dropItemsCopy.splice(index, 1);
    setDropedValue(dropItemsCopy);
  };

  const addGT = () => {
    setCompareSign(">");
    const copyDropValue = [...dropedValue];
    copyDropValue.splice(dropedValue.length, 0, {
      variable: ">",
      value: ">",
      isOperator: true,
    });
    setDropedValue(copyDropValue);
  };

  const addLT = () => {
    setCompareSign("<");
    const copyDropValue = [...dropedValue];
    copyDropValue.splice(dropedValue.length, 0, {
      variable: "<",
      value: "<",
      isOperator: true,
    });
    setDropedValue(copyDropValue);
  };

  const addRHS = () => {
    const RHSvalue = prompt("Enter RHS value");

    const copyDropValue = [...dropedValue];
    copyDropValue.splice(dropedValue.length, 0, {
      variable: RHSvalue,
      value: RHSvalue,
      isOperator: true,
    });
    setDropedValue(copyDropValue);
    setRHSvalue(parseInt(RHSvalue));
  };

  return (
    <div>
      <div className="app_container">
        <div className="alphabets">
          {variables &&
            variables.map((variable, index) => (
              <div
                className="alphabet"
                draggable
                onDragStart={(e) => dragStart(e, index)}
                key={index}
              >
                {variable.variable}
              </div>
            ))}
          <div className="addVa" onClick={() => setShowpopupClose(true)}>
            <p className="newVariable">Add new variable +</p>
          </div>
        </div>

        <div className="operaotbtns">
          {opratorsList.map((operator, i) => (
            <div
              key={i}
              className="opeBTN"
              draggable
              onDragStart={(e) => dragStartOperator(e, i)}
            >
              <p>{operator.variable}</p>
            </div>
          ))}
        </div>

        <div className="operaotbtns">
          <div className="opeBTN fjhsdfj" onClick={addGT}>
            <p>{">"}</p>
          </div>
          <div className="opeBTN fjhsdfj" onClick={addLT}>
            <p>{"<"}</p>
          </div>
          <div className="opeBTN fjhsdfj" onClick={addRHS}>
            <p>RHS Integer</p>
          </div>
        </div>

        <div className="alphabets drop" onDragOver={dropOver} onDrop={drop}>
          {dropedValue.length > 0 &&
            dropedValue.map((data, i) => (
              <div
                key={i}
                className={data.isOperator ? "opeBTN" : "alphabetdas"}
              >
                {data.isOperator ? (
                  <AiOutlineClose
                    className="icon"
                    onClick={() => closeItems(i, data.isOperator)}
                  />
                ) : (
                  <AiOutlineClose
                    className="icon"
                    onClick={() => closeItems(i)}
                  />
                )}
                <p>{data.variable}</p>
              </div>
            ))}
        </div>
        <div className="btnEva">
          <button className="evaluteBTN" onClick={updateCalc}>
            Evaluate
          </button>
        </div>
      </div>
      {showpopupClose && <PopUp setShowpopupClose={setShowpopupClose} />}
    </div>
  );
};

export default App;
