import React, { useState } from 'react'
import { Form } from 'semantic-ui-react';
import { isFlagEnabled } from '../../helpers';
import { useFilterOptions } from '../Providers/FilterOptionsProvider';
import { LockSpoilerToggle } from './Share/LockSpoilerToggle';
import UploadForm from './Share/UploadForm';

const Share = () => {
    const { getShareHash } = useFilterOptions();
    const shareEnabled = isFlagEnabled("sharing");
    const [ lockSpoilerPanel] = useState(false);

    const configHash = getShareHash(lockSpoilerPanel);

    const shareUrl = location.origin + location.pathname + '#' + configHash;
    return (
        <>
            <p>Here you can generate a link to this app with your current spoiler configuration.</p>
            <LockSpoilerToggle/>
            <Form>
                <Form.Group>
                    <Form.Input id={'share-url-input'} width={14} value={shareUrl}/>
                    <Form.Button width={2} onClick={() => {
                        (document.getElementById('share-url-input') as HTMLInputElement).select();
                        document.execCommand("copy");
                    }}>Copy</Form.Button>
                </Form.Group>
                {shareEnabled && <UploadForm configHash={configHash}/>}
            </Form>
        </>
    );
}

export default Share;
