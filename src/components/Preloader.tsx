import React from 'react'
import {Image, StyleSheet, View} from "react-native";

const Preloader:React.FC = () => {
  return <View style={styles.preloader}>
    <Image style={{ width: 100, height: 100, resizeMode: "cover"}}
      source={require('../assets/image/spinner.gif')}
    />
  </View>
}

export default Preloader

const styles = StyleSheet.create({
  preloader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  }
});