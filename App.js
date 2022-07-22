import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,Button,StatusBar
} from "react-native";
const covidURL = "https://api.opencovid.ca/summary?geo=can&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json";

function HomeScreen({ navigation }) {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);
  const [cases, setCases] = useState([]);
  const [deaths, setDeath] = useState([]);
  const[vaccine_administration_total_doses,setVaccine] = useState([]);

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(covidURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.data[0]);
        setTitle(json.data[0].region);
        setDate(json.data[0].date);
        setCases(json.data[0].cases);
        setDeath(json.data[0].deaths);
        setVaccine(json.data[0].vaccine_administration_total_doses);
       // setDescription(json.description);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // // Also get call asynchronous function
  // async function getCovidAsync() {
  //   try {
  //     let response = await fetch(covidURL);
  //     let json = await response.json();
  //     setDate(json.data[0].date);
  //     setTitle(json.data[0].region);
  //     setDeath(json.data[0].deaths);
  //     setVaccine(json.data[0].vaccine_administration_total_doses);
  //    // setDescription(json.description);
  //     setLoading(false);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }
   
  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
    <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
           
          {/* Title from URL */}
          <Text style={styles.title}>Canada</Text>
           <Text style={styles.date}>Date: {date}</Text>
            <Text style={styles.cases}>Cases: {cases}</Text>
            <Text style={styles.deaths}>Deaths : {deaths}</Text>
            <Text style={styles.vaccine_administration_total_doses}>Vaccinated: {vaccine_administration_total_doses}</Text>
          {/* Display each field */}
           
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Provinces')}
      >
        <Text style ={styles.buttonText}>Province Data</Text>
      </TouchableOpacity>
        </View>
      )}
      
    </SafeAreaView>
  );
};

function DetailsScreen({ navigation }) {
  // managing state with 'useState'
          
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);
  const [cases, setCases] = useState([]);
  const [deaths, setDeath] = useState([]);
  const[vaccine_administration_total_doses,setVaccine] = useState([]);
let covidptURL="https://api.opencovid.ca/summary?geo=pt&fill=true&version=true&pt_names=canonical&hr_names=hruid&fmt=json";
  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(covidptURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.data);
        setTitle(json.data.region);
        setDate(json.data.date);
        setCases(json.data.cases);
        setDeath(json.data.deaths);
        setVaccine(json.data.vaccine_administration_total_doses);
       // setDescription(json.description);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View styles={{width:400}}>
          <FlatList
            data={data}
            keyExtractor={({ id }, region) => id}
            renderItem={({item}) => (
               
              <View style={{ paddingBottom: 50 }}>
                       <Text style={styles.title}>{item.region}</Text>
           <Text style={styles.date}>Date: {item.date}</Text>
            <Text style={styles.cases}>Cases: {item.cases}</Text>
            <Text style={styles.deaths}>Death: {item.deaths}</Text>
            <Text style={styles.vaccine_administration_total_doses}>Vaccinated: {item.vaccine_administration_total_doses}</Text>
                
              </View>
            )}
          />
        </View>
      )}
    
    </SafeAreaView>
  );
};


function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Provinces" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    padding: 24,
    backgroundColor :'#6a51ae',
    alignItems: "center",
    marginTop: 0,
    width:420
  },
  headerT:{
  flex:1,
  backgroundColor:'black',
  color:'white'
  },
  date: {
    textAlign: "center",
    marginBottom: 18,
    marginTop:20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#61dafb"
  },
  title: {
    marginTop: 100,
    paddingVertical: 8,
    borderWidth: 4,
   // borderColor: '#20232',
    borderRadius: 6,
    backgroundColor:'#61dafb',
    color: '#20232a',
    textAlign:'center',
    fontSize: 32,
    fontWeight: "bold",
  },
  cases: {
    textAlign: "center",
    marginBottom: 18,
    marginTop:20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#61dafb",
  },
  deaths: {
    textAlign: "center",
    marginBottom: 18,
    marginTop:20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#61dafb",
  },  
  button: {
    alignItems: "center",
    backgroundColor: "#61dafb",
    padding: 10,
    justifyContent:'center',
    alignSelf:'center',
    bordderWidth:2,
    borderRadius:15,
    marginTop:15,
    width:200,
    height:50,
  },
  buttonText:{
   textAlign:'center',
   color:'black',
   fontSize:20,
  },
  vaccine_administration_total_doses: {
      textAlign: "center",
      marginBottom: 18,
      marginTop:20,
      fontWeight: "bold",
      fontSize: 20,
      color: "#61dafb",
    },
});
export default App;