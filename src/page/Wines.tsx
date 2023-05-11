import React from 'react';
import AddWineWrapper from '../component/AddWineWrapper';
import WineTable from '../component/WineTable';

const Wines: React.FunctionComponent = () => (
    <div>
        <WineTable/>
        <AddWineWrapper/>
    </div>
);

export default Wines;
