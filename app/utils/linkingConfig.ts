import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
const NAVIGATION_IDS = ['booking', 'chat', 'discount'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.type;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    // console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'chat') {
    const provider = data?.provider;
    if (provider?.id) {
      return `myapp://chat/${provider}`;
    } else {
      return 'myapp://MyTabs/Appointment';
    }
  }
  if (data.type === 'discount' && data?.category) {
    return `myapp://search/${data?.category}`;
  }
  if (navigationId === 'booking') {
    return 'myapp://MyTabs/Appointment';
  }

  return null;
}

const linking = {
  prefixes: ['myapp://'],
  config: {
    initialRouteName: 'mytabs',
    screens: {
      MyTabs: {
        path: 'MyTabs',
        screens: {
          Home: 'Home',
          Appointment: 'Appointment',
        },
      },
      Chat: {
        path: 'chat/:provider',
        parse: {
          provider: provider => `${provider}`,
        },
      },
      SearchResult: 'search/:keyword',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
export default linking;
