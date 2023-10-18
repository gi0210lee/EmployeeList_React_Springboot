import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const CreateEmployeeComponent = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const navigate = useNavigate();

  const onChangeFirstNameHandler = (e) => {
    return setInput((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const onChangeLastNameHandler = (e) => {
    return setInput((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const onChangeEmailIdHandler = (e) => {
    return setInput((prev) => ({ ...prev, emailId: e.target.value }));
  };

  const onClickSave = (e) => {
    e.preventDefault();

    postEmployee();

    navigate("/employees");
  };

  const onClickCancel = () => {
    navigate("/employees");
  };

  const postEmployee = async () => {
    try {
      let employee = {
        firstName: input.firstName,
        lastName: input.lastName,
        emailId: input.emailId,
      };

      console.log("employee", JSON.stringify(employee));

      const response = await EmployeeService.postEmployee(employee);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div className="card col-md-5 offset-md-3 mt-3">
        <h3 className="text-center">Create Employee</h3>
        <div className="card-body">
          <form>
            <div className="form-group mb-3">
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
            <button className="btn btn-success" onClick={(e) => onClickSave(e)}>
              Save
            </button>

            <button
              className="ms-1 btn btn-danger"
              onClick={() => onClickCancel()}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEmployeeComponent;
