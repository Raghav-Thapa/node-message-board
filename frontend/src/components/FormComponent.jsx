export const FormField = ({
  onChange,
  name,
  placeholder,
  type,
  classname,
  value,
}) => {
  return (
    <>
      <input
        className={classname}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </>
  );
};
