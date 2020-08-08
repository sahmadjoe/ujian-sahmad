import React, {Component,useState} from 'react';
import {StyleSheet,AppRegistry,FlatList,Text,View,clickHandler,Image,Alert,
        Platform,TouchableHighlight, Button,Modal} from 'react-native';
import flatListData from '../data/flatListData';    
import Header from './header';
import Swipeout from 'react-native-swipeout';
import AddModal from '../components/AddModal';
import EditModal from './EditModal';
class FlatListItem extends Component{
    constructor(props) {
        super(props);
        this.state={
            activeRowKey :null,
            numberOfRefresh:0
        };
    }

    refreshFlatlist=()=>{
        this.setState((prevState)=>{
            return{
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }

    render(){
          const swipeSetting = {
              autoClose: true,
              onClose: (secId, rowId, direction) => {
                  if(this.state.activeRowKey !=null){
                    this.setState({activeRowKey:null});
                }
              },
              onOpen: (secId, rowId, direction) => {
                  this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress:()=>{
                        this.props.parentFlatlist.refs.showEditModal(flatListData[this.props.index],this);
                    },
                    text: 'edit', type:'primary'
                },
                { 
                    onPress: () => { 
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Yakin Hapus?',
                            [
                                {text:'No',onPress:()=>console.log('censel pressed'), style:'cencel'},
                                {text:'Yes',onPress:()=>{
                                    flatListData.splice(this.props.index,1);
               this.props.parentFlatlist.refreshFlatlist(deletingRow)
                                }},
                            ]
                        )

                    },
                    text: 'Delete',type:'delete'
                }
            ],
            left: [
                {
                    onPress: () => {
                       

                    },
                    text: 'Add',type:'Add'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
          };
        return(
            <Swipeout style={{backgroundColor:'yellow'}} {...swipeSetting}>
                <View style={{flex:1, flexDirection:'column',}}>
                    <View style={{
                        flex:1, flexDirection:'row',
                        // backgroundColor: this.props.index % 2 == 0? 'white': 'yellow'
                        backgroundColor: '#A9F5F2'
                        }}>
                        <Image
                        source={{uri:this.props.item.imageUrl}} style={{width:100, height:100, margin:5,   
                            borderTopRightRadius: 50,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50}}>
                        </Image>
                       
                        <View   style={{flex:1, flexDirection:'column', height:100}} >
                            <Text style={styles.FlatListItem}>{this.props.item.name}</Text>
                            <Text style={styles.FlatListItem}>{this.props.item.deskripsi}</Text>  
                            
                        </View>
                    </View>
                    <View style={{
                            height:1,
                            backgroundColor:'black'
                        }}>

                    </View>
                </View>
            </Swipeout>
    
        )
    }
}

const styles = StyleSheet.create({
    FlatListItem: {
        color:'#FE9A2E',
        padding:5,
        fontSize: 20
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }

})



export default class BasicFlatListData extends Component {
    constructor(props) {
        super(props);
        this.state=({
            deletedRowKey:null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refreshFlatlist=(deletedKey) => {
        this.setState((prevState) => {
            return{
                deletedRowKey: deletedKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd(){
      // alert("berhail di tambah");
        this.refs.AddModal.showAddModal();
    }
    render(){
        return(
            
            <View style={{flex:1, marginTop:Platform.OS==="android"?34:0, backgroundColor:'#2A120A'}} > 
             <Header leftComponent={{ icon:'menu',color:'green',}}
centerComponent={{text:'MY Title', style:{color:'white'}}}
rightComponent={{icon:'home', color:'yellow'}}
/>
                {/* <Header/> */}
                    <View style={{backgroundColor:'skyblue',
                        height:50, 
                        flexDirection:'row', 
                        justifyContent:'flex-end',
                        alignItem:'center'}}>
                        <TouchableHighlight style={{marginRight:10}}
                            underlayColor='skyblue'
                            onPress={this._onPressAdd}
                            >
                             <Image style={{width:35, height:35}}
                             source={require('../icon/add.png')}/>

                        </TouchableHighlight>

                    </View>
                <FlatList
                ref={"flatlist"}
                    data={flatListData}
                    renderItem={({item, index}) =>{
                    return(
                        <FlatListItem item={item} index={index} parentFlatlist={this}>

                        </FlatListItem>
                    );
                    }}>

                </FlatList>
                <AddModal ref={'AddModal'} parentFlatlist={this}>

                </AddModal>
                <EditModal ref={'EditModal'} parentFlatlist={this}>

                </EditModal>
            </View>
        )
    }
}



