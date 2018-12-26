import React, { Component } from "react";
import { View,Dimensions,StyleSheet, Text, FlatList,TouchableOpacity, ActivityIndicator} from "react-native";

import { List, ListItem ,SearchBar} from 'react-native-elements';

import { connect } from 'react-redux';

import {productLists} from '../actions/products';

const formatData = (data, numOfColumns) => {
  const numOfFullRows = Math.floor(data.length / numOfColumns);
  let numberOfElementsLastRow = data.length - (numOfFullRows * numOfColumns);

  while(numberOfElementsLastRow !== numOfColumns && numberOfElementsLastRow !== 0 ){
    data.push({key: `_blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }
  return data;
}
const numOfColumns = 3;
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          seed: 1,
          error: null,
          loading: true,
          isFetching: false,
        };
      }

    componentDidMount() {
    this.props.dispatch(productLists());
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        data :[...this.state.data, ...nextProps.listOfProducts.data],
        loading:false,
        isFetching: false,
      })

    }
    _handleLoadMore = () => {
      this.setState({
        seed: this.state + 1,
        isFetching: true,
      },() => {
        this.props.dispatch(productLists(this.state.seed));
      })
     
    }

      _renderItem = (item) => {
       if(item.empty === true) return <View style={[styles.itemStyle, styles.itemInvisible]}>

       </View>
        return(
          <View style={styles.itemStyle}>
            <View  style={{flex:1, justifyContent:'center',alignItems:'center'}}>
              <Text>{item.face}</Text>
            </View>
            
            <View style={styles.text}>
              <Text >size: {item.size}</Text>
            </View>

            <View style={styles.badge}>
              <Text style={{color:'white'}}>price: ${item.price}</Text>
            </View>
          </View>
        );
      }

      
    
      render() {
        const { loading, data, isFetching } = this.state;
        if(loading) {
          return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator animating={this.state.loading}  size="large" />
          </View>
        }
        return (
          <View style={style={flex:1, backgroundColor:'#48c6ef'}}>
            <FlatList
              data={data} //formatData(this.state.data, numOfColumns)
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor={(item) => item.id}
              numColumns={numOfColumns}
              onEndReached={this._handleLoadMore}
              onEndReachedThreshold={0}
              extraData={this.state}
            />
              {isFetching && (
                <ActivityIndicator animating={isFetching} style={{backgroundColor:'#ffffff' }} color="#C00" size="large" />
              )}
           </View>
        );
      }
     
}

function mapStateToProps(state) {
  return { 
    listOfProducts: state.products.listOfProducts
  };
}

const styles = StyleSheet.create({
  itemInvisible:{
    backgroundColor:'transparent',
  },
  itemStyle:{
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    height: Dimensions.get('window').width / numOfColumns,
    margin:5
  },
  badge:{
    color:'#fff',
    position:'absolute',
    zIndex:10,
    top:1,
    right:1,
    padding:1,
    width: '100%',
    backgroundColor:'#d3d3d3',
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    position:"absolute",
    bottom:0, 
    left:0,
    right:0, 
    height:25,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent:'center',
    alignItems:'center'
  },
  faces:{
    flex:1, 
    backgroundColor:'red', 
    justifyContent:'center',
    alignItems:'center'
  }
});

export default connect(mapStateToProps)(Home);

