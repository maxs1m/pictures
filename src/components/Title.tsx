import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from "@react-navigation/native";

type Props = {
  title: string,
  back: {title: string} | undefined
};

const Title = (props: Props) => {
  const navigation = useNavigation()

  return (
    <LinearGradient colors={['#790598', '#BC1399']} style={styles.linearGradient}>
      {props.back && <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/image/Vector.png')}/>
      </TouchableOpacity>}
      <Text style={styles.text}>{props.title}</Text>
    </LinearGradient>
  )
}

export default Title

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  text: {
    fontSize: 22,
    color: '#FFFFFF'
  },
  back: {
    position: 'absolute',
    left: 15,
    top: 22
  }
});