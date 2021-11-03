import React, { useCallback, useState } from 'react'
import { Form, Message, Icon } from 'semantic-ui-react';
import { isFlagEnabled } from '../../../helpers';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import UploadForm from './UploadForm';

const Share = () => {
    const [ lockSpoilerPanel, setLockSpoilerPanel] = useState(false);
    const { getShareHash} = useFilterOptions();
    const shareEnabled = isFlagEnabled("sharing");

    const configHash = useCallback(() => { return getShareHash(lockSpoilerPanel)}, [lockSpoilerPanel]);

    const shareUrl = location.origin + location.pathname + '#' + configHash();
    return (
        <>
            <p>Here you can generate a link to this app with your current spoiler configuration.</p>
            <Form.Group inline>
                    <label htmlFor={'share-spoiler-toggle'}>Deactivate spoiler configuration panel for people
                        following your shared link.</label>
                    <Form.Checkbox id={'share-spoiler-toggle'} toggle className={'share-spoiler-toggle'}
                        checked={lockSpoilerPanel}
                        onChange={() => setLockSpoilerPanel(!lockSpoilerPanel)}/>
                </Form.Group>
                {lockSpoilerPanel && <Message negative>
                    <Icon name="exclamation triangle"/>Do not open the link yourself or you will not be able to
                        change any settings anymore
                    </Message>}
            <Form>
                <Form.Group>
                    <Form.Input id={'share-url-input'} width={14} value={shareUrl}/>
                    <Form.Button width={2} onClick={() => {
                        (document.getElementById('share-url-input') as HTMLInputElement).select();
                        document.execCommand("copy");
                    }}>Copy</Form.Button>
                </Form.Group>
                {shareEnabled && <UploadForm configHash={configHash()}/>}
            </Form>
        </>
    );
}

export default Share;
