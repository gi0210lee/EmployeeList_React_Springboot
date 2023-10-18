import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const MergeEmployeeComponent = () => {
  const params = useParams();
  const [input, setInput] = useState({
    id: params.id,
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(input.id);
    if (input.id === "-1") {
      return;
    } else {
      const getDate = async () => {
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

      getDate();
    }
  }, []);

  const changeFirstNameHandler = (e) => {
    return setInput((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const changeLastNameHandler = (e) => {
    return setInput((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const changeEmailIdHandler = (e) => {
    return setInput((prev) => ({ ...prev, emailId: e.target.value }));
  };

  const mergeEmployee = (e) => {
    e.preventDefault();
    let employee = {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      emailId: input.emailId,
    };
    console.log("employee", JSON.stringify(employee));

    const query = async () => {
      try {
        if (input.id === "-1") {
          await EmployeeService.newEmployee(employee);
        } else {
          await EmployeeService.editEmployee(input.id, employee);
        }
        navigate("/employees");
      } catch (e) {
        throw e;
      }
    };

    query();
  };

  const cancel = (e) => {
    navigate("/employees");
  };

  function getTitle() {
    if (input.id === "-1") {
      return <h3 className="text-center">New Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-5 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    placeholder="First name"
                    name="firstName"
                    className="form-control"
                    value={input.firstName}
                    onChange={changeFirstNameHandler}
                  />
                  <label>Last Name</label>
                  <input
                    placeholder="Last name"
                    name="lastName"
                    className="form-control"
                    value={input.lastName}
                    onChange={changeLastNameHandler}
                  />
                  <label>Email Id</label>
                  <input
                    placeholder="Enter Email"
                    name="emailId"
                    className="form-control"
                    value={input.emailId}
                    onChange={changeEmailIdHandler}
                  />
                </div>

                <button className="btn btn-success" onClick={mergeEmployee}>
                  {input.id === "-1" ? "Save" : "Update"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  stlye={{ marginLeft: "10px" }}
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

export default MergeEmployeeComponent;
