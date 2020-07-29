import React, { useEffect, useState } from 'react';
import { RootState } from '../../../State/Reducer';
import { Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import SpoilerFilter, { storeSpoilerFilter, restoreFromLocalStorage } from '../../../State/SpoilerFilter';
import ItemList from './ItemList';
import SpoilerFilters from '../SpoilerFilters/SpoilerFilters';
import Share from '../Share';
import useItems  from '../../../hooks/useItems'

const filterLocalStorageKey = 'ItemView:spoilerFilter';

const MainView = () => {
    const { all, lockSpoilerPanel} = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const dispatch = useDispatch();
    const items = useItems();
    const [importModalOpen, setImportModalOpen] = useState(false);

    useEffect( () => {
        const loadedSpoilerFilter = restoreFromLocalStorage();
        dispatch(storeSpoilerFilter(loadedSpoilerFilter));

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
            localStorage.setItem(filterLocalStorageKey, JSON.stringify(hashConfig));
            setImportModalOpen(false);
            const loadedSpoilerFilter = restoreFromLocalStorage();
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
        <React.Fragment>

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
        </React.Fragment>
    );

}

export default MainView;
