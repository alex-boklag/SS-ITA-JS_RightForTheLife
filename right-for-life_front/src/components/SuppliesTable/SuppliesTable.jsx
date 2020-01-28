import React, { Component } from 'react';
import { SUPPLIES } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import SuppliesTableRow from '../SuppliesTableRow';
import './SuppliesTable.css';

class SuppliesTable extends Component {
  getTableBody(suppliesArr) {
    return [...suppliesArr]
      .sort((a, b) => {
        if (a.type < b.type) {
          return -1;
        }
        if (a.type > b.type) {
          return 1;
        }
        return 0;
      })
      .map(el => {
        return <SuppliesTableRow itemData={el} key={el.id} />;
      });
  }

  render() {
    const { data } = this.props;
    const tableBody =
      data.length > 0 ? this.getTableBody(data) : null;

    return (
      <table className='table-fixed mx-auto mt-6'>
        <thead>
          <tr className='text-2xl uppercase font-bold text-lightgray-700'>
            <th className='px-4 py-2'>Товар</th>
            <th className='px-4 py-2'>Тип</th>
            <th className='px-4 py-2 w-32'>Кол-во</th>
            <th className='px-4 py-2'>Инфо</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    );
  }
}

const dataApi = 'https://topvv.github.io/SoftServe-IT-Academy/Demo/Demo3/supplies.json';

export default withFetchDataIndicators(SuppliesTable, SUPPLIES, dataApi);
