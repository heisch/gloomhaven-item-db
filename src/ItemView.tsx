import React, {Component} from 'react';
import {Button, Checkbox, Form, Header, Icon, Image, Input, Message, Modal, Popup, Tab, Table} from 'semantic-ui-react';
import {Helpers} from "./helpers";

type GloomhavenItemSlot = 'Head' | 'Body' | 'Legs' | 'One Hand' | 'Two Hands' | 'Small Item';
const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];
type GloomhavenItemSourceType = 'Prosperity' | 'Random Item Design' | 'Scenario' | 'Treasure' | 'Solo Scenario' | 'Road Event' | 'City Event';

type SoloClassShorthand = 'BR' | 'TI' | 'SW' | 'SC' | 'CH' | 'MT' | 'SK' | 'QM' | 'SU' | 'NS' | 'PH' | 'BE' | 'SS' | 'DS' | 'SB' | 'EL' | 'BT';
const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT'];

interface GloomhavenItem {
    id: number
    name: string
    count: number
    cost: number
    slot: GloomhavenItemSlot
    source: string,
    sourceTypes: Array<GloomhavenItemSourceType>
    spent?: boolean
    consumed?: boolean
    minusOneCardsAdded?: number
    useSlots?: number
    desc: string
    descHTML: string
    faq?: string,
    summon?: {
        hp: number,
        move: number,
        attack: number,
        range: number
    }
}

type ItemViewDisplayType = 'list' | 'images';

interface SpoilerFilter {
    all: boolean
    prosperity: number
    item: Array<number>
    itemsInUse: {
        [key: number]: number
    }
    soloClass: Array<SoloClassShorthand>
    discount: number
    displayAs: ItemViewDisplayType
    enableStoreStockManagement: boolean
    lockSpoilerPanel: boolean
}

// todo: only keep during migration
interface OldSpoilerFilter extends SpoilerFilter {
    item: Array<number> | any
    soloClass: Array<SoloClassShorthand> | any
}

interface ItemViewProps {}

enum SortDirection {
    ascending = 'ascending',
    descending = 'descending'
}

type SortProperty = 'id' | 'slot' | 'cost' | 'name';

interface ItemViewState {
    items: Array<GloomhavenItem>
    spoilerFilter: SpoilerFilter
    filter: {
        slot?: GloomhavenItemSlot
        search: string
    }
    sorting: {
        direction: SortDirection
        property: SortProperty
    }
    importModalOpen: boolean
    shareLockSpoilerPanel: boolean
}

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

        const spoilerFilter: SpoilerFilter = this.restoreFromLocalStorage();
        this.state = {
            items: items,
            spoilerFilter: spoilerFilter,
            filter: {
                slot: undefined,
                search: ''
            },
            sorting: {
                direction: SortDirection.ascending,
                property: "id"
            },
            importModalOpen: ItemView.parseHash() !== undefined,
            shareLockSpoilerPanel: false
        };
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
            this.setState({...this.state, importModalOpen: false, spoilerFilter: this.restoreFromLocalStorage()})
        }
        location.hash = '';
    }

    restoreFromLocalStorage(): SpoilerFilter {
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

            return Object.assign({}, initialSpoilerFilter, configFromStorage);
        }

        return initialSpoilerFilter;
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

    static getItemImageSrc(item: GloomhavenItem): string {
        let src = '';
        let name = item.name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        if (item.id >= 64) {
            src = require('../vendor/any2cards/images/items/64-151/' + name + '.png');
        } else if (item.id <= 14) {
            src = require('../vendor/any2cards/images/items/1-14/' + name + '.png');
        } else {
            let range_from = item.id % 7 === 0
                ? Math.floor((item.id - 1) / 7) * 7
                : Math.floor((item.id) / 7) * 7;
            src = require('../vendor/any2cards/images/items/' + (range_from + 1) + '-' + (range_from + 7) + '/' + name + '.png');
        }
        return src;
    }

    setProsperityFilter(prosperity: number) {
        const state = this.state;
        state.spoilerFilter.prosperity = prosperity;
        this.storeToLocalStorageAndSetState(state);
    }

    setFilterSlot(slot?: GloomhavenItemSlot) {
        const state = this.state;
        state.filter.slot = slot;
        this.storeToLocalStorageAndSetState(state);
    }

    setSorting(property: SortProperty) {
        const {sorting} = this.state;
        if (property === sorting.property) {
            sorting.direction = sorting.direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
        } else {
            sorting.direction = SortDirection.ascending;
        }
        sorting.property = property;
        this.storeToLocalStorageAndSetState({...this.state, sorting: sorting});
    }

    toggleClassFilter(key: SoloClassShorthand) {
        const state = this.state;
        if (state.spoilerFilter.soloClass.includes(key)) {
            state.spoilerFilter.soloClass.splice(state.spoilerFilter.soloClass.indexOf(key), 1);
        } else {
            state.spoilerFilter.soloClass.push(key)
        }
        this.storeToLocalStorageAndSetState(state);
    }

    toggleItemFilter(key: number) {
        const state = this.state;
        if (state.spoilerFilter.item.includes(key)) {
            state.spoilerFilter.item.splice(state.spoilerFilter.item.indexOf(key), 1);
        } else {
            state.spoilerFilter.item.push(key)
        }
        this.storeToLocalStorageAndSetState(state);
    }

    getSpoilerFilteredItems() {
        const {items, spoilerFilter} = this.state;
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
        const {filter} = this.state;
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
        const {sorting} = this.state;
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

            }
            return sorting.direction === SortDirection.ascending ? value : value * -1;
        });
    }

    getItemById(id: number): GloomhavenItem {
        const {items} = this.state;
        const item = items.find(i => i.id === id);
        if (item === undefined) throw new Error('invalid item id');
        return item;
    }

    toggleItemInUse(id: number, bit: number) {

        const {spoilerFilter} = this.state;

        spoilerFilter.itemsInUse[id] = spoilerFilter.itemsInUse[id] & bit ? spoilerFilter.itemsInUse[id] ^ bit : spoilerFilter.itemsInUse[id] | bit;

        if (spoilerFilter.itemsInUse[id] === 0) {
            delete (spoilerFilter.itemsInUse[id]);
        }

        this.storeToLocalStorageAndSetState({...this.state, spoilerFilter: spoilerFilter})
    }

    toggleShowAll() {
        const state = this.state;
        state.spoilerFilter.all = !state.spoilerFilter.all;
        this.storeToLocalStorageAndSetState(state);
    }

    storeToLocalStorageAndSetState(state: ItemViewState) {
        localStorage.setItem(this.filterLocalStorageKey, JSON.stringify(state.spoilerFilter));
        this.setState(state);
    }

    renderShareTab() {
        const {spoilerFilter, shareLockSpoilerPanel} = this.state;

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
                                       onChange={() => this.setState({shareLockSpoilerPanel: !shareLockSpoilerPanel})}/>
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

        const {spoilerFilter} = this.state;

        return (
            <React.Fragment>

                <Form>

                    <Form.Group inline>
                        <label>Respecting Spoiler Settings:</label>
                        <Button
                            color={spoilerFilter.all ? 'red' : 'blue'}
                            onClick={() => this.toggleShowAll()}
                        >
                            {spoilerFilter.all
                                ? <React.Fragment><Icon name={'eye'}/> disabled</React.Fragment>
                                : <React.Fragment><Icon name={'eye slash'}/> enabled</React.Fragment>
                            }
                        </Button>
                    </Form.Group>

                    <Form.Group inline>
                        <label>Enable Store Stock Management:</label>
                        <Form.Checkbox
                            toggle
                            checked={spoilerFilter.enableStoreStockManagement}
                            onClick={() => this.storeToLocalStorageAndSetState({
                                ...this.state,
                                spoilerFilter: {
                                    ...spoilerFilter,
                                    enableStoreStockManagement: !spoilerFilter.enableStoreStockManagement
                                }
                            })}/>
                    </Form.Group>

                    <Form.Group inline>
                        <label>Prosperity:</label>
                        {[...Array(9).keys()].map(index => {
                            const prosperity = index + 1;
                            return (
                                <Form.Radio key={index} label={prosperity}
                                            checked={spoilerFilter.prosperity === prosperity}
                                            onChange={() => this.setProsperityFilter(prosperity)}/>
                            )
                        })}
                    </Form.Group>

                    {spoilerFilter.prosperity < 9 && <Form.Group inline className={'inline-break'}>
                        <label>Prosperity Items:</label>
                        {/* 15-70 prosperity 2-9*/}
                        {[...Array(70 - (spoilerFilter.prosperity + 1) * 7).keys()].map((val) => {
                            const id = val + 1 + (spoilerFilter.prosperity + 1) * 7;
                            return (
                                <Popup key={val} closeOnDocumentClick hideOnScroll content={this.getItemById(id).name}
                                       trigger={<Form.Checkbox label={'#' + (id + '').padStart(3, '0')}
                                                               checked={spoilerFilter.item.includes(id)}
                                                               onChange={() => this.toggleItemFilter(id)}/>}/>
                            )
                        })}
                    </Form.Group>}

                    <Form.Group inline className={'inline-break'}>
                        <label>Random Item Design:</label>
                        {/* 71-95 random item design*/}
                        {[...Array(25).keys()].map((val) => {
                            const id = val + 71;
                            return (
                                <Popup key={val} closeOnDocumentClick hideOnScroll content={this.getItemById(id).name}
                                       trigger={<Form.Checkbox label={'#' + (id + '').padStart(3, '0')}
                                                               checked={spoilerFilter.item.includes(id)}
                                                               onChange={() => this.toggleItemFilter(id)}/>}/>
                            )
                        })}
                    </Form.Group>


                    <Form.Group inline className={'inline-break'}>
                        <label>Other Items:</label>
                        {/* 96-133 other items*/}
                        {[...Array(38).keys()].map((val) => {
                            const id = val + 96;
                            return (
                                <Popup key={val} closeOnDocumentClick hideOnScroll content={this.getItemById(id).name}
                                       trigger={<Form.Checkbox label={'#' + (id + '').padStart(3, '0')}
                                                               checked={spoilerFilter.item.includes(id)}
                                                               onChange={() => this.toggleItemFilter(id)}/>}/>
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
        const {spoilerFilter, filter, sorting} = this.state;
        return (
            <React.Fragment>

                <Form>
                    <Form.Group inline>
                        <label>Render as:</label>
                        <Button.Group>
                            <Button color={spoilerFilter.displayAs === 'list' ? 'blue' : undefined} onClick={() => this.storeToLocalStorageAndSetState({...this.state, spoilerFilter: {...this.state.spoilerFilter, displayAs: 'list'}})}>List</Button>
                            <Button.Or/>
                            <Button color={spoilerFilter.displayAs === 'images' ? 'blue' : undefined} onClick={() => this.storeToLocalStorageAndSetState({...this.state, spoilerFilter: {...this.state.spoilerFilter, displayAs: 'images'}})}>Images</Button>
                        </Button.Group>
                    </Form.Group>
                    {spoilerFilter.displayAs === 'list' && <Form.Group inline>
                        <label>Reputation Discount:</label>
                        <Form.Select value={spoilerFilter.discount}
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
                                    const state = this.state;
                                    state.spoilerFilter.discount = typeof e.value === 'number' ? e.value : 0;
                                    this.storeToLocalStorageAndSetState(state);
                                }}
                        />
                    </Form.Group>}
                    {spoilerFilter.displayAs === 'images' && <Form.Group inline>
                        <label>Sort By:</label>
                        <Form.Select
                            value={sorting.property}
                            options={[
                                {value: 'id', text: 'Item Number'},
                                {value: 'slot', text: 'Equipment Slot'},
                                {value: 'cost', text: 'Cost'},
                                {value: 'name', text: 'Name'},
                                {value: 'source', text: 'Source'},
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
                            onChange={(e) => this.setState({...this.state, filter: {...this.state.filter, search: e.target.value}})}
                            icon={{name: 'close', link: true, onClick: () => this.setState({...this.state, filter: {...this.state.filter, search: ''}})}}
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
                <br/>
                <div className={'item-summon'}>
                    <div>
                        <div>HP: {item.summon.hp}</div>
                        <div>Move: {item.summon.move}</div>
                    </div>
                    <div>
                        <div>Attack: {item.summon.attack}</div>
                        <div>Range: {item.summon.range || '-'}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderTable() {
        const {spoilerFilter, sorting} = this.state;
        const items = this.getSortedAndFilteredItems();
        const itemsListAsImages = () => (
            <React.Fragment>
                {items.map(item => (
                    <img key={item.id}
                        src={ItemView.getItemImageSrc(item)}
                        alt={item.name}
                        className={'item-card'}/>
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
                                <Table.HeaderCell className={'use-col'}>Use</Table.HeaderCell>
                                <Table.HeaderCell className={'text-col'}>Effect</Table.HeaderCell>
                                <Table.HeaderCell className={'source-col'}>Source</Table.HeaderCell>
                                <Table.HeaderCell
                                    className={'store-inventory-col'}>{spoilerFilter.enableStoreStockManagement ? 'In Use' : 'Stock'}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map(item => {
                                const cost = spoilerFilter.discount !== 0
                                    ? (<strong className={"ui text " + (item.cost > 0 ? 'blue' : 'orange')}>{item.cost + spoilerFilter.discount}g</strong>)
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
                                            {spoilerFilter.enableStoreStockManagement
                                                ? [...Array(item.count).keys()].map(index =>
                                                    <Checkbox key={index}
                                                              toggle
                                                              disabled={spoilerFilter.lockSpoilerPanel}
                                                              checked={!!(spoilerFilter.itemsInUse[item.id] & Math.pow(2, index))}
                                                              onChange={() => this.toggleItemInUse(item.id, Math.pow(2, index))}/>
                                                )
                                                : item.count
                                            }
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

                {this.state.spoilerFilter.all &&  (
                    <Message negative>
                        <Message.Header><Icon name="exclamation triangle"/>Spoiler alert</Message.Header>
                        You are currently viewing all possible items.
                    </Message>
                )}

                {spoilerFilter.displayAs === 'list' ? table() : itemsListAsImages()}

            </React.Fragment>
        );
    }

    render() {

        const {spoilerFilter, importModalOpen} = this.state;

        let panes = [
            { menuItem: 'Item List', render: () => <Tab.Pane className={spoilerFilter.all ? 'spoiler' : ''}>{this.renderTable()}</Tab.Pane> },
            { menuItem: 'Spoiler Configuration', render: () => <Tab.Pane className={spoilerFilter.all ? 'spoiler' : ''}>{this.renderSpoilerFilters()}</Tab.Pane>},
            {
                menuItem: 'Share',
                render: () => <Tab.Pane
                    className={spoilerFilter.all ? 'spoiler' : ''}>{this.renderShareTab()}</Tab.Pane>
            },
        ];

        if (spoilerFilter.lockSpoilerPanel) {
            panes = [panes[0]];
        }

        return (
            <React.Fragment>

                <Modal basic size='small' open={importModalOpen}>
                    <Header icon='cloud download' content='Apply Configuration from Link'/>
                    <Modal.Content>
                        <p>
                            Do you with to load the configuration passed with this link?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => {
                            location.hash = '';
                            this.setState({importModalOpen: false})
                        }}>
                            <Icon name='remove'/> No
                        </Button>
                        <Button color='green' inverted onClick={() => this.importFromHash()}>
                            <Icon name='checkmark'/> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>

                <div className={spoilerFilter.all ? 'spoiler' : ''}>
                    <Tab panes={panes} defaultActiveIndex={0}/>
                </div>
                <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
            </React.Fragment>
        );
    }
}

export default ItemView;
