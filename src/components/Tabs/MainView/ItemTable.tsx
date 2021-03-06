import React from 'react'
import { GloomhavenItem, ItemManagementType, SortProperty } from '../../../State/Types'
import {  Table, Popup, Icon, Image } from 'semantic-ui-react';
import ItemManagement from './ItemManagement';
import { Helpers, getSlotImageSrc } from '../../../helpers';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';
import { getItemViewState } from '../../../State/ItemViewState';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';

type Props = {
    items : GloomhavenItem[];
    setSorting : (newProperty: SortProperty) => void;
}

type IconProps = {
    name:string;
}

const GHIcon = (props:IconProps) => {
    const {name} = props;
    return (
        <img src={require( `../../../img/icons/general/${name}`)} className={'icon'} alt={name}/>
    )
}

const ItemTable = (props:Props) => {
    const {items, setSorting} = props;
    const { itemMangementType, discount } = getSpoilerFilter();
    const { property, direction } = getItemViewState();
    const { gameType } = useGame();

    const renderSummon = (item: GloomhavenItem) => {
        return item.summon === undefined ? null : (
            <>
                <div className={'item-summon'}>
                    <div><GHIcon name={'heal.png'}/>: {item.summon.hp}</div>
                    <div><GHIcon name={'move.png'}/>: {item.summon.move}</div>
                    <div><GHIcon name={'attack.png'}/>: {item.summon.attack}</div>
                    <div><GHIcon name={'range.png'}/>: {item.summon.range || '-'}</div>
                </div>
            </>
        );
    }

    const getCostTitle = () => {
        return (gameType != GameType.JawsOfTheLion && discount !== 0)
        ? (<strong className={"ui text " + (discount < 0 ? 'blue' : 'red')}> Cost ({discount}g)</strong>)
        : (<strong>Cost</strong>);
    }

    return (
        <>
            <Table basic sortable celled className={'items-table'} unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className={'id-col'} textAlign={'right'} onClick={() => setSorting('id')} sorted={property === 'id' ? direction : undefined}>#</Table.HeaderCell>
                        <Table.HeaderCell className={'name-col'} selectable={false} onClick={() => setSorting('name')} sorted={property === 'name' ? direction : undefined}>Name</Table.HeaderCell>
                        <Table.HeaderCell className={'slot-col'} textAlign={'center'} onClick={() => setSorting('slot')} sorted={property === 'slot' ? direction : undefined}>Slot</Table.HeaderCell>
                        <Table.HeaderCell className={'cost-col'} textAlign={'right'} onClick={() => setSorting('cost')} sorted={property === 'cost' ? direction : undefined}>{getCostTitle()}</Table.HeaderCell>
                        <Table.HeaderCell className={'use-col'} onClick={() => setSorting('use')} sorted={property === 'use' ? direction : undefined}>Use</Table.HeaderCell>
                        <Table.HeaderCell className={'text-col'}>Effect</Table.HeaderCell>
                        <Table.HeaderCell className={'source-col'}>Source</Table.HeaderCell>
                        <Table.HeaderCell
                            className={'store-inventory-col'}>{itemMangementType !== ItemManagementType.None ? 'In Use' : 'Stock'}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map(item => {
                        const cost = gameType != GameType.JawsOfTheLion && discount !== 0
                            ? (<strong className={"ui text " + (discount < 0 ? 'blue' : 'red')}>{item.cost + discount}g</strong>)
                            : (<strong>{item.cost}g</strong>);
                        return (
                            <Table.Row key={item.id}>
                                <Table.Cell className={'id-col'} textAlign={'right'}>#{(item.id + '').padStart(3, '0')}</Table.Cell>
                                <Table.Cell className={'name-col'}>{item.name}</Table.Cell>
                                <Table.Cell className={'slot-col'} textAlign={'center'}><Image src={getSlotImageSrc(item.slot)}/></Table.Cell>
                                <Table.Cell className={'cost-col'} textAlign={'right'}>{cost}</Table.Cell>
                                <Table.Cell className={'use-col'} textAlign={'center'}>
                                    {item.spent && <GHIcon name={'spent.png'}/>}
                                    {item.consumed && <GHIcon name={'consumed.png'}/>}
                                </Table.Cell>
                                <Table.Cell className={'text-col'}>
                                    <span dangerouslySetInnerHTML={{__html:item.descHTML}}/>
                                    {item.minusOneCardsAdded &&
                                    <React.Fragment><br/><span>Add {Helpers.numberAmountToText(item.minusOneCardsAdded)}
                                        <GHIcon name={'modifier_minus_one.png'}/>to your attack modifier deck.</span></React.Fragment>}
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
