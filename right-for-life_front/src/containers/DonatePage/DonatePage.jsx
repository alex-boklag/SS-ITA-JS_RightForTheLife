import React from 'react';
import TabBar from '../../components/TabBar';
import { BE_URL } from '../../helpers/configs.js';

import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';

import { DONATE } from '../../rootConstants';

const DonatePage = ({ data }) => {

    const { title, manager, summary, paymentMethodsInfo, moneyTransferInfo } = data;

    return (
        <div className="text-lightgray-700">
            <header className="mb-5">
                <h1 className="text-4xl uppercase font-bold">{title}</h1>
            </header>
            <section className="mb-5">
                <h2 className="text-2xl font-bold mb-3">Куратор мини-приюта — {manager}</h2>
                <p className="text-lg">{summary}</p>
            </section>
            <TabBar
                paymentMethodsInfo={paymentMethodsInfo}
                moneyTransferInfo={moneyTransferInfo}
            />
        </div>
    );
};

const dataUrl = `${BE_URL}/donate`;
const wrappedComponent = withFetchDataIndicators(DonatePage, DONATE, dataUrl);

export { wrappedComponent as DonatePage };