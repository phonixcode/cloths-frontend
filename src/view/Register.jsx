import React from "react";

function Register() {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" autoComplete="false" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
