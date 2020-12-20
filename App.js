/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome, { Ionicons, SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

const HomeScreen = ({navigation , route}) => {
  const [getValue, setValue] = useState('');
  const [getDiscount, setDiscount] = useState('');
  const [getfinaldiscount, setfinaldiscount] = useState('');
  const [getfinalprice, setfinalprice] = useState('');
  const [getsavedata, setsavedata] = useState([]);

  useEffect(() => {
    // When returning from History Screen Update state
    if (route.params?.returnNum) {
      setsavedata(route.params.returnNum);
      // Reste Parameters
      navigation.setParams({ returnNum: undefined });
    }
  });


  navigation.setOptions({
    headerRight: () => (
      <View style={{paddingRight: 10}}>
        <Button
          title="history"
          size={24}
          color="black"
          onPress={() => navigation.navigate('History', {getdata: getsavedata})}
        />
      </View>
    ),
  });

  const price = (text) => {
    setValue(text);
  };
  const calculatordiscount = (text) => {
    var discount = Number(text);
    setDiscount(String(discount));
    if (discount < 0 || discount > 100) {
      return ;
    }
    const price = Number(getValue);
    const finaldiscount = (price * discount) / 100;
    setfinaldiscount(String(finaldiscount));

    var finalprice = price - finaldiscount;
    setfinalprice(String(finalprice));
  };
  const savedata = () => {
    const data = [getValue, getDiscount, getfinalprice, getfinaldiscount];
    const key = Math.random() * 100;
    setsavedata([...getsavedata, data]);
    
  };
  return (
    <View style= {{backgroundColor: "lightblue" , height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,}}>
      <View>
        <TextInput
          style={styles.textinput}
          placeholder="Enter the price"
          keyboardType="decimal-pad"
          value = {getValue}
          onChangeText={(text) => price(text)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Enter the discount"
          keyboardType="decimal-pad"
          value = {getDiscount}
          onChangeText={(text) => calculatordiscount(text)}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={styles.TextComponentStyle}>
          Total Discount: {getfinaldiscount}
        </Text>
        <Text style={styles.TextComponentStyle}>
          Total Price: {getfinalprice}
        </Text>
      </View>

      <View>
        <TouchableOpacity  onPress={() => savedata()}
        disabled = { getValue.length <= 0}
        >
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};
const History = ({navigation, route}) => {
  const history = route.params.getdata;
  const [get1stscreendata, set1stscreendata] = useState(history);
  navigation.setOptions({
    headerLeft: () => (
      <View style={{paddingLeft: 10}}>
        <Button
          title="Back"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Home', {returnNum: get1stscreendata})}
        />
      </View>
    ),
  });
  

  
  
  const deleteitem = (item) => {
    const it = item[0];
   var list = get1stscreendata.filter(item => it != item[0]);
    set1stscreendata(list)
  };
  return (
    <View style= {{backgroundColor: "lightblue" , height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,}}>
      <Text style={styles.historyheader}>
        Original Price    -     Discount =     Final Price
      </Text>
      <ScrollView>
        {get1stscreendata.map((item) => (
         
            <View style={styles.history}>
            <Text style = {{color: '#fff',padding: 2,fontSize: 20,textAlign: 'center',}}>
              {item[0]}          -            {item[1]} %       =               {item[2]} 
            </Text>
            <TouchableOpacity onPress={() => deleteitem(item)}>
            <View>
            <Text style = {{color: '#fff',padding: 2,fontSize: 20,textAlign: 'center', backgroundColor: "brown" , borderWidth: 3 , textAlign: 'center', borderRadius:15 , alignItems: 'center', paddingTop: 5 , justifyContent:"center",width: 40}}>X</Text>
            </View>
            </TouchableOpacity>
            </View>
         
        ))}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            //headerShown: false
            headerTintColor: 'orange',

            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'gray',
            },
          }}
        />
        <Stack.Screen name="History" component={History}
        options={{
          //headerShown: false
          headerTintColor: 'orange',

          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'gray',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  homescreenButton: {
    borderBottomColor: '#fff',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
  },
  textinput: {
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 20,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 5,

    // Set border width.
    borderWidth: 2,
    width: '50%',

    // Set border Hex Color Code Here.
    borderColor: '#FF5722',

    // Setting up Text Font Color.
    color: '#fff',

    // Setting Up Background Color of Text component.
    backgroundColor: '#CDDC39',

    // Adding padding on Text component.
    padding: 2,
    marginTop: 50,
    marginLeft: 100,

    fontSize: 34,

    textAlign: 'center',
    alignItems: 'center',
  },

  TextComponentStyle: {
    borderRadius: 5,

    // Set border width.
    borderWidth: 2,
    width: '70%',

    // Set border Hex Color Code Here.
    borderColor: '#FF5722',

    // Setting up Text Font Color.
    color: '#fff',

    // Setting Up Background Color of Text component.
    backgroundColor: '#CDDC39',

    // Adding padding on Text component.
    padding: 2,
    marginTop: 25,

    fontSize: 20,

    textAlign: 'center',
  },
  historyheader: {
    borderRadius: 5,

    // Set border width.
    borderWidth: 2,
    width: '100%',
    
    // Set border Hex Color Code Here.
    borderColor: '#FF5722',

    // Setting up Text Font Color.
    color: '#fff',

    // Setting Up Background Color of Text component.
    backgroundColor: '#CDDC39',

    // Adding padding on Text component.
    padding: 2,
    marginTop: 25,

    fontSize: 20,

    textAlign: 'center',
  },
  history: {
    borderRadius: 5,
    flexDirection : 'row',
    // Set border width.
    borderWidth: 2,
    width: '100%',

    // Set border Hex Color Code Here.
    borderColor: '#FF5722',

    // Setting up Text Font Color.
    color: '#fff',

    // Setting Up Background Color of Text component.
    backgroundColor: '#CDDC39',

    // Adding padding on Text component.
    padding: 2,
    marginTop: 25,

    fontSize: 20,
    justifyContent:"space-between" ,

    textAlign: 'center',
  },
});
