import { Image, StyleSheet } from "react-native";

const RepositoryImage = ({ uri }) => {
  const styles = StyleSheet.create({
    ownerImage: {
      width: 50,
      height: 50,
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
    },
  });
  return <Image style={styles.ownerImage} source={{ uri }} />;
};

export default RepositoryImage;
