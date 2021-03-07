export enum SortDirection {
    ascending = 'ascending',
    descending = 'descending'
}

export enum ItemManagementType {
    None = 'None',
    Simple = 'Simple',
    Party = 'Party'
}

export enum ItemViewDisplayType {
    List = 'list',
    Images = 'images'
}

export type SortProperty = 'id' | 'slot' | 'cost' | 'name' | 'use';

export type PullDownOptions = ClassesInUse | undefined;
export type GHClassesShorthand = 'BR' | 'TI' | 'SW' | 'SC' | 'CH' | 'MT' | 'SK' | 'QM' | 'SU' | 'NS' | 'PH' | 'BE' | 'SS' | 'DS' | 'SB' | 'EL' | 'BT'| 'DR';
export type SoloClassShorthand = GHClassesShorthand;
export type JOTLClassesShorthand = 'DM' | 'HT' | 'RG' | 'VW';
export type ClassesInUse = GHClassesShorthand | JOTLClassesShorthand;

export type GloomhavenItemSlot = 'Head' | 'Body' | 'Legs' | 'One Hand' | 'Two Hands' | 'Small Item';
export type GloomhavenItemSourceType = 'Prosperity' | 'Random Item Design' | 'Scenario' | 'Treasure' | 'Solo Scenario' | 'Road Event' | 'City Event';

export interface GloomhavenItem {
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
    soloItem?: SoloClassShorthand;
}

