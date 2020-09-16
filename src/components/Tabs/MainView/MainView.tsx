import React, { useEffect, useState } from 'react';
import { Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import {  useDispatch } from 'react-redux';
import SpoilerFilter, { storeSpoilerFilter, restoreFromLocalStorage, getSpoilerFilter } from '../../../State/SpoilerFilter';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'
import {useGame } from '../../Game/GameProvider';
import {store} from '../../../App'

const MainView = () => {
    const { localStorageKey, convertSavedData, name, key } = useGame();
    const {all, lockSpoilerPanel} = getSpoilerFilter();
    const dispatch = useDispatch();
    const items = useItems();
    const [importModalOpen, setImportModalOpen] = useState(false);

    useEffect( () => {
        store.subscribe (() => {
            console.log("writing", store.getState().spoilerFilter[key])
            localStorage.setItem(localStorageKey, JSON.stringify(store.getState().spoilerFilter[key]));
        });
    }, [localStorageKey]);
    

    useEffect( () => {
        convertSavedData(localStorageKey);
        const loadedSpoilerFilter = restoreFromLocalStorage(localStorageKey);
        dispatch(storeSpoilerFilter(loadedSpoilerFilter, key));
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
            localStorage.setItem(localStorageKey, JSON.stringify(hashConfig));
            setImportModalOpen(false);
            const loadedSpoilerFilter = restoreFromLocalStorage(localStorageKey);
            dispatch(storeSpoilerFilter(loadedSpoilerFilter, key));
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
            <Header size={'huge'} content={name}/>
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
