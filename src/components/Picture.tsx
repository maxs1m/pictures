import { Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Picture, PictureScreenNavigationProp, PictureScreenRouteProp} from "../Types";
import {connect, ConnectedProps} from "react-redux";
import {deletePicture, toggleFavourite} from "../store/reducer";
import {ReducerType} from "../store/store";
import { useNavigation } from '@react-navigation/native'
import Preloader from "./Preloader";

interface Props extends PropsFromRedux {
  route: PictureScreenRouteProp
}

const PictureScreen:React.FC<Props>  = (props) => {
  const [image, setImage] = useState<Picture>({favourite: false, id: "", src: {original: "", tiny: ""}})
  const [load, setLoad] = useState<boolean>(false)

  const navigation = useNavigation<PictureScreenNavigationProp>()

  useEffect(() => {
    // @ts-ignore
    setImage(props.pictures.find((item:Picture) => item.id === props.route.params.item.id))
  },[props.pictures])

  useEffect(()=> {
    if (!image) { // @ts-ignore
      navigation.navigate('List')
    }
  },[image])

  return ( <>
    {image &&
      <View style={styles.box}>
        {load && <View style={styles.spinner}><Preloader/></View>}
        <Image
          source={{uri: props.route.params.item.src.original}}
          style={styles.image}
          onLoadStart={() => setLoad(true)}
          onLoadEnd={() => setLoad(false)}
        />
        {!load && <View style={styles.footer}>
          {image.favourite
            ? <TouchableOpacity
              style={styles.footer__item}
              onPress={() => props.toggleFavourite(image.id)}
            >
              <Image source={require('../assets/image/heart.png')}/>
              <Text style={styles.text}>Удаллить из избранного</Text>
            </TouchableOpacity>
            : <TouchableOpacity
              style={styles.footer__item}
              onPress={() => props.toggleFavourite(image.id)}
            >
              <Image source={require('../assets/image/heart2.png')}/>
              <Text style={styles.text}>Добавить в избранное</Text>
            </TouchableOpacity>}
          <TouchableOpacity
            style={[styles.footer__item, {borderTopWidth: 1}]}
            onPress={() => {
              props.deletePicture(image.id)
            }}
          >
            <Image source={require('../assets/image/trash.png')}/>
            <Text style={styles.text}>Удалить изображение</Text>
          </TouchableOpacity>
        </View>}
      </View>
    }
  </>)
}

const mapStateToProps = (state: ReducerType) => {
  return {
    pictures: state.picture.pictures,
  }
}

const connector =  connect(mapStateToProps, {toggleFavourite, deletePicture})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PictureScreen)

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'black',
    display: "flex",
    flexDirection: "column",
    flex: 1,
    position: "relative",
    paddingBottom: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
    borderRadius: 5
  },
  footer: {
    maxWidth: '100%',
    height: 84,
    marginHorizontal: 15,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  footer__item: {
    display: "flex",
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  text: {
    marginLeft: 5
  },
  spinner: {
    position: "absolute",
    zIndex: 2,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});