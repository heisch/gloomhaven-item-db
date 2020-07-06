import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection, GloomhavenItemSlot } from '../State/Types'
import { Message, Table, Popup, Icon, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../State/Reducer';
import { storeSortingProperty } from '../State/ItemViewState';
import ItemManagement from './ItemManagement';
import { Helpers, getSlotImageSrc } from '../helpers';

type Props = {
    items : GloomhavenItem[];
}

const ItemTable = (props:Props) => {
    const {items} = props;
    const { enableStoreStockManagement, discount } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const { sorting } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];
    const dispatch = useDispatch();

    if (items.length === 0) {
        return <Message negative>
            No items found matching your filters and/or search criteria
        </Message>
    }
    const setSorting = (property: SortProperty) => {
        if (property === sorting.property) {
            sorting.direction = sorting.direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
        } else {
            sorting.direction = SortDirection.ascending;
        }
        sorting.property = property;
        dispatch(storeSortingProperty(property));
    }

    // TODO: see what can be done as local state?
    // TODO: Move this into a component!
    const renderSummon = (item: GloomhavenItem) => {
        return item.summon === undefined ? null : (
            <React.Fragment>
                <div className={'item-summon'}>
                    <div><img src={require('../img/icons/general/heal.png')} className={'icon'} alt={'hp'}/>: {item.summon.hp}</div>
                    <div><img src={require('../img/icons/general/move.png')} className={'icon'} alt={'hp'}/>: {item.summon.move}</div>
                    <div><img src={require('../img/icons/general/attack.png')} className={'icon'} alt={'hp'}/>: {item.summon.attack}</div>
                    <div><img src={require('../img/icons/general/range.png')} className={'icon'} alt={'hp'}/>: {item.summon.range || '-'}</div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <>
            <Table basic sortable celled className={'items-table'} unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className={'id-col'} textAlign={'right'} onClick={() => setSorting('id')} sorted={sorting.property === 'id' ? sorting.direction : undefined}>#</Table.HeaderCell>
                        <Table.HeaderCell className={'name-col'} selectable={false} onClick={() => setSorting('name')} sorted={sorting.property === 'name' ? sorting.direction : undefined}>Name</Table.HeaderCell>
                        <Table.HeaderCell className={'slot-col'} textAlign={'center'} onClick={() => setSorting('slot')} sorted={sorting.property === 'slot' ? sorting.direction : undefined}>Slot</Table.HeaderCell>
                        <Table.HeaderCell className={'cost-col'} textAlign={'right'} onClick={() => setSorting('cost')} sorted={sorting.property === 'cost' ? sorting.direction : undefined}>Cost</Table.HeaderCell>
                        <Table.HeaderCell className={'use-col'} onClick={() => setSorting('use')} sorted={sorting.property === 'use' ? sorting.direction : undefined}>Use</Table.HeaderCell>
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
                                <Table.Cell className={'slot-col'} textAlign={'center'}><Image src={getSlotImageSrc(item.slot)}/></Table.Cell>
                                <Table.Cell className={'cost-col'} textAlign={'right'}>{cost}</Table.Cell>
                                <Table.Cell className={'use-col'} textAlign={'center'}>
                                    {item.spent && <img className={'icon'} src={require('../img/icons/general/spent.png')} alt={'icon spent'}/>}
                                    {item.consumed && <img className={'icon'} src={require('../img/icons/general/consumed.png')} alt={'icon consumed'}/>}
                                </Table.Cell>
                                <Table.Cell className={'text-col'}>
                                    <span dangerouslySetInnerHTML={{__html:item.descHTML}}/>
                                    {item.minusOneCardsAdded &&
                                    <React.Fragment><br/><span>Add {Helpers.numberAmountToText(item.minusOneCardsAdded)}
                                        <img className={'icon'}
                                            src={require('../img/icons/general/modifier_minus_one.png')}
                                            alt={'modifier -1'}/> to your attack modifier deck.</span></React.Fragment>}
                                    {item.faq && <Popup closeOnDocumentClick hideOnScroll trigger={<Icon name={'question circle'} className={'pink'}/>} header={'FAQ'} content={item.faq}/>}
                                    {renderSummon(item)}
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
        </>                
    );
}

export default ItemTable;