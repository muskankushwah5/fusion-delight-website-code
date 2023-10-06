import axios from 'axios'
export const  withdrawlMoney = ()=>{
    
var data = '{\n  "order_id": "order_20210900002",\n  "order_amount": 1,\n  "order_currency": "INR"\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://api.haodapayments.com/api/orders',
  headers: { 
    'x-client-id': '', 
    'x-client-secret': ''
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}