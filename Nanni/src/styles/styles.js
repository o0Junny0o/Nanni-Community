import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  toastSuccess: {
    width: '90%',
    backgroundColor: '#4BB543',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  toastError: {
    width: '90%',
    backgroundColor: '#FF4444',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  toastText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toastText2: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles