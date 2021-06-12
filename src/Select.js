import React from "react";

function Select(props) {
  return (
    <div>
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">
          {props.des}
        </label>
        <select
          class="form-select"
          id="inputGroupSelect01"
          onChange={props.handleChange}
          value={props.value}
        >
          {props.data.map((country) => {
            return <option value={country}>{country}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default Select;
