import React, { Component, Fragment } from 'react';
import HighChart from '../../components/Highcharts';

export class AdminTransactions extends Component {
  render() {
    const { transactions } = this.props;
    return (
      <>
        <div className="table_left">
          <h3>Transaction</h3>
          <div className="trans_chart">
            {/*<div className="table_wrapper">
            <div className="table-responsive">
              <table id="example" className="table table-striped table-bordered invoice_table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Amount</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.transactions.transactions.length
                    ? this.props.transactions.transactions.map((listValue, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{listValue.first_name}</td>
                            <td>{listValue.last_name}</td>
                            <td>{listValue.email}</td>
                          </tr>
                        );
                      })
                    : ''}
                </tbody>
              </table>
            </div>
          </div> */}
            <HighChart transactions={transactions} />
          </div>
        </div>
      </>
    );
  }
}

export default AdminTransactions;
