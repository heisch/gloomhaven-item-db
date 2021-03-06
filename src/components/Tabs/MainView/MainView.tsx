import React, { useEffect, useState } from 'react';
import { Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import {  useDispatch } from 'react-redux';
import { SpoilerFilter, storeSpoilerFilter, restoreFromLocalStorage, getSpoilerFilter, SpoilerMap } from '../../../State/SpoilerFilter';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'
import {useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';
import { LOCAL_STORAGE_PREFIX } from '../../../games/GameData';
import PurchaseItem from "./PurchaseItem"
import { ItemManagementType } from '../../../State/Types';

const MainView = () => {
    const { localStorageKey, convertSavedData, gameType} = useGame();
    const {all, lockSpoilerPanel} = getSpoilerFilter();
    const dispatch = useDispatch();
    const items = useItems();
    const [importedSpoilerFilters, setImportedSpoilerFilters] = useState<SpoilerMap|undefined>(undefined);
    const loadGamesFromStorage = () => {
        Object.values(GameType).forEach( gt => {
            const value = restoreFromLocalStorage(LOCAL_STORAGE_PREFIX + gt);
            dispatch(storeSpoilerFilter({value, gameType:gt as GameType}));
        })
    }

    useEffect( () => {
        convertSavedData(localStorageKey);
        loadGamesFromStorage();
        setImportedSpoilerFilters(parseHash());
    },[]);

    const parseHash = (): any | undefined => {
        const importHash = location.hash.substr(1) || undefined;
        if (importHash !== undefined)
        {
            try {
                return JSON.parse(atob(importHash));
            } catch (e) {
                return undefined;
            }
        }
        return undefined;
    }

    const importFromHash = () => {
        const hashConfig = importedSpoilerFilters;
        if (hashConfig !== undefined) {
            if (hashConfig.hasOwnProperty(GameType.Gloomhaven)) {
                   Object.values(GameType).forEach( (gt:GameType) => {
                       const spoilerFilter = hashConfig[gt];
                       if (spoilerFilter !== undefined) {
                           if (spoilerFilter.hasOwnProperty("enableStoreStockManagement")) { 
                               // @ts-ignore
                                if (spoilerFilter.enableStoreStockManagement)  {
                                    spoilerFilter.itemMangementType = ItemManagementType.Simple;
                                }
                                else {
                                    spoilerFilter.itemMangementType = ItemManagementType.None;
                                }
                                // @ts-ignore
                                delete spoilerFilter.enableStoreStockManagement
                           }
                            localStorage.setItem(LOCAL_STORAGE_PREFIX + gt, JSON.stringify(spoilerFilter));
                            dispatch(storeSpoilerFilter({value:spoilerFilter, gameType:gt}));
                       }
                })
            }
            else if (hashConfig.hasOwnProperty("prosperity")) {
                // This is the old version of the data before other games were added.  Just add it to gloomhaven.
                const value = hashConfig as SpoilerFilter;
                localStorage.setItem(LOCAL_STORAGE_PREFIX + GameType.Gloomhaven, JSON.stringify(value));
                dispatch(storeSpoilerFilter({value, gameType: GameType.Gloomhaven}));
            }
            setImportedSpoilerFilters(undefined);
          }
          location.hash = "";
    }

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
            <Modal basic size='small' open={importedSpoilerFilters !== undefined}>
                <Header icon='cloud download' content='Apply Configuration from Link'/>
                <Modal.Content>
                    <p>
                        Do you want to load the configuration passed with this link?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => {
                        location.hash = '';
                        setImportedSpoilerFilters(undefined);
                    }}>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted onClick={() => importFromHash()}>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>

            <PurchaseItem/>

            <div className={all ? 'spoiler' : ''}>
                <Tab panes={panes} defaultActiveIndex={0}/>
            </div>
            <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
        </>
    );

}

export default MainView;
