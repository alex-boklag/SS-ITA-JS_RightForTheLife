import React from 'react';
import Tab from '../Tab';
import DonateInfo from '../DonateInfo';
import SuppliesTable from '../SuppliesTable';

const TabBar = ({
  isEdit,
  isEditModeBarOpen,
  updateIsEdit,
  updateIsEditModeBarOpen,
  donateInfo,
  activeTab,
  updateActiveTab,
  stateSetters,
  toggleEditStyle
}) => {
  const tabLabels = ['Помочь деньгами', 'Нужды приюта'];

  return (
    <div>
      <ul className="flex">
        {tabLabels.map(label => (
          <Tab
            key={label}
            label={label}
            onClick={tabLabel => updateActiveTab(tabLabel)}
            isEditModeBarOpen={isEditModeBarOpen}
            active={label === activeTab}
          />
        ))}
      </ul>
      <div>
        {activeTab === tabLabels[0] ? (
          <DonateInfo
            isEdit={isEdit}
            isEditModeBarOpen={isEditModeBarOpen}
            updateIsEdit={updateIsEdit}
            updateIsEditModeBarOpen={updateIsEditModeBarOpen}
            donateInfo={donateInfo}
            stateSetters={stateSetters}
            toggleEditStyle={toggleEditStyle}
          />
        ) : (
            <SuppliesTable
              isEdit={isEdit}
              isEditModeBarOpen={isEditModeBarOpen}
              updateIsEdit={updateIsEdit}
              updateIsEditModeBarOpen={updateIsEditModeBarOpen}
            />
          )}
      </div>
    </div>
  );
};

export default TabBar;
