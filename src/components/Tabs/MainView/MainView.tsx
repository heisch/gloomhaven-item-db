import React from 'react';
import { Tab } from 'semantic-ui-react';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import ImportData from './ImportData';
import { isFlagEnabled } from '../../../helpers';
import { Account } from '../Account/Account';

// .git ignore vscode file
// List mode looks crappy
// Buying uses the first element even if nothing is selected
// Look at Object.assign calls

const MainView = () => {
    const { filterOptions: { all}, lockSpoilerPanel } = useFilterOptions();
    const items = useItems();
    const sharingEnabled = isFlagEnabled("sharing");

    const panes = [];
    
    panes.push({ menuItem: 'Item List',                render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<ItemList items={items}/>}</Tab.Pane> });
    
    if (!lockSpoilerPanel) {
        panes.push(
            { menuItem: 'Spoiler Configuration',    render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<SpoilerFilters/>}</Tab.Pane>},
            { menuItem: 'Share',                    render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<Share/>}</Tab.Pane>},
            );
            if (sharingEnabled) {
                panes.push(
                    { menuItem: 'Account',                    render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<Account/>}</Tab.Pane>},
                );
            }
        }
        

        panes.push(
            { menuItem: 'About',                    render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<></>}</Tab.Pane>},
        );  

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
