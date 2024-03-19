import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './bottom-navigator';
import Notification from '../screens/app-screens/Notification';
import Chat from '../screens/app-screens/Chat';
import SearchResult from '../screens/app-screens/SearchResult';
import ServiceDetails from '../screens/app-screens/ServiceDetails';
import BookService from '../screens/app-screens/BookService';
import Payment from '../screens/app-screens/Payment';
import ThankYou from '../screens/app-screens/ThankYou';
export type AppStackParamList = {
  MyTabs: undefined;
  Notification: undefined;
  Chat: undefined;
  SearchResult: {keyword: string};
  ServiceDetails: undefined;
  BookService: {providerId: number};
  Payment: undefined;
  ThankYou: undefined;
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
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookService"
        component={BookService}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYou}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
