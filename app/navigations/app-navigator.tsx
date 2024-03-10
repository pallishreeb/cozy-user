import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './bottom-navigator';
import Notification from '../screens/app-screens/Notification';
export type AppStackParamList = {
  MyTabs: undefined;
  Notification: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyTabs"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      // screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
