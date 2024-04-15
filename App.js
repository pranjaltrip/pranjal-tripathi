import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Retrieve data from local storage on component mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("studentRecords"));
    if (data) {
      setStudent(data);
    }
  }, []);

  const [name, setName] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [eNumber, setENumber] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorMobile, setErrorMobile] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorENumber, setErrorENumber] = useState("");
  const [studentsRecords, setStudent] = useState([]);

  const onSubmit = () => {
    // Reset error messages
    setErrorName("");
    setErrorMobile("");
    setErrorEmail("");
    setErrorENumber("");

    // Validation checks
    let isValid = true;
    if (!name) {
      setErrorName("Name cannot be blank");
      isValid = false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrorMobile("Mobile number must be 10 digits");
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorEmail("Invalid email format");
      isValid = false;
    }
    if (eNumber.length > 50) {
      setErrorENumber("Maximum 50 characters allowed");
      isValid = false;
    }
    if (!isValid) {
      return; // If any validation fails, do not proceed further
    }
    // Create a new array instead of mutating state directly
    const newRecord = {
      name: name,
      mobile: mobileNumber,
      email: email,
      eNumber: eNumber,
    };
    const isDuplicate = studentsRecords.some(record => record.eNumber === eNumber);
    if (isDuplicate) {
      setErrorENumber("Roll number already exists");
      return; // If roll number is a duplicate, do not proceed further
    }
    const updatedRecords = [...studentsRecords, newRecord];
    setStudent(updatedRecords);
    // Store data in local storage
    localStorage.setItem("studentRecords", JSON.stringify(updatedRecords));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>
            Student Name:
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <div className="error">{errorName}</div>
          </label>
        </div>
        <br />
        <div>
          <label>
            Student Phone Number:
            <input
              value={mobileNumber}
              onChange={(e) => setMobile(e.target.value)}
            />
            <div className="error">{errorMobile}</div>
          </label>
        </div>
        <br />
        <div>
          <label>
            Student Email:
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="error">{errorEmail}</div>
          </label>
        </div>
        <br />
        <div>
          <label>
            Student En. Number:
            <input
              value={eNumber}
              onChange={(e) => setENumber(e.target.value)}
            />
            <div className="error">{errorENumber}</div>
          </label>
        </div>
        <br />
        <br />
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>

        <br />
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {studentsRecords.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.mobile}</td>
                    <td>{val.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;