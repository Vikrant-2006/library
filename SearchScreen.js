import React from 'react'
import {Text, View,FlatList,TextInput,TouchableOpacity} from 'react-native'
import db from '../config'

export default class SearchScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            alltransactions:[],
            search:"",
            lastVisibleTransaction:null
        }

    }
FetchMoreTransaction=async()=>{
var text = this.state.search.toUpperCase()
var entertext= text.split("")
if(entertext[0].toUpperCase()=='A'){
    const querry=await db.collection("transaction").where('bookid','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    querry.docs.map((doc)=>{
        this.setState({
            alltransactions:[...this.state.alltransactions,doc.data()],
            lastVisibleTransaction:doc()
        })
    })
}
else
    if(entertext[0].toUpperCase()=='M'){
        const querry=await db.collection("transaction").where('bookid','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
        querry.docs.map((doc)=>{
            this.setState({
                alltransactions:[...this.state.alltransactions,doc.data()],
                lastVisibleTransaction:doc()
            })
        })
    }


}

searchTransaction=async(text)=>{
    var text = text.toUpperCase()
var entertext= text.split("")
if(entertext[0].toUpperCase()=='A'){
    const querry=await db.collection("transaction").where('bookid','==',text).get()
    querry.docs.map((doc)=>{
        this.setState({
            alltransactions:[...this.state.alltransactions,doc.data()],
            lastVisibleTransaction:doc()
        })
    })
}
else
    if(entertext[0].toUpperCase()=='M'){
        const querry=await db.collection("transaction").where('bookid','==',text).get()
        querry.docs.map((doc)=>{
            this.setState({
                alltransactions:[...this.state.alltransactions,doc.data()],
                lastVisibleTransaction:doc()
            })
        })
    }
}



    render(){
        return(
            <View styles={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput  style={styles.bar} 
                    placeholder="enter book id or student id"
                    onChangeText={(text)=>{this.setState({search:text})}}>

                    </TextInput>

                    <TouchableOpacity style={styles.touchbutton}
                    onPress={()=>{
                        this.searchTransaction(this.state.search)
                    }}
                    >
                        <Text>Search</Text>

                    </TouchableOpacity>
                </View>
            
            <FlatList 
            data={this.state.alltransactions}
            renderItem={({item})=>(
                <View style={{borderBottomWidth:2}}> 
                <Text>{"book id " + item.bookid} </Text>
                <Text>{"student id " + item.studentid} </Text>
                <Text>{"transaction type " + item.transactiontype} </Text>
                <Text>{"date " + item.date.toDate()} </Text>
                </View>
            )}
            keyExtractor={(item,index)=>index.toString()}
            onEndReached={this.FetchMoreTransaction}
            onEndReachedThreshold={0.7}
            />
            </View>
        )
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })