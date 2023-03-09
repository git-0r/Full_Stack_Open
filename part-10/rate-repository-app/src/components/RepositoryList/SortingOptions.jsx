import { Picker } from "@react-native-picker/picker";
import { useRef, useState } from "react";

const SortingOptions = ({ setPrinciple }) => {
  const [selectedOption, setSelectedOption] = useState("CREATED_AT");
  const pickerRef = useRef();

  const handlePicker = (itemValue, itemIndex) => {
    if (itemValue === "CREATED_AT") {
      setSelectedOption("CREATED_AT");
      setPrinciple((prev) => ({
        ...prev,
        orderBy: null,
        orderDirection: null,
      }));
    }
    if (itemValue === "AVERAGE_RATING_DESC") {
      setSelectedOption("AVERAGE_RATING_DESC");
      setPrinciple((prev) => ({
        ...prev,
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      }));
    }
    if (itemValue === "AVERAGE_RATING_ASC") {
      setSelectedOption("AVERAGE_RATING_ASC");
      setPrinciple((prev) => ({
        ...prev,
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      }));
    }
  };

  return (
    <Picker
      ref={pickerRef}
      selectedValue={selectedOption}
      onValueChange={handlePicker}
    >
      <Picker.Item label="Select an item..." enabled={false} />
      <Picker.Item label="Latest repositories" value="CREATED_AT" />
      <Picker.Item
        label="Highest rated repositories"
        value="AVERAGE_RATING_DESC"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="AVERAGE_RATING_ASC"
      />
    </Picker>
  );
};

export default SortingOptions;
