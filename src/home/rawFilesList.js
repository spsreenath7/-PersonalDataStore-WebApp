// import React from 'react';
// import { Table, Col, Row } from 'reactstrap';
// import axios from 'axios';

// // {
// //     "amount": "8.65",
// //     "currency": "EUR",
// //     "transdate": "02-07-2019",
// //     "transid": "eb0a58c7",
// //     "transtype": "Purchase",
// //     "user": "dfdhjk37ghhzx57",
// //     "vendor": "TESCO STORE"
// //   }

// const Transaction = (props) =>
//   <tr>
//     <th scope="row">{props.transaction.transid}</th>
//     <td>{props.transaction.transdate}</td>
//     <td>{props.transaction.transtype}</td>
//     <td>{props.transaction.user}</td>
//     <td>{props.transaction.amount}</td>
//     <td>{props.transaction.currency}</td>
//     <td>{props.transaction.vendor}</td>
//   </tr>;

// export default class TransList extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       collapse: false,
//       field: 'id',
//       order: 'desc', transtype: 'All'
//     };
//   }
//   // state = { search: '', sort: 'name' };

//   handleSort = (f, o) =>   
//         this.setState({ field: f , order: o });

//   handleTranstype = (t) =>   
//   this.setState({ transtype: t  });


//    render() {
//     //Apply filter    

    


//     let transactionRows = this.props.financePreview.map(
//       (transaction) => <Transaction transaction={transaction} />
//     );
//     return (
//       <div>
       
//         <h1>Transaction List: </h1>
//         <Row>
//           <Col md={1}> </Col>
//           <Col md={10}>
//             <Table responsive>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Date</th>
//                   <th>Type</th>
//                   <th>User</th>
//                   <th>Amount</th>
//                   <th>Currency</th>
//                   <th>Vendor</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactionRows}
                
//               </tbody>
//             </Table>
//           </Col>
//           <Col md={1}></Col>
//         </Row>
//         <span>And {this.props.financecount} records stored.</span>
//       </div>
//     );
//   }
// }

