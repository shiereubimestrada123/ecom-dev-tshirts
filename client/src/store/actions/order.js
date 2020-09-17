// import axios from 'axios';
// import { CREATE_ORDER } from './constants';

// export const createOrder = () => async (dispatch) => {
//   // console.log(paymentData);
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const body = JSON.stringify();

//   try {
//     const res = await axios.post(
//       `/api/braintree/payment/${userId}`,
//       body,
//       config
//     );
//     dispatch({
//       type: CREATE_ORDER,
//       payload: res.data,
//     });

//     localStorage.removeItem('cartProducts');
//     // console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
