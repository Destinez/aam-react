import React from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import Slots  from '../views/Slots'
import Templates  from '../views/Templates'
import AssignFieldsToSlot from "../views/AssignFieldsToSlot";

export default function ProgressBar() {
  const step1Content = <Templates />;
  const step2Content = <Slots />;
  const step3Content = <AssignFieldsToSlot />;

  // setup step validators, will be called before proceeding to the next step
  function step1Validator() {
    return true;
  }

  function step2Validator() {
    return true;
  }

  function step3Validator() {
    return true;
  }
  
  return (
    <div className="App">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: "Template",
            name: "Template",
            content: step1Content,
            validator: step3Validator
          },
          {
            label: "Slots",
            name: "Slots",
            content: step2Content,
            validator: step3Validator
          },
          {
            label: "Assign Fields",
            name: "Assign Fields",
            content: step3Content,
            validator: step2Validator
          }
        ]}
      />
    </div>
  );
}
