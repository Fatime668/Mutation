import React, { Component,useState } from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query'
import {  Button,Switch, FlatList, SafeAreaView, ScrollView, StyleSheet,Text, TextInput, View } from 'react-native'
import { queryClient } from './App'


export const ProductListScreen = () =>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    let { data: response,
       isLoading, 
       error, 
       refetch, 
       dataUpdatedAt,
       isPreviousData 
      } = useQuery("productData", () => {
      return axios.get('https://northwind.vercel.app/api/products')
    }
      ,
      {
        staleTime: 100000,
        refetchInterval: 5000 
      }
    )
    //delete
    const deleteData = async () => {
      try {
        // API isteğiyle veri silme işlemini gerçekleştirin
        const response = await axios.delete('https://northwind.vercel.app/api/products/'+id);
        
        if (response.status === 200) {
          queryClient.invalidateQueries('dataKey');
        } else {
          throw new Error('Silme işlemi başarısız oldu');
        }
      } catch (error) {
        console.error(error);
      }
    };
    const mutation = useMutation(deleteData);

  const handleDelete = () => {
    mutation.mutate();
  };
    //add
    const { data, isLoading: postloading, mutate } = useMutation({
      mutationFn: async (data: any) => {
        let result = await axios.post('https://northwind.vercel.app/api/products', data)
        return result;
      },
      onSuccess: (response) => {
        console.log('Success!', response.data);
        // refetch();
        queryClient.invalidateQueries({ queryKey: 'productData'})
      },
      onError: (err) => {
        console.log('Error!', err);
  
      }
    })
    const add = () => {
      mutate({ name: name,price:price });
     
    }
    
    return (
      <SafeAreaView>
        <View style={{alignItems:"center",margin:24}}>
          <View>
            <TextInput onChangeText={setName}  style={styles.name} placeholder='name' />
            <TextInput onChangeText={setPrice}  style={styles.price} placeholder='unitPrice' />
            <TextInput  style={styles.id}
        placeholder="ID girin"
        value={id}
        onChangeText={setId}
      />
          </View>
          <View style={{flexDirection:"row"}}>
            <Button onPress={()=>refetch()} title="refetch" color={"blue"}/>
            <Button onPress={()=>add()} title="add" color={"orange"} />
            <Button onPress={handleDelete} title="delete" color={"red"} />
          
          </View>
        
         <View>
          {
        isLoading ? <Text>loading...</Text> : <FlatList
          contentContainerStyle={{paddingBottom:800}}
          data={response?.data}
          renderItem={({ item }: any) => 
        <View>
            <Text style={{ fontSize: 30 }}>{item.name}</Text>
            <Text style={{ fontSize: 30 }}>{item.price}</Text>
        </View>
        }
        />
      }
          
          </View>
        
        </View>
      </SafeAreaView>
    )
  }
  export default ProductListScreen
  const styles = StyleSheet.create({
    name:{
     width:300,
     height:50,
     paddingLeft:10,
     borderColor:"#ccc",
     borderWidth:2,
     marginBottom:15
    },
    price:{
     width:300,
     height:50,
     paddingLeft:10,
     borderColor:"#ccc",
     borderWidth:2,
     marginBottom:15

    },
    id:{
      width:300,
      height:50,
      paddingLeft:10,
      borderColor:"#ccc",
      borderWidth:2
    }
 
 })