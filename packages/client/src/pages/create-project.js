import React, { useState, createContext } from "react";
import FirstPage from "../components/CreateProject/FirstPage";
import SecondPage from "../components/CreateProject/SecondPage";
import ThirdPage from "../components/CreateProject/ThirdPage";

export const CreateProjectContext = createContext();

const CreateProject = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    projectName: "",
    projectCategory: "",
    description: "",
    image: "",
    totalAmountToRaise: "",
    fungibleToken: "",
    pricePerToken: "",
    percentageOfProfit: "",
    userName: "",
    description: "",
    userImage: "",
  });
  console.log(form);
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
