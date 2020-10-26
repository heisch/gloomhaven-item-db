import React, { useEffect, useState } from 'react';
import { Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import {  useDispatch } from 'react-redux';
import { SpoilerFilter, storeSpoilerFilter, restoreFromLocalStorage, getSpoilerFilter } from '../../../State/SpoilerFilter';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'
import {useGame } from '../../Game/GameProvider';
import {store} from '../../../App'
import { GameType } from '../../../games';
import { LOCAL_STORAGE_PREFIX } from '../../../games/GameData';

const MainView = () => {
    const { localStorageKey, convertSavedData, key:gameType } = useGame();
    const {all, lockSpoilerPanel} = getSpoilerFilter();
    const dispatch = useDispatch();
    const items = useItems();
    const [importModalOpen, setImportModalOpen] = useState(false);

    useEffect( () => {
        store.subscribe (() => {
            localStorage.setItem(localStorageKey, JSON.stringify(store.getState().spoilerReducer[gameType]));
        });
    }, [localStorageKey]);
    
    const loadGamesFromStorage = () => {
        Object.values(GameType).forEach( gt => {
            const value = restoreFromLocalStorage(LOCAL_STORAGE_PREFIX + gt);
            dispatch(storeSpoilerFilter({value, gameType:gt as GameType}));
        })
    }

    useEffect( () => {
        convertSavedData(localStorageKey);
        loadGamesFromStorage();
        setImportModalOpen(parseHash() != undefined);
    },[]);

    const parseHash = (): SpoilerFilter | undefined => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let hash = urlParams.get('importHash') || undefined;
        if (hash === undefined)
        {
            hash = location.hash.substr(1);
        }
        if (hash === undefined)
        {
            return undefined;
        }
        const config = atob(hash);
        try {
            return JSON.parse(config).hasOwnProperty('prosperity') ? JSON.parse(config) : undefined;
        } catch (e) {
            return undefined;
        }
    }

    const importFromHash = () => {
        const hashConfig = parseHash();
        if (hashConfig !== undefined) {
            localStorage.setItem(localStorageKey, JSON.stringify(hashConfig));
            setImportModalOpen(false);
            const loadedSpoilerFilter = restoreFromLocalStorage(localStorageKey);
            dispatch(storeSpoilerFilter({value:loadedSpoilerFilter, gameType}));
          }
        location.hash = '';
        location.search = '';
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
            <Modal basic size='small' open={importModalOpen}>
                <Header icon='cloud download' content='Apply Configuration from Link'/>
                <Modal.Content>
                    <p>
                        Do you want to load the configuration passed with this link?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => {
                        location.hash = '';
                        setImportModalOpen(false);
                    }}>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted onClick={() => importFromHash()}>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>

            <div className={all ? 'spoiler' : ''}>
                <Tab panes={panes} defaultActiveIndex={0}/>
            </div>
            <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
        </>
    );

}

export default MainView;
