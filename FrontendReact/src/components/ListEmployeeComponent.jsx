import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, [employees]);

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.getEmployees();

      setEmployees(response.data);
    } catch (e) {
      throw e;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await EmployeeService.deleteEmployee(id);
    } catch (e) {
      throw e;
    }
  };

  const onCreateEmployee = () => {
    navigate("/employees/new");
  };

  const onUpdateEmployee = (id) => {
    navigate(`/employees/${id}/edit`);
  };

  const onDeleteEmployee = (id) => {
    deleteEmployee(id);
    getEmployees();
  };

  const onViewEmployee = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <>
      <h2 className="text-center">Employee List</h2>
      <div style={{ marginBottom: "10px" }} className="">
        <button className="btn btn-primary" onClick={() => onCreateEmployee()}>
          Add Employee
        </button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => onUpdateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={() => onDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-info"
                    onClick={() => onViewEmployee(employee.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListEmployeeComponent;
