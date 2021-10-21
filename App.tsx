import React from 'react';
import {Provider} from "react-redux";
import store from "./src/store/store";
import PictureList from "./src/components/PicturesList";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { getHeaderTitle } from '@react-navigation/elements';
import Title from "./src/components/Title";
import {RootStackParamList} from "./src/Types";
import PictureScreen from "./src/components/Picture";

const Stack = createStackNavigator<RootStackParamList>();

const App:React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="List"
          screenOptions={{
            header: ({ route, options, back}) => {
              const title = getHeaderTitle(options, route.name);
              return (
                <Title title={title} back={back}/>
              )
            }
          }}>
          <Stack.Screen
            name="List"
            component={PictureList}
            options={{ title: 'Все изображения' }}
          />
          <Stack.Screen
            name="PictureScreen"
            component={PictureScreen}
            options={({ route }) => ({
              title: route.params.item.id,
              cardStyle: {
                backgroundColor: 'black',
              }
            })}
            />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

