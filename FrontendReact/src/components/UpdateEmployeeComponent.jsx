import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployeeComponent = () => {
  const params = useParams();
  const [input, setInput] = useState({
    id: params.id,
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById();
  }, []);

  const onChangeFirstNameHandler = (e) => {
    return setInput((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const onChangeLastNameHandler = (e) => {
    return setInput((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const onChangeEmailIdHandler = (e) => {
    return setInput((prev) => ({ ...prev, emailId: e.target.value }));
  };

  const onEditEmployee = (e) => {
    e.preventDefault();

    editEmployee();

    navigate("/employees");
  };

  const onCancel = (e) => {
    navigate("/employees");
  };

  const getEmployeeById = async () => {
    try {
      let employee = await EmployeeService.getEmployeeById(input.id);
      let data = employee.data;
      setInput((prev) => ({
        ...prev,
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
      }));
    } catch (e) {
      throw e;
    }
  };

  const editEmployee = async () => {
    let employee = {
      firstName: input.firstName,
      lastName: input.lastName,
      emailId: input.emailId,
    };

    console.log("employee", JSON.stringify(employee));

    try {
      await EmployeeService.putEmployee(input.id, employee);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-5 offset-md-3">
            <h3 className="text-center">Update Employee</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    placeholder="First name"
                    name="firstName"
                    className="form-control"
                    value={input.firstName}
                    onChange={onChangeFirstNameHandler}
                  />
                  <label>Last Name</label>
                  <input
                    placeholder="Last name"
                    name="lastName"
                    className="form-control"
                    value={input.lastName}
                    onChange={onChangeLastNameHandler}
                  />
                  <label>Email Id</label>
                  <input
                    placeholder="Enter Email"
                    name="emailId"
                    className="form-control"
                    value={input.emailId}
                    onChange={onChangeEmailIdHandler}
                  />
                </div>
                <button
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  className="btn btn-success"
                  onClick={onEditEmployee}
                >
                  Update
                </button>
                <button
                  style={{ marginTop: "10px" }}
                  className="btn btn-danger"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployeeComponent;
