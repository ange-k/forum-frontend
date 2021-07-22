import React, { useState } from 'react';
import styles from '../styles/PostTab.module.scss'
import ReactTooltip from 'react-tooltip'

import { convertPlayTime, playTimes } from '../lib/helper/genHelper';
import { PostPlayTimeEnum } from '../lib/gen/models/Post';

type SelectTagsProps = ({
    title: string,
    selected: string[],
    selectTag: (value: string) => void,
    deleteTag: (value: string) => void
})

const SelectPlayTime:React.FC<SelectTagsProps> = ({title, selected, selectTag, deleteTag}) => {
    const [disableTagSelect, setDisableTagSelect] = useState(false)

    const [isTooltipVisible, setTooltipVisibility] = useState(false);
    React.useEffect(() => {
        setTooltipVisibility(true);
    }, []);

    const tagSelect = ((tagId:string) => {
        if(!tagId) {
            return;
        }
        const include = selected.includes(tagId)
        if(selected.length > 2) {
            setDisableTagSelect(true);
            return;
        }
        if(!include) {
            selectTag(tagId);
            if(selected.length === 2) {
                setDisableTagSelect(true);
            }
            return;
        }
    })
    const tagDelete = ((tagId:string) => {
        deleteTag(tagId)
        setDisableTagSelect(false);
    })

    return (
        <div>
            <div className={styles.item}>
                <div className={styles.taglabel} data-multiline="true" data-tip="最大3つのタグを紐付ける<br/>ことができます。">
                    {isTooltipVisible && <ReactTooltip effect="float" type="info"/>}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                    <span className={styles.label}>{title}</span>
                </div>
                <select disabled={disableTagSelect} onChange={(e) => tagSelect(e.target.value)}>
                    <option value="">未選択</option>
                    {
                        playTimes().map((v) => (
                            <option key={v.key} value={v.key}>{v.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.tags}>
                {
                    selected.map((v) =>(
                        <button key={v} onClick={(e)=> tagDelete(v)} className={styles.minibtn}>
                            <div>{convertPlayTime(v as PostPlayTimeEnum)}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectPlayTime;