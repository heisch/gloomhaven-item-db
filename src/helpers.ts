import { GloomhavenItemSlot } from "./State/Types";

export class Helpers {
    static uniqueArray(arr: Array<any>, sort: boolean = true) {
        const result: Array<any> = [];
        arr.forEach(entry => {
            if (!result.includes(entry)) {
                result.push(entry);
            }
        });
        return sort ? result.sort() : result
    }

    static numberAmountToText(number: number) {
        switch (number) {
            case 0: return 'zero';
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            default: return number;
        }
    }

    static parseEffectText(text: string) {
        [
            "BLESS",
            "CURSE",
            "DISARM",
            "IMMOBILIZE",
            "INVISIBLE",
            "MUDDLE",
            "PIERCE",
            "POISON",
            "PULL",
            "PUSH",
            "ROLLING",
            "STRENGTHEN",
            "STUN",
            "TARGET",
            "WOUND",
        ].forEach(status => {
            const reg = new RegExp(`\\b${status}\\b`, 'g');
            text = text.replace(reg, status + '<img class="icon" src="'+require('./img/icons/status/'+status.toLowerCase()+'.png')+'" alt=""/>');
        });

        [
            "Attack",
            "Move",
            "Range",
        ].forEach(find => {
            const reg = new RegExp(`(\\+\\d+ ${find}\\b)`, 'g');
            text = text.replace(reg, "$1" + '<img class="icon" src="'+require('./img/icons/general/'+find.toLowerCase()+'.png')+'" alt=""/>');
        });

        [
            "Attack",
            "Heal",
            "Shield",
            "Retaliate",
            "Move",
            "Range",
            "Loot",
        ].forEach(find => {
            const reg = new RegExp(`\\b(${find})\\b (\\d+)`, 'g');
            text = text.replace(reg, "$1" + '<img class="icon" src="'+require('./img/icons/general/'+find.toLowerCase()+'.png')+'" alt=""/>' + "$2");
        });

        text = text.replace(/\bsmall items\b/g, '<img class="icon" src="'+require('./img/icons/equipment_slot/small.png')+'" alt=""/> items');
        text = text.replace(/\bRefresh\b/g, 'Refresh<img class="icon" src="'+require('./img/icons/general/refresh.png')+'" alt=""/>');
        text = text.replace(/\bRecover\b/g, 'Recover<img class="icon" src="'+require('./img/icons/general/recover.png')+'" alt=""/>');
        text = text.replace(/\bJump\b/g, 'Jump<img class="icon" src="'+require('./img/icons/general/jump.png')+'" alt=""/>');
        text = text.replace(/\bFlying\b/g, 'Flying<img class="icon" src="'+require('./img/icons/general/flying.png')+'" alt=""/>');
        text = text.replace(/{exp1}/g, '<img class="icon" src="'+require('./img/icons/general/experience_1.png')+'" alt=""/>');
        text = text.replace(/{Doom}/g, '<span class="doom">Doom</span>');
        text = text.replace(/{modifier_minus_one}/g, '<img class="icon" src="'+require('./img/icons/general/modifier_minus_one.png')+'" alt=""/>');

        [
            'any',
            'earth',
            'fire',
            'ice',
            'light',
            'dark',
            'wind',
        ].forEach(
            (element => {
                const reg = new RegExp(`{${element}(X?)}`, 'g');
                // text = text.replace(reg, '<img class="icon" src="'+require('./img/icons/element/'+element.toLowerCase()+'.png')+'" alt=""/>' );
                text = text.replace(reg, (m, m1) => '<img class="icon" src="'+require('./img/icons/element/'+element.toLowerCase()+m1+'.png')+'" alt=""/>');
            })
        );

        text = text.replace(/{multi_attack\.(.+?)}/, (m, m1) => {
            let className = 'icon';
            const type = m1.replace(/^(.+?)_.*$/, '$1');
            if (['cleave', 'cone', 'cube'].includes(type)) {
                className += ' double-height';
            }
            return `<img class="${className}" src="${require('./img/icons/multi_attack/' + m1 + '.png')}" alt=""/>`;
        });

        return text;
    }

}

export const getSlotImageSrc = (slot: GloomhavenItemSlot):string => {
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
