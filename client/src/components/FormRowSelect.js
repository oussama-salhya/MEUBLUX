const FormRowSelect = ({ labelText, name, value, handleChange, children, showError }) => {
  return (
    <div className='form-row container-input'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <div>
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className='form-input'
        >
          <option value="">-- select a category --</option>
          {children}
        </select>
        {
          showError && !value && <span className="form-alert">
            {labelText || name} is required
          </span>
        }

      </div>
    </div>
  );
};
export default FormRowSelect;
