import React from 'react';
import {StatusBar} from 'react-native';
import {Navigation} from './navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Navigation />
      </GestureHandlerRootView>
    </>
  );
}

export default App;
