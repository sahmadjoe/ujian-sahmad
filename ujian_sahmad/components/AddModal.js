import React, {Component} from 'react';
import {FlatList,Text,AppRegistry,StyleSheet,View,Image, Dimensions, Platform,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class AddModal extends Component{
    constructor(props){
        super(props);
        this.state={
            newFoodName: '',
            newFoodDescription:''
        };
    }
    showAddModal = ()=> {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters)=>{
        return require('random-string')({length: numberOfCharacters});
    }

    render(){
        return(
            <Modal ref={"myModal"} 
                style={{justifyContent:'center',borderRadius: Platform.OS==='android'? 30:0, shadowRadius:10, backdropColor:'green',backgroundColor:'#FFFF00',
                width: screen.width - 80,
                height:280}}
                position='center' 
                backdrop={true}
                onClosed={()=>{
                    //  alert("modal ditutup")
            }}>
                <Text style={{color:'green', fontSize:20, textAlign:'center'}}> Ini Informasi makanan</Text>
                <TextInput style={{height:40,
                    borderBottomColor:'#58FA58',
                    marginLeft:30,
                    marginRight:30,
                    marginTop:20,
                    marginBottom:10,
                    borderBottomWidth:1
                }}
                onChangeText={(text)=> this.setState({newFoodName:text})}
                    placeholder="Tambahkan yang baru"
                    value={this.state.newFoodName}
                />
                 <TextInput style={{height:40,
                  borderBottomColor:'#58FA58',
                  marginLeft:30,
                  marginRight:30,
                  marginTop:20,
                  marginBottom:10,
                  borderBottomWidth:1
                }}
                onChangeText={(text)=> this.setState({newFoodDescription:text})}
                    placeholder="Deskripsi"
                    value={this.state.newFoodDescription}/>
                <Button style={{ fontSize:18, color:'white'}}
                    containerStyle={{
                        padding:8,
                        marginLeft:70,
                        marginRight:70,
                        height:40,
                        borderRadius:6,
                        backgroundColor:'skyblue'
                }}
                onPress={()=> {
                    if(this.state.newFoodName.length==0 || this.state.newFoodDescription.length==0){
                        alert("ga boleh kosong");
                        return;
                    } 
                    const newKey = this.generateKey(24);
                    const newFood ={
                        key: newKey,
                        name: this.state.newFoodName,
                        imageUrl:"https://i0.wp.com/tastynesia.com/wp-content/uploads/2020/01/Resep-Nasi-Goreng-Kampung.jpg",
                        deskripsi: this.state.newFoodDescription
                    };
                    flatListData.push(newFood);
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();
                }}> save
                </Button>

            </Modal>
        )
    }
}