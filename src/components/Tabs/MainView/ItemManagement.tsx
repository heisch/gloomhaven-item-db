import React from 'react';
import { GloomhavenItem } from "../../../State/Types";
import NoItemManagement from './ItemManagement/NoItemManagement';
import SimpleItemManagement from './ItemManagement/SimpleItemManagement';
import PartyItemManagement from './ItemManagement/PartyItemManagement';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const {item} = props;

    return <> 
            <NoItemManagement item={item}/>
            <SimpleItemManagement item={item}/>
            <PartyItemManagement item={item}/>
        </>
   
}

export default ItemManagement;
