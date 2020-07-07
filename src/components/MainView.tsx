import React, { useEffect, useState } from 'react';
import { RootState } from '../State/Reducer';
import { Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import SpoilerFilter, { OldSpoilerFilter, storeSpoilerFilter } from '../State/SpoilerFilter';
import { SoloClassShorthand, SortDirection, GloomhavenItem, GloomhavenItemSlot, GloomhavenItemSourceType } from '../State/Types';
import ItemList from './Tabs/ItemList';
import SpoilerFilters from './Tabs/SpoilerFilters';
import Share from './Tabs/Share';
import { Helpers } from '../helpers';

const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];
const filterLocalStorageKey = 'ItemView:spoilerFilter';

const MainView = () => {
    const { all, lockSpoilerPanel, prosperity, soloClass, item: spoilerFilterItem } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const { sorting, filter } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];
    const dispatch = useDispatch();
    const [items, setItems] = useState<Array<GloomhavenItem>>([]);
    const [importModalOpen, setImportModalOpen] = useState(false);

    const deSpoilerItemSource = (source:string): string => {
        return source.replace(/{(.{2})}/, (m, m1) => '<img class="icon" src="'+require('../img/classes/'+m1+'.png')+'" alt="" />');
    }

    // TODO: Move this into a hook?
    useEffect( () => {
        const items: Array<GloomhavenItem> = require('../data/items.json');

        let slots: Array<string> = [];
        let sources: Array<string> = [];
        let sourceTypes: Array<GloomhavenItemSourceType> = [];

        items.forEach(item => {

            item.descHTML = Helpers.parseEffectText(item.desc);

            let sourceType: string = item.source;

            item.sourceTypes = [];

            item.source.split("\n").forEach(itemSource => {
                if (itemSource.match(/^Prosperity Level \d/)) {
                    item.sourceTypes.push("Prosperity");
                } else if (itemSource.match(/^Reward from Solo Scenario /)) {
                    item.sourceTypes.push("Solo Scenario");
                } else if (itemSource.match(/^(Reward From )?Scenario #\d+/)) {
                    item.sourceTypes.push("Scenario");
                } else if (itemSource === "Random Item Design") {
                    item.sourceTypes.push("Random Item Design");
                } else if (itemSource.match(/^City Event \d+/)) {
                    item.sourceTypes.push("City Event");
                } else if (itemSource.match(/^Road Event \d+/)) {
                    item.sourceTypes.push("Road Event");
                }
            });

            item.source = item.source.replace(/Reward from /ig, '');
            item.source = item.source.replace(/ ?\((Treasure #\d+)\)/ig, "\n$1");
            item.source = item.source.replace(/Solo Scenario #\d+ — /i, 'Solo ');
            item.source = deSpoilerItemSource(item.source);

            slots.push(item.slot);
            sources.push(item.source);

            sourceTypes = [...sourceTypes, ...item.sourceTypes];

            if (!sources.includes(sourceType)) sources.push(sourceType);
        });

        slots = Helpers.uniqueArray(slots);
        sourceTypes = Helpers.uniqueArray(sourceTypes);
        sources = Helpers.uniqueArray(sources);

        setItems(items);
        restoreFromLocalStorage();

        setImportModalOpen(parseHash() != undefined);
    },[]);

    // TODO: Use a Hook for filtering?
    const getSpoilerFilteredItems = () => {
        if (all) return items;
        return (items as Array<GloomhavenItem>).filter(item => {
            if (item.id <= (prosperity+1)*7) return true;
            if (item.id === 134 && soloClass.includes('BR')) return true;
            if (item.id === 135 && soloClass.includes('TI')) return true;
            if (item.id === 136 && soloClass.includes('SW')) return true;
            if (item.id === 137 && soloClass.includes('SC')) return true;
            if (item.id === 138 && soloClass.includes('CH')) return true;
            if (item.id === 139 && soloClass.includes('MT')) return true;
            if (item.id === 140 && soloClass.includes('SK')) return true;
            if (item.id === 141 && soloClass.includes('QM')) return true;
            if (item.id === 142 && soloClass.includes('SU')) return true;
            if (item.id === 143 && soloClass.includes('NS')) return true;
            if (item.id === 144 && soloClass.includes('PH')) return true;
            if (item.id === 145 && soloClass.includes('BE')) return true;
            if (item.id === 146 && soloClass.includes('SS')) return true;
            if (item.id === 147 && soloClass.includes('DS')) return true;
            if (item.id === 148 && soloClass.includes('SB')) return true;
            if (item.id === 149 && soloClass.includes('EL')) return true;
            if (item.id === 150 && soloClass.includes('BT')) return true;
            return spoilerFilterItem.includes(item.id);
        });
    }

    const getFilteredItems = () => {
        let items = getSpoilerFilteredItems();
        items = (items as Array<GloomhavenItem>).filter(item => {
            let hit = true;
            if (filter.slot) hit = hit && item.slot === filter.slot;
            if (filter.search.length > 2 && hit) hit = hit && (!!item.name.match(new RegExp(filter.search, 'i')) || !!item.desc.match(new RegExp(filter.search, 'i')));
            return hit;
        });
        return items;
    }

    const getSortedAndFilteredItems = () => {
        const items = getFilteredItems();
        return (items as Array<GloomhavenItem>).sort((itemA, itemB) => {
            let value = 0;
            switch (sorting.property) {
                case "name":
                    value = itemA[sorting.property].localeCompare(itemB[sorting.property]);
                    break;
                case "slot":
                    if (gloomhavenItemSlots.indexOf(itemA.slot) === gloomhavenItemSlots.indexOf(itemB.slot)) {
                        value = 0
                    } else {
                        value = gloomhavenItemSlots.indexOf(itemA.slot) > gloomhavenItemSlots.indexOf(itemB.slot) ? 1 : -1
                    }
                    break;
                case "cost":
                case "id":
                    if (itemA[sorting.property] === itemB[sorting.property]) return 0;
                    value = itemA[sorting.property] > itemB[sorting.property] ? 1 : -1;
                    break;
                case "use":
                    // assign a dummy value to sort by
                    const itemAuse = itemA.spent ? 'c' : (itemA.consumed ? 'b' : 'a');
                    const itemBuse = itemB.spent ? 'c' : (itemB.consumed ? 'b' : 'a');
                    value = itemAuse.localeCompare(itemBuse);
                    break;
            }
            return sorting.direction === SortDirection.ascending ? value : value * -1;
        });
    }

    const parseHash = (): SpoilerFilter | undefined => {
        const hash = location.hash.substr(1);
        const config = atob(hash);
        try {
            return JSON.parse(config).hasOwnProperty('prosperity') ? JSON.parse(config) : undefined;
        } catch (e) {
            return undefined;
        }
    }

    // TODO: Move this into it's own section?
    const restoreFromLocalStorage = () => {
        const storage = localStorage.getItem(filterLocalStorageKey);

        const initialSpoilerFilter: SpoilerFilter = {
            all: false,
            prosperity: 1,
            item: [],
            itemsInUse: {},
            soloClass: [],
            discount: 0,
            displayAs: 'list',
            enableStoreStockManagement: false,
            lockSpoilerPanel: false,
        };

        let spoilerFilter = initialSpoilerFilter;

        if (typeof storage === 'string') {
            const configFromStorage: OldSpoilerFilter = JSON.parse(storage);

            // convert from old object style to array
            if (!configFromStorage.soloClass.hasOwnProperty('length')) {
                const soloClass: Array<SoloClassShorthand> = [];
                Object.keys(configFromStorage.soloClass).forEach(k => {
                    if (configFromStorage.soloClass[k] === true) {
                        soloClass.push(k as SoloClassShorthand);
                    }
                });
                configFromStorage.soloClass = soloClass;
            }
            // convert from old object style to array
            if (!configFromStorage.item.hasOwnProperty('length')) {
                const items: Array<number> = [];
                Object.keys(configFromStorage.item).forEach(k => {
                    if (configFromStorage.item[k] === true) {
                        items.push(parseInt(k));
                    }
                });
                configFromStorage.item = items;
            }

            spoilerFilter = Object.assign({}, initialSpoilerFilter, configFromStorage);
        }

        dispatch(storeSpoilerFilter(spoilerFilter));
    }


    const importFromHash = () => {
        const hashConfig = parseHash();
        if (hashConfig !== undefined) {
            localStorage.setItem(filterLocalStorageKey, JSON.stringify(hashConfig));
            setImportModalOpen(false);
            restoreFromLocalStorage();
        }
        location.hash = '';
    }

    let panes = [
        { menuItem: 'Item List',                render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{<ItemList items={getSortedAndFilteredItems()}/>}</Tab.Pane> },
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