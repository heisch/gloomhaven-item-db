import React from 'react'
import { Form, Icon, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { storeShareLockSpoilerPanel } from '../../State/ItemViewState';
import { RootState } from '../../State/Reducer';

type Props = {
}

const Share = (props:Props) => {
    const {} = props;
    const { shareLockSpoilerPanel } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];
    const spoilerFilter = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];

    const shareUrl = location.origin + location.pathname + '#' + btoa(JSON.stringify({
        ...spoilerFilter,
        lockSpoilerPanel: shareLockSpoilerPanel
    }));

    const dispatch = useDispatch();
    return (
        <>
            <p>Here you can generate a link to this app with your current spoiler configuration.</p>
            <Form>
                <Form.Group inline>
                    <label htmlFor={'share-spoiler-toggle'}>Deactivate spoiler configuration panel for people
                        following your shared link.</label>
                    <Form.Checkbox id={'share-spoiler-toggle'} toggle className={'share-spoiler-toggle'}
                                    checked={shareLockSpoilerPanel}
                                    onChange={() => dispatch( storeShareLockSpoilerPanel(!shareLockSpoilerPanel))}/>
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
        </>
    );
}

export default Share;