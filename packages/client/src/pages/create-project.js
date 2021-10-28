import React, { useState, createContext } from "react";
import FirstPage from "../components/CreateProject/FirstPage";
import SecondPage from "../components/CreateProject/SecondPage";
import ThirdPage from "../components/CreateProject/ThirdPage";

export const CreateProjectContext = createContext();

const CreateProject = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    firstPage: {
      projectName: "",
      projectCategory: "",
      description: "",
      image: "",
    },
    secondPage: {
      totalAmountToRaise: "",
      fungibleToken: "",
      pricePerToken: "",
      percentageOfProfit: "",
    },
    thirdPage: {
      userName: "",
      description: "",
      userImage: "",
    },
  });

  const submitForm = {
    ...form.firstPage,
    ...form.secondPage,
    ...form.thirdPage,
  };

  console.log(submitForm);

  return (
    <CreateProjectContext.Provider
      value={{
        setCurrentPage: setCurrentPage,
        setForm: setForm,
        form: form,
      }}
    >
      {(() => {
        if (currentPage === 1) return <FirstPage />;
        if (currentPage === 2) return <SecondPage />;
        if (currentPage === 3) return <ThirdPage />;
      })()}
    </CreateProjectContext.Provider>
  );
};

export default CreateProject;
