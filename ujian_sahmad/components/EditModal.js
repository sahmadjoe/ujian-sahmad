import React, {Component} from 'react';
import {FlatList,Text,AppRegistry,StyleSheet,View,Image, Dimensions,TextInput, Platform} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class EditModal extends Component{
    constructor(props){
        super(props);
        this.state={
            foodName: '',
            foodDescription:''
        };
        
    }
    showEditModal = (editingFood,flatListItem)=> {
        // console.log('editingFood = ${JSON.stringify(editingFood)}');
        this.setState({
            key: editingFood.key,
            foodName: editingFood.name,
            foodDescription: editingFood.deskripsi,
            flatListItem: flatListItem
        });
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
                onChangeText={(text)=> this.setState({foodName:text})}
                    placeholder="Tambahkan yang baru"
                    value={this.state.foodName}
                />
                 <TextInput style={{height:40,
                  borderBottomColor:'#58FA58',
                  marginLeft:30,
                  marginRight:30,
                  marginTop:20,
                  marginBottom:10,
                  borderBottomWidth:1
                }}
                onChangeText={(text)=> this.setState({foodDescription:text})}
                    placeholder="Deskripsi"
                    value={this.state.foodDescription}/>
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
                    if(this.state.foodName.length==0 || this.state.foodDescription.length ==0){
                        alert("ga boleh kosong");
                        return;
                    } 
                   var foundIndex = flatListData.findIndex(item => this.state.key == item.key);
                   if(foundIndex < 0){
                       return;
                   }
                   flatListData[foundIndex].name = this.state.foodName;
                   flatListData[foundIndex].deskripsi = this.state.foodDescription;
                   this.state.flatListItem.refreshFlatList();
                    this.refs.myModal.close();
                }}> save
                </Button>

            </Modal>
        )
    }
}