import React, {Component} from 'react';
import {Button, Checkbox, Form, Header, Icon, Image, Input, Message, Modal, Popup, Tab, Table, Item} from 'semantic-ui-react';
import {Helpers} from "./helpers";
import { SortDirection, SortProperty, SoloClassShorthand, GloomhavenItem, GloomhavenItemSlot, GloomhavenItemSourceType } from "./State/Types";
import { SpoilerFilter, OldSpoilerFilter } from './State/SpoilerFilter';
import { connect } from 'react-redux';
import { ItemViewState } from './State/ItemViewState';
import { storeItems, storeImportModalOpen, storeFilterSlot, storeSortingProperty, storeFilterSearch, storeShareLockSpoilerPanel } from './State/ItemViewState';
import { storeSpoilerFilter, storeProsperity, storeSoloClass, storeItem, storeItemsInUse, storeAll, storeEnableStoreStockManagement, storeDisplayAs, storeDiscount } from './State/SpoilerFilter';
import ItemCard from './components/ItemCard';
import ItemManagement from './components/ItemManagement';

const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT'];

interface ItemViewProps { itemViewState: ItemViewState, spoilerFilter: SpoilerFilter, dispatch: any}

class ItemView extends Component<ItemViewProps, ItemViewState> {

    filterLocalStorageKey = 'ItemView:spoilerFilter';

    constructor(props: ItemViewProps) {
        super(props);

        const items: Array<GloomhavenItem> = require('./data/items.json');

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
            item.source = ItemView.deSpoilerItemSource(item.source);

            slots.push(item.slot);
            sources.push(item.source);

            sourceTypes = [...sourceTypes, ...item.sourceTypes];

            if (!sources.includes(sourceType)) sources.push(sourceType);
        });

        slots = Helpers.uniqueArray(slots);
        sourceTypes = Helpers.uniqueArray(sourceTypes);
        sources = Helpers.uniqueArray(sources);

        this.props.dispatch(storeItems(items));
        this.restoreFromLocalStorage();

        this.props.dispatch(storeImportModalOpen(ItemView.parseHash() != undefined));
    }

    static parseHash(): SpoilerFilter | undefined {
        const hash = location.hash.substr(1);
        const config = atob(hash);
        try {
            return JSON.parse(config).hasOwnProperty('prosperity') ? JSON.parse(config) : undefined;
        } catch (e) {
            return undefined;
        }
    }

    importFromHash() {
        const hashConfig = ItemView.parseHash();
        if (hashConfig !== undefined) {
            localStorage.setItem(this.filterLocalStorageKey, JSON.stringify(hashConfig));
            this.props.dispatch(storeImportModalOpen(false));
            this.restoreFromLocalStorage();
        }
        location.hash = '';
    }

    restoreFromLocalStorage() {
        const storage = localStorage.getItem(this.filterLocalStorageKey);

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

        this.props.dispatch(storeSpoilerFilter(spoilerFilter));
    }

    static deSpoilerItemSource(source:string): string {
        return source.replace(/{(.{2})}/, (m, m1) => '<img class="icon" src="'+require('./img/classes/'+m1+'.png')+'" alt="" />');
    }

    static getSlotImageSrc(slot: GloomhavenItemSlot):string {
        let src: string;
        switch (slot) {
            case "Head":
                src = 'head';
                break;
            case "Body":
                src = 'body';
                break;
            case "Legs":
                src = 'legs';
                break;
            case "One Hand":
                src = '1h';
                break;
            case "Two Hands":
                src = '2h';
                break;
            case "Small Item":
                src = 'small';
                break;
            default:
                throw new Error(`item slot unrecognized: ${slot}`);
        }
        return require('./img/icons/equipment_slot/'+src+'.png');
    }

    setProsperityFilter(prosperity: number) {
        this.props.dispatch(storeProsperity(prosperity));
    }

    setFilterSlot(slot?: GloomhavenItemSlot) {
        const state = this.props.itemViewState;
        state.filter.slot = slot;
        this.props.dispatch(storeFilterSlot(slot));
    }

    setSorting(property: SortProperty) {
        const {sorting} = this.props.itemViewState;;
        if (property === sorting.property) {
            sorting.direction = sorting.direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
        } else {
            sorting.direction = SortDirection.ascending;
        }
        sorting.property = property;
        this.props.dispatch(storeSortingProperty(property));
    }

    toggleClassFilter(key: SoloClassShorthand) {
        const {soloClass} = this.props.spoilerFilter;
        if (soloClass.includes(key)) {
            soloClass.splice(soloClass.indexOf(key), 1);
        } else {
            soloClass.push(key)
        }
        this.props.dispatch(storeSoloClass(soloClass));
    }

    toggleItemFilter(key: number) {
        const {item} = this.props.spoilerFilter;
        if (item.includes(key)) {
            item.splice(item.indexOf(key), 1);
        } else {
            item.push(key)
        }
        this.props.dispatch(storeItem(item));
    }

    getSpoilerFilteredItems() {
        const {items} = this.props.itemViewState;;
        const spoilerFilter = this.props.spoilerFilter;
        if (spoilerFilter.all) return items;
        return items.filter(item => {
            if (item.id <= (spoilerFilter.prosperity+1)*7) return true;
            if (item.id === 134 && spoilerFilter.soloClass.includes('BR')) return true;
            if (item.id === 135 && spoilerFilter.soloClass.includes('TI')) return true;
            if (item.id === 136 && spoilerFilter.soloClass.includes('SW')) return true;
            if (item.id === 137 && spoilerFilter.soloClass.includes('SC')) return true;
            if (item.id === 138 && spoilerFilter.soloClass.includes('CH')) return true;
            if (item.id === 139 && spoilerFilter.soloClass.includes('MT')) return true;
            if (item.id === 140 && spoilerFilter.soloClass.includes('SK')) return true;
            if (item.id === 141 && spoilerFilter.soloClass.includes('QM')) return true;
            if (item.id === 142 && spoilerFilter.soloClass.includes('SU')) return true;
            if (item.id === 143 && spoilerFilter.soloClass.includes('NS')) return true;
            if (item.id === 144 && spoilerFilter.soloClass.includes('PH')) return true;
            if (item.id === 145 && spoilerFilter.soloClass.includes('BE')) return true;
            if (item.id === 146 && spoilerFilter.soloClass.includes('SS')) return true;
            if (item.id === 147 && spoilerFilter.soloClass.includes('DS')) return true;
            if (item.id === 148 && spoilerFilter.soloClass.includes('SB')) return true;
            if (item.id === 149 && spoilerFilter.soloClass.includes('EL')) return true;
            if (item.id === 150 && spoilerFilter.soloClass.includes('BT')) return true;
            return spoilerFilter.item.includes(item.id);
        });
    }

    getFilteredItems() {
        const {filter} = this.props.itemViewState;
        let items = this.getSpoilerFilteredItems();
        items = items.filter(item => {
            let hit = true;
            if (filter.slot) hit = hit && item.slot === filter.slot;
            if (filter.search.length > 2 && hit) hit = hit && (!!item.name.match(new RegExp(filter.search, 'i')) || !!item.desc.match(new RegExp(filter.search, 'i')));
            return hit;
        });
        return items;
    }

    getSortedAndFilteredItems() {
        const {sorting} = this.props.itemViewState;;
        const items = this.getFilteredItems();
        return items.sort((itemA, itemB) => {
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

    getItemById(id: number): GloomhavenItem {
        const {items} = this.props.itemViewState;
        const item = items.find(i => i.id === id);
        if (item === undefined) throw new Error('invalid item id');
        return item;
    }

    toggleItemInUse(id: number, bit: number) {

        const {itemsInUse} = this.props.spoilerFilter;

        itemsInUse[id] = itemsInUse[id] & bit ? itemsInUse[id] ^ bit : itemsInUse[id] | bit;

        if (itemsInUse[id] === 0) {
            delete (itemsInUse[id]);
        }

        this.props.dispatch(storeItemsInUse(itemsInUse));
    }

    toggleShowAll() {
        const {all} = this.props.spoilerFilter;
        this.props.dispatch(storeAll(!all));
    }

    renderShareTab() {
        const {shareLockSpoilerPanel} = this.props.itemViewState;
        const spoilerFilter = this.props.spoilerFilter;

        const shareUrl = location.origin + location.pathname + '#' + btoa(JSON.stringify({
            ...spoilerFilter,
            lockSpoilerPanel: shareLockSpoilerPanel
        }));

        return (
            <React.Fragment>
                <p>Here you can generate a link to this app with your current spoiler configuration.</p>
                <Form>
                    <Form.Group inline>
                        <label htmlFor={'share-spoiler-toggle'}>Deactivate spoiler configuration panel for people
                            following your shared link.</label>
                        <Form.Checkbox id={'share-spoiler-toggle'} toggle className={'share-spoiler-toggle'}
                                       checked={shareLockSpoilerPanel}
                                       onChange={() => this.props.dispatch( storeShareLockSpoilerPanel(!shareLockSpoilerPanel))}/>
                    </Form.Group>
                    {shareLockSpoilerPanel && false && <Message negative>
                        <Icon name="exclamation triangle"/>Do not open the link yourself or you will not be able to
                        change any settings anymore
                    </Message>}
                    <Form.Group>
                        <Form.Input id={'share-url-input'} width={14} value={shareUrl}/>
                        <Form.Button width={2} onClick={() => {
                            (document.getElementById('share-url-input') as HTMLInputElement).select();
                            document.execCommand("copy");
                        }}>Copy</Form.Button>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }

    renderSpoilerFilters() {

        const spoilerFilter = this.props.spoilerFilter;
        const {enableStoreStockManagement, all} = spoilerFilter;

        return (
            <React.Fragment>

                <Form>

                    <Form.Group inline>
                        <label>Respecting Spoiler Settings:</label>
                        <Button
                            color={all ? 'red' : 'blue'}
                            onClick={() => this.toggleShowAll()}
                        >
                            {all
                                ? <React.Fragment><Icon name={'eye'}/> disabled</React.Fragment>
                                : <React.Fragment><Icon name={'eye slash'}/> enabled</React.Fragment>
                            }
                        </Button>
                    </Form.Group>

                    <Form.Group inline>
                        <label>Enable Store Stock Management:</label>
                        <Form.Checkbox
                            toggle
                            checked={enableStoreStockManagement}
                            onClick={() => {
                                this.props.dispatch(storeEnableStoreStockManagement(!spoilerFilter.enableStoreStockManagement));
                            }}/>
                    </Form.Group>

                    <Form.Group inline>
                        <label>Prosperity:</label>
                        {[...Array(9).keys()].map(index => {
                            const prosperity = index + 1;
                            return (
                                <Form.Radio key={index} label={prosperity}
                                            checked={spoilerFilter.prosperity === prosperity}
                                            onChange={() => this.setProsperityFilter(prosperity)}/>
                            )})}
                    </Form.Group>

                    {spoilerFilter.prosperity < 9 && <Form.Group inline className={'inline-break'}>
                        <label>Prosperity Items:</label>
                        {/* 15-70 prosperity 2-9*/}
                        {[...Array(70 - (spoilerFilter.prosperity + 1) * 7).keys()].map((val) => {
                            const id = val + 1 + (spoilerFilter.prosperity + 1) * 7;
                            return (
                                <Form.Checkbox key={val} label={'#' + (id + '').padStart(3, '0')}
                                               checked={spoilerFilter.item.includes(id)}
                                               onChange={() => this.toggleItemFilter(id)}/>
                            )
                        })}
                    </Form.Group>}

                    <Form.Group inline className={'inline-break'}>
                        <label>Random Item Design:</label>
                        {/* 71-95 random item design*/}
                        {[...Array(25).keys()].map((val) => {
                            const id = val + 71;
                            return (
                                <Form.Checkbox key={val} label={'#' + (id + '').padStart(3, '0')}
                                               checked={spoilerFilter.item.includes(id)}
                                               onChange={() => this.toggleItemFilter(id)}/>
                            )
                        })}
                    </Form.Group>


                    <Form.Group inline className={'inline-break'}>
                        <label>Other Items:</label>
                        {/* 96-133 other items*/}
                        {[...Array(38).keys()].map((val) => {
                            const id = val + 96;
                            return (
                                <Form.Checkbox key={val} label={'#' + (id + '').padStart(3, '0')}
                                               checked={spoilerFilter.item.includes(id)}
                                               onChange={() => this.toggleItemFilter(id)}/>
                            )
                        })}
                    </Form.Group>

                    <Form.Group inline className={'inline-break'}>
                        <label>Solo Class Items:</label>
                        {GloomhavenSoloClassShorthands.map(key => (
                            <Image key={key} src={require(`./img/classes/${key}.png`)}
                                   className={'icon' + (spoilerFilter.soloClass.includes(key) ? '' : ' disabled')}
                                   onClick={() => this.toggleClassFilter(key)}/>
                        ))}
                    </Form.Group>

                </Form>
            </React.Fragment>
        );
    }

    renderSearchOptions() {
        const {filter, sorting} = this.props.itemViewState;
        const { displayAs, discount } = this.props.spoilerFilter;
        return (
            <React.Fragment>

                <Form>
                    <Form.Group inline>
                        <label>Render as:</label>
                        <Button.Group>
                            <Button color={displayAs === 'list' ? 'blue' : undefined} onClick={() => {
                                    this.props.dispatch(storeDisplayAs('list'));
                                }}>List</Button>
                            <Button.Or/>
                            <Button color={displayAs === 'images' ? 'blue' : undefined} onClick={() => {
                                    this.props.dispatch(storeDisplayAs('images'));
                                }}>Images</Button>
                        </Button.Group>
                    </Form.Group>
                    {displayAs === 'list' && <Form.Group inline>
                        <label>Reputation Discount:</label>
                        <Form.Select value={discount}
                                options={[
                                    {value: -5, text: "-5 gold"}, // (19 - 20)
                                    {value: -4, text: "-4 gold"}, // (15 - 18)
                                    {value: -3, text: "-3 gold"}, // (11 - 14)
                                    {value: -2, text: "-2 gold"}, // (7 - 13)
                                    {value: -1, text: "-1 gold"}, // (3 - 6)
                                    {value: 0, text: "none"}, // (-2 - 2)
                                    {value: 1, text: "+1 gold"}, // (-3 - -6)
                                    {value: 2, text: "+2 gold"}, // (-7 - -10)
                                    {value: 3, text: "+3 gold"}, // (-11 - -14)
                                    {value: 4, text: "+4 gold"}, // (-15 - -18)
                                    {value: 5, text: "+5 gold"}, // (-19 - -20)
                                ]}
                                onChange={(obj, e) => {
                                    this.props.dispatch(storeDiscount(typeof e.value === 'number' ? e.value : 0));
                                }}
                        />
                    </Form.Group>}
                    {displayAs === 'images' && <Form.Group inline>
                        <label>Sort By:</label>
                        <Form.Select
                            value={sorting.property}
                            options={[
                                {value: 'id', text: 'Item Number'},
                                {value: 'slot', text: 'Equipment Slot'},
                                {value: 'cost', text: 'Cost'},
                                {value: 'name', text: 'Name'},
                                {value: 'source', text: 'Source'},
                                {value: 'use', text: 'Use'}
                            ]}
                            onChange={(obj, e) => this.setSorting(e.value as SortProperty)}
                        />
                    </Form.Group>}
                    <Form.Group inline>
                        <label>Filter Slot:</label>
                        <Form.Radio label={'all'} checked={filter.slot === undefined} onChange={() => this.setFilterSlot(undefined)}/>
                        {gloomhavenItemSlots.map(slot => <Form.Radio key={slot} label={<img className={'icon'} src={ItemView.getSlotImageSrc(slot)} alt={slot}/>} checked={filter.slot === slot} onChange={() => this.setFilterSlot(slot)} alt={slot}/>)}
                    </Form.Group>
                    <Form.Group inline>
                        <label>Find Item:</label>
                        <Input
                            value={filter.search}
                            onChange={(e) => this.props.dispatch(storeFilterSearch(e.target.value))}
                            icon={{name: 'close', link: true, onClick: () => this.props.dispatch(storeFilterSearch(''))}}
                            placeholder={'Search...'}
                        />
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }

    static renderSummon(item: GloomhavenItem) {
        return item.summon === undefined ? null : (
            <React.Fragment>
                <div className={'item-summon'}>
                    <div><img src={require('./img/icons/general/heal.png')} className={'icon'} alt={'hp'}/>: {item.summon.hp}</div>
                    <div><img src={require('./img/icons/general/move.png')} className={'icon'} alt={'hp'}/>: {item.summon.move}</div>
                    <div><img src={require('./img/icons/general/attack.png')} className={'icon'} alt={'hp'}/>: {item.summon.attack}</div>
                    <div><img src={require('./img/icons/general/range.png')} className={'icon'} alt={'hp'}/>: {item.summon.range || '-'}</div>
                </div>
            </React.Fragment>
        );
    }

    renderTable() {
        const { sorting } = this.props.itemViewState;
        const { displayAs, all, discount, enableStoreStockManagement, lockSpoilerPanel, itemsInUse} = this.props.spoilerFilter;
        const items = this.getSortedAndFilteredItems();
        const itemsListAsImages = () => (
            <React.Fragment>
                {items.map(item => (
                    <ItemCard key={item.id} item={item}/>
                    ))}
            </React.Fragment>
        );
        const table = () => items.length === 0
            ? (
                <Message negative>
                    No items found matching your filters and/or search criteria
                </Message>
            )
            : (
                <React.Fragment>
                    <Table basic sortable celled className={'items-table'} unstackable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell className={'id-col'} textAlign={'right'} onClick={() => this.setSorting('id')} sorted={sorting.property === 'id' ? sorting.direction : undefined}>#</Table.HeaderCell>
                                <Table.HeaderCell className={'name-col'} selectable={false} onClick={() => this.setSorting('name')} sorted={sorting.property === 'name' ? sorting.direction : undefined}>Name</Table.HeaderCell>
                                <Table.HeaderCell className={'slot-col'} textAlign={'center'} onClick={() => this.setSorting('slot')} sorted={sorting.property === 'slot' ? sorting.direction : undefined}>Slot</Table.HeaderCell>
                                <Table.HeaderCell className={'cost-col'} textAlign={'right'} onClick={() => this.setSorting('cost')} sorted={sorting.property === 'cost' ? sorting.direction : undefined}>Cost</Table.HeaderCell>
                                <Table.HeaderCell className={'use-col'} onClick={() => this.setSorting('use')} sorted={sorting.property === 'use' ? sorting.direction : undefined}>Use</Table.HeaderCell>
                                <Table.HeaderCell className={'text-col'}>Effect</Table.HeaderCell>
                                <Table.HeaderCell className={'source-col'}>Source</Table.HeaderCell>
                                <Table.HeaderCell
                                    className={'store-inventory-col'}>{enableStoreStockManagement ? 'In Use' : 'Stock'}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map(item => {
                                const cost = discount !== 0
                                    ? (<strong className={"ui text " + (item.cost > 0 ? 'blue' : 'orange')}>{item.cost + discount}g</strong>)
                                    : (<strong>{item.cost}g</strong>);
                                return (
                                    <Table.Row key={item.id}>
                                        <Table.Cell className={'id-col'} textAlign={'right'}>#{(item.id + '').padStart(3, '0')}</Table.Cell>
                                        <Table.Cell className={'name-col'}>{item.name}</Table.Cell>
                                        <Table.Cell className={'slot-col'} textAlign={'center'}><Image src={ItemView.getSlotImageSrc(item.slot)}/></Table.Cell>
                                        <Table.Cell className={'cost-col'} textAlign={'right'}>{cost}</Table.Cell>
                                        <Table.Cell className={'use-col'} textAlign={'center'}>
                                            {item.spent && <img className={'icon'} src={require('./img/icons/general/spent.png')} alt={'icon spent'}/>}
                                            {item.consumed && <img className={'icon'} src={require('./img/icons/general/consumed.png')} alt={'icon consumed'}/>}
                                        </Table.Cell>
                                        <Table.Cell className={'text-col'}>
                                            <span dangerouslySetInnerHTML={{__html:item.descHTML}}/>
                                            {item.minusOneCardsAdded &&
                                            <React.Fragment><br/><span>Add {Helpers.numberAmountToText(item.minusOneCardsAdded)}
                                                <img className={'icon'}
                                                     src={require('./img/icons/general/modifier_minus_one.png')}
                                                     alt={'modifier -1'}/> to your attack modifier deck.</span></React.Fragment>}
                                            {item.faq && <Popup closeOnDocumentClick hideOnScroll trigger={<Icon name={'question circle'} className={'pink'}/>} header={'FAQ'} content={item.faq}/>}
                                            {ItemView.renderSummon(item)}
                                        </Table.Cell>
                                        <Table.Cell className={'source-col'}>
                                            {item.source.split("\n").map(s => <React.Fragment key={s}><span dangerouslySetInnerHTML={{__html: s}}/><br/></React.Fragment>)}
                                        </Table.Cell>
                                        <Table.Cell className={'store-inventory-col'} textAlign={'right'}>
                                            <ItemManagement item={item}/>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </React.Fragment>
            );

        return (
            <React.Fragment>

                {this.renderSearchOptions()}

                {all &&  (
                    <Message negative>
                        <Message.Header><Icon name="exclamation triangle"/>Spoiler alert</Message.Header>
                        You are currently viewing all possible items.
                    </Message>
                )}

                {displayAs === 'list' ? table() : itemsListAsImages()}

            </React.Fragment>
        );
    }

    render() {

        const {importModalOpen} = this.props.itemViewState; 
        const {all, lockSpoilerPanel} = this.props.spoilerFilter;

        let panes = [
            { menuItem: 'Item List', render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{this.renderTable()}</Tab.Pane> },
            { menuItem: 'Spoiler Configuration', render: () => <Tab.Pane className={all ? 'spoiler' : ''}>{this.renderSpoilerFilters()}</Tab.Pane>},
            {
                menuItem: 'Share',
                render: () => <Tab.Pane
                    className={all ? 'spoiler' : ''}>{this.renderShareTab()}</Tab.Pane>
            },
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
                            this.props.dispatch(storeImportModalOpen(false));
                        }}>
                            <Icon name='remove'/> No
                        </Button>
                        <Button color='green' inverted onClick={() => this.importFromHash()}>
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
}

const mapStateToProps = (state:any) => {
    return { itemViewState: state.itemViewState, spoilerFilter: state.spoilerFilter, dispatch: state.dispatch };
  };

const ConnectedApp = connect(
    mapStateToProps,
  )(ItemView);

export default ConnectedApp;

