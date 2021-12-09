import {ReducerType} from "../store/store";
import {connect, ConnectedProps} from "react-redux";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import {fetchPictures} from "../store/reducer";
import {ListScreenNavigationProp, Picture} from "../Types";
import Preloader from "./Preloader";

const numColumns = Math.floor((Dimensions.get('window').width - 20)/90 )

const PictureList:React.FC<PropsFromRedux> = (props) => {
  const [filter, setFilter] = useState<boolean>(false)

  const navigation = useNavigation<ListScreenNavigationProp>()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !filter? 'Все изображения' : 'Избранное',
    });
  }, [filter]);

  useEffect(() => {
    props.fetchPictures();
  }, [])

  if (props.isFetching) return <Preloader/>

  const renderItem = ({item}: { item: Picture }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PictureScreen', {item})}>
      <View key={item.id} style={styles.box}>
        <Image source={{ uri: item.src.tiny}}  style={styles.image}/>
        {item.favourite && <Image source={require('../assets/image/heart.png')} style={styles.heart}/>}
      </View>
    </TouchableOpacity>
  );



  return <>
    <FlatList
      contentContainerStyle={styles.main}
      data={props.pictures.filter(item => item.favourite === filter || item.favourite === true)}
      renderItem={renderItem}
      keyExtractor={(item:Picture) => item.id}
      horizontal={false}
      numColumns={numColumns}
      columnWrapperStyle={styles.wrapperRow}
      ListEmptyComponent={<Text style={styles.empty}>No images</Text>}
    />
    <View style={styles.footer}>
      <TouchableWithoutFeedback onPress={() => setFilter(false)}>
        {!filter
          ? <Image source={require('../assets/image/home_active.png')}/>
          : <Image source={require('../assets/image/home.png')}/>
        }
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback  onPress={() => setFilter(true)}>
        {!filter
          ? <Image source={require('../assets/image/favourites.png')}/>
          : <Image source={require('../assets/image/favourites_active.png')}/>
        }
      </TouchableWithoutFeedback>
    </View>
  </>
}

const mapStateToProps = (state: ReducerType) => {
  return {
    pictures: state.picture.pictures,
    isFetching: state.picture.isFetching
  }
}

const connector =  connect(mapStateToProps, {fetchPictures})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PictureList)

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 15,
    backgroundColor: '#E5E5E5',
    minHeight: '100%'
  },
  box: {
    position: "relative"
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10
  },
  heart: {
    position: "absolute",
    left: 5,
    bottom: 5
  },
  wrapperRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  footer: {
    width: '100%',
    height: 60,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  empty: {
    fontSize: 16,
    color: 'black',
    textAlign: "center"
  }
});