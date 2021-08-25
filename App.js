import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking,SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const[value,setvalue]=useState();
  
 
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setvalue(data)
    alert(`Bar code with type ${type} and link ${data} has been scanned!`);   

  };
  
  const openurl=()=>{Linking.openURL(value)} 


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.camera}>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />       
      </View>      
        
      <View style={styles.button}>
       <Button color="black" title="Open URL" onPress={openurl}/>
      </View>      
      
      <View style={styles.button}>      
       {scanned && <Button color="black" title={'Try New QR'} onPress={() => setScanned(false)} ></Button>}
      </View>


        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container:{
    backgroundColor:"#ecf8f8",
    flex:1,
  },

  camera: {
    
    paddingHorizontal:100,
    paddingVertical:140,
    marginTop:120,
    margin:33,
    borderWidth:2,
    borderRadius:5,
    borderColor:"#c0c0c0",
        
  },

  button:{
    marginTop:12,
    borderWidth:1,
    marginVertical:5,    
    marginHorizontal:50,
    borderRadius:20,
    padding:5,
    backgroundColor:"#c0c0c0",
  },
});
