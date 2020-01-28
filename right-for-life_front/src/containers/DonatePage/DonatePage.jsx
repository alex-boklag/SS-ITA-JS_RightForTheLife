import React from 'react';

import { DONATE } from '../../rootConstants';

import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import TabBar from '../../components/TabBar';

const DonatePage = ({ data }) => {

    const { title, manager, summary, paymentMethodsInfo, moneyTransferInfo } = data;

    return (
        <div className="min-h-full pt-16 pb-2 max-w-5xl mx-auto text-lightgray-700">
            <header className="my-5">
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

const dataUrl = 'https://student-dev-ivan.github.io/Web-UI-HW/DB/donatePageInfo.json';
const wrappedComponent = withFetchDataIndicators(DonatePage, DONATE, dataUrl);

export { wrappedComponent as DonatePage };