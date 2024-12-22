import React, { useState } from "react";
import ElectionBasicInfo from "./ElectionBasicInfo";
import ElectionFacultiesDepartments from "./ElectionFacultiesDepartments";
import ElectionCandidates from "./ElectionCandidates";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./CreateElectionStepper.css"

const CreateElectionStepper = () => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    bio: "",
    image: null,
    faculty: "",
    department: "",
    candidates: [],
  });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
    // Add API integration here
  };

  return (
    <div className="create-election-stepper">
      <Header />
      {step === 1 && (
        <ElectionBasicInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <ElectionFacultiesDepartments
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ElectionCandidates
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
      <Footer />
    </div>
  );
};

export default CreateElectionStepper;
