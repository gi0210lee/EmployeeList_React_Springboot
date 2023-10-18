import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const ViewEmployeeComponent = () => {
  const params = useParams();
  const [input, setInput] = useState({
    id: params.id,
    employee: {},
  });

  useEffect(() => {
    getEmployeeById(input.id);
  }, []);

  const getEmployeeById = async (employeeId) => {
    try {
      const response = await EmployeeService.getEmployeeById(employeeId);
      setInput((prev) => ({ ...prev, employee: response.data }));
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View Employee Detail</h3>
        <div className="card-body">
          <h5 className="card-title">Employee First Name</h5>
          <h6 className="card-subtitle text-muted">
            {input.employee.firstName}
          </h6>
        </div>
        <div className="card-body">
          <h5 className="card-title">Employee Last Name</h5>
          <h6 className="card-subtitle text-muted">
            {input.employee.lastName}
          </h6>
        </div>
        <div className="card-body">
          <h5 className="card-title">Employee Email Id</h5>
          <h6 className="card-subtitle text-muted">{input.employee.emailId}</h6>
        </div>
      </div>
    </>
  );
};

export default ViewEmployeeComponent;
