import React, { useEffect, useState } from 'react';
import { RootState } from '../../../State/Reducer';
import { Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import SpoilerFilter, { storeSpoilerFilter, restoreFromLocalStorage } from '../../../State/SpoilerFilter';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'
import {useGame, GameType } from '../../Game/GameProvider';
import {store} from '../../../App'

const filterLocalStorageKey = 'ItemView:spoilerFilter';

const MainView = () => {
    const gameType = useGame();
    const { all, lockSpoilerPanel} = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    console.log("Something", store);
    const dispatch = useDispatch();
    const items = useItems();
    const [importModalOpen, setImportModalOpen] = useState(false);

    const getFilterStorageKey = () => {
        return filterLocalStorageKey + "_" + gameType;
    }

    useEffect( () => {
        store.subscribe (() => {
            localStorage.setItem(getFilterStorageKey(), JSON.stringify(store.getState().spoilerFilter));
        });
    }, [gameType]);
    

    useEffect( () => {
        let loadedSpoilerFilter;

        // For GH try to load the old key
        if (gameType === GameType.GH) {
            // First try to load fromt the old key
            const loadedSpoilerFilterString = localStorage.getItem(filterLocalStorageKey)
            localStorage.removeItem(filterLocalStorageKey);

            // if it exists then it's a gloomhaven storage. Set it tot he new one
            if (loadedSpoilerFilterString) {
                localStorage.setItem(getFilterStorageKey(), loadedSpoilerFilterString);
                loadedSpoilerFilter = JSON.parse(loadedSpoilerFilterString);
            }
        }

        // if we still don't have one here, we're either non existent or we need to load it from the new one.
        if (!loadedSpoilerFilter) {
            loadedSpoilerFilter = restoreFromLocalStorage(getFilterStorageKey());
        }
        
        if (loadedSpoilerFilter)
        {
            dispatch(storeSpoilerFilter(loadedSpoilerFilter));
        }
        setImportModalOpen(parseHash() != undefined);
    },[]);

    const parseHash = (): SpoilerFilter | undefined => {
        const hash = location.hash.substr(1);
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
            const filterStorageKey = getFilterStorageKey();
            localStorage.setItem(filterStorageKey, JSON.stringify(hashConfig));
            setImportModalOpen(false);
            const loadedSpoilerFilter = restoreFromLocalStorage(filterStorageKey);
            dispatch(storeSpoilerFilter(loadedSpoilerFilter));
        }
        location.hash = '';
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
            {gameType}
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
