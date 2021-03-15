import React from 'react';
import { Tab } from 'semantic-ui-react';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import ImportData from './ImportData';

// .git ignore vscode file
// Look at Object.assign calls

const MainView = () => {
    const { filterOptions: { all}, lockSpoilerPanel } = useFilterOptions();
    const items = useItems();

    let panes = [
        { menuItem: 'Item List',                render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<ItemList items={items}/>}</Tab.Pane> },
        { menuItem: 'Spoiler Configuration',    render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<SpoilerFilters/>}</Tab.Pane>},
        { menuItem: 'Share',                    render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<Share/>}</Tab.Pane>},
    ];

    if (lockSpoilerPanel) {
        panes = [panes[0]];
    }

    return (
        <>
            <ImportData/>
            <div className={all ? 'spoiler' : ''}>
                <Tab panes={panes} defaultActiveIndex={0}/>
            </div>
            <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
        </>
    );

}

export default MainView;
