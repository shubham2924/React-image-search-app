import React, { useReducer } from "react";
import './App.css';
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

// Define the steps
const TOUR_STEPS = [
  {
    target: ".tour-logo",
    content: "Search of varities of trending sections!",
    disableBeacon: true,
  },
  {
    target: ".tour-cart",
    content:
      "Our react app comes with dark mode feature!",
  },
  {
    target: ".tour-contact",
    content: "Go for your favourite word & preview, download and share on social media!",
  },
  {
    target: ".tour-policy",
    content: "Select the number of images you want to have!",
  },
];

// Define our state
const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

// Set up the reducer function
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

// Define the Tour component
const Tour = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
//   useEffect(() => {
//     if (!localStorage.getItem("tour")) {
//       dispatch({ type: "START" });
//     }
//   }, []);
// commented this useEffect as wanted to give user a choice whether to take a tour or not

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };
  const startTour = () => {
    dispatch({ type: "RESTART" });
  };
  return (
    <>
    <button className="tourbtn" style={{backgroundColor:"#fff",color:"#3F51B5",borderWidth:"2px",border:"none",textAlign:"center",cursor:"pointer" ,textDecoration:"none", borderRadius:"10px"}} onClick={startTour}>
      <b>Start Tour</b>
      </button>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          options: {
            arrowColor: 'rgb(233,245,248)',
            backgroundColor: 'rgb(233,245,248)',
            overlayColor: 'rgba(0, 0, 155, 0.3)',
            primaryColor: '#3F51B5',
            textColor: '#3F51B5',
          },

          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End tour",
        }}
      />
    </>
  );
};
export default Tour;
