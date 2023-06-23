import React,{useState,useEffect} from 'react'
import { Text, View , FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import Menu from '../components/Menu';
import { API_URL,getConfig } from '../utils/api';
import axios from 'axios';
import NearbyImage from '../assets/image.png'

// const Sampledata = [
//     {
//         id: "1",
//         image: NearbyImage,
//         modelName: "Rav 4",
//         price: "13 Million",
//         manufactureCompany: "Toyota",
//         manufactureYear: "2020"
//     },
// ]

const HomeScreen = () => {
    const [data, setData] = useState([]);

    //fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const config = await getConfig();     //retrieving token
        try {
            const response = await axios.get(`${API_URL}/vehicle/all`,config);
            // console.log(response?.data?.data?.vehicles,"response");

            //populate the data array with the received response 
            setData(response?.data?.data?.vehicles);
        } catch (error) {
            console.log(error,"catch error");
        }
    };
  return (
    <SafeAreaView style={tw`flex-1`}>
        <Text style={{color: '#F7941D', marginTop: 40, marginLeft: 35, marginBottom: 10}}>Registered cars</Text>

        {/* mapping the data */}
        <FlatList data={data} keyExtractor={(item) => item._id} renderItem={({item: {modelName,price,manufactureCompany,photo,manufactureYear}})=>(
            <TouchableOpacity style={[tw`flex-row items-center px-3 py-2 mt-4 rounded-xl mx-8`,{backgroundColor: '#F8F8FB'}]}>
            <Image
                style={tw`rounded p-3 mr-4 w-16 h-16`}
                source={{uri: photo}}
                color="white"
                size={18}
            />
                <View>
                    <Text style={tw`font-semibold`}>{manufactureCompany}</Text>
                    <Text>{modelName} - <Text style={tw`text-xs text-gray-400`}>{manufactureYear}</Text></Text>
                    <Text style={tw`text-gray-500`}>{price} Rwf</Text>
                </View>
            </TouchableOpacity>
        )}/>

      <Menu/>
    
  </SafeAreaView>
  )
}

export default HomeScreen