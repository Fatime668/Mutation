import React, { Component,useState } from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query'
import {  Button,Switch, FlatList, SafeAreaView, StyleSheet,Text, TextInput, View } from 'react-native'
import ProductListScreen from './ProductListScreen';


export const queryClient = new QueryClient();

export class App extends Component {
  
  render() {
    return (<SafeAreaView>
      <QueryClientProvider client={queryClient}>
            <ProductListScreen/>
      </QueryClientProvider>
    </SafeAreaView>
    )
    
  }
}




export default App

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
    borderWidth:2
   }

})
