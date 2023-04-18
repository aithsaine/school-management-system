import React, { useState } from "react";
import "../assets/styles/stepper.css";
import { TiTick } from "react-icons/ti";
import Card from "../components/card";
const Modal = ({ isOpen, onClose, student_number }) => {
  const steps = ["info personnel", "info scolaire", "contact"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-10 inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <form className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Modal title
                </h3>
                <div className="flex justify-between">
                  {steps?.map((step, i) => (
                    <div
                      key={i}
                      className={`step-item ${
                        currentStep === i + 1 && "active"
                      } ${(i + 1 < currentStep || complete) && "complete"} `}
                    >
                      <div className="step">
                        {i + 1 < currentStep || complete ? (
                          <TiTick size={24} />
                        ) : (
                          i + 1
                        )}
                        <p></p>
                      </div>

                      <p className="text-gray-500 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2">
              {currentStep === 1 && (
                <Card title={"information personnnel"}></Card>
              )}
              {currentStep === 2 && (
                <Card title={"information de branch"}></Card>
              )}
              {currentStep === 3 && (
                <Card title={"information de contact"}></Card>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {!complete && (
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentStep === steps.length) {
                    setComplete(true);
                    onClose();
                    setComplete(false);
                    setCurrentStep(1);
                  } else {
                    setCurrentStep((prev) => prev + 1);
                  }
                }}
              >
                {currentStep === steps.length ? "Finish" : "Next"}
              </button>
            )}
            <button
              onClick={(e) => {
                onClose();
                setComplete(false);
                setCurrentStep(1);
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
