import React, { useState, useEffect, useMemo } from "react"; // Add useState and useEffect here
import { useNavigate } from "react-router-dom";
import ReactTableComponent from "../components/ReactTableComponent";

const ListConsultant = () => {
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    fetch("/consultantsData.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((item) => ({
          name: item.ConsultantName,
          type: item.ConsultantTypeName,
          mobile: item.MobileNo,
          email: item.EmailAddress,
          division: item.DivisionName,
          district: item.DistrictName,
          ulb: item.UlbName,
        }));
        setConsultants(processedData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const navigate = useNavigate();

  const tablecolumns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Type", accessor: "type" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Email", accessor: "email" },
      { Header: "Division", accessor: "division" },
      { Header: "District", accessor: "district" },
      { Header: "ULB", accessor: "ulb" },
    ],
    []
  );

  return (
    <div className="flex flex-col justify-center items-center bg-transparent ">
      <div className=" max-w-[90%] rounded  m-3 ">
        <div className="bg-blue-base  text-white text-center text-xl px-5 py-2 rounded-sm">
          List of Consultants
        </div>
        <ReactTableComponent
          tableData={consultants}
          tableColumns={tablecolumns}
        />
        <div className="w-full mt-3 flex justify-end">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-base text-white text-center px-5 py-2 rounded-sm hover:bg-slate-500 hover:duration-700"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListConsultant;
