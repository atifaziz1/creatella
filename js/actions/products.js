import axios from 'axios';

import { BASE_URL , PRODUCT_LIST } from '../constants';

function productLists(seed){
    return new Promise(function(resolve,reject){
        // const url = `${BASE_URL}api/products`;
        // console.log(url);
        const url = 'http://192.168.8.100:3000/api/products?_page='+seed+'&_limit=14';
        axios.get(url).then( response => {
            const listOfProducts = response;
            console.log('-0-00--0-0', listOfProducts);
            const action ={
                type: PRODUCT_LIST,
                listOfProducts
            }
            resolve(action);
        });
    });

}

module.exports = {
    productLists,
  };