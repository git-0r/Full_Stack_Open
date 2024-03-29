import { connect } from "react-redux";
import { setFilterValue } from "../reducers/filterSlice";

const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilterValue(e.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { setFilterValue })(Filter);
