import React, { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import { proposes, vcuses } from '../lib/helper/genHelper';
import styles from '../styles/SearchTab.module.scss'

import ReactTooltip from 'react-tooltip'
import SelectTags from './selectTags';
import SelectPlayTime from './selectPlayTimes';
import { SearchQuery } from './window';

type SearchProps = ({
    games: Game[],
    query: SearchQuery,
    setQuery: (q:SearchQuery) => void
})

const SearchTab:React.FC<SearchProps> = ({games, query, setQuery}) => {

    const [isTooltipVisible, setTooltipVisibility] = useState(false);
    React.useEffect(() => {
        setTooltipVisibility(true);
      }, []);

    return (
        <div className={styles.window}>
            <div className={styles.selectbox}>
                <label htmlFor="game">ゲーム</label>
                <select name="game" onChange={(e)=> setQuery({...query, gameId: e.target.value})}>
                    {
                        games.sort((a,b) => {
                            if(a.idName<b.idName){
                                return -1;
                            }
                            if(a.idName>b.idName) {
                                return 1;
                            }
                            return 0;
                        }).map((game) => (
                            <option key={game.idName} value={game.idName}>{game.viewName}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.selectbox}>
                <label>募集の目的</label>
                <select onChange={(e)=> setQuery({...query, purpose: e.target.value})}>
                    <option value="">未選択</option>
                    {
                        proposes().map((p) => (
                            <option key={p.key} value={p.key}>{p.value}</option>
                        ))
                    }
                </select>
            </div>

            <div className={styles.selectbox}>
                <label>ボイスチャット</label>
                <select onChange={(e) => setQuery({...query, vcUse: e.target.value})}>
                    <option value="">未選択</option>
                    {
                        vcuses().map((v) => (
                            <option key={v.key} value={v.key}>{v.value}</option>
                        ))
                    }
                </select>
            </div>
            
            <SelectTags title="タグ検索(相手に求めること)" selected={query.tags} 
                    selectTag={(tagId:string)=> {
                        setQuery(({...query, tags: [...query.tags, tagId]}))
                    }}
                    deleteTag={(tagId:string)=> {
                        setQuery(({...query, tags: query.tags.filter((t) => t !== tagId)}))
                    }}/>
            <SelectTags title="タグ選択(自分に当てはまること)" selected={query.selfTags} 
                selectTag={(tagId:string)=> {
                    setQuery(({...query, selfTags: [...query.selfTags, tagId]}))
                }}
                deleteTag={(tagId:string)=> {
                    setQuery(({...query, selfTags: query.selfTags.filter((t) => t !== tagId)}))
                }}/>
                
            <SelectPlayTime title="主なプレイ時間帯" selected={query.playTime}
                selectTag={(tagId:string)=> {
                    setQuery(({...query, playTime: [...query.playTime, tagId]}))
                }}
                deleteTag={(tagId:string)=> {
                    setQuery(({...query, playTime: query.playTime.filter((t) => t !== tagId)}))
                }}/>
            
            <span className={styles.label}>
                <div className={styles.icon} data-multiline="true" data-tip="入力した値をすべて含む<br/>投稿を検索できます。">
                { isTooltipVisible && <ReactTooltip effect="float" type="info"/> }
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                    <span>フリーワード検索</span>
                </div>
            </span>
            <div className={styles.freeArea}>
                <div className={styles.inputbox}>
                    <label>サーバ</label>
                    <input placeholder="ゲームサーバーの名前" 
                        onChange={(e)=>setQuery({...query, serverName: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <label>名前</label>
                    <input placeholder="書き込んだ人の名前" 
                        onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <label>環境</label>
                    <input placeholder="PC/PS5など、遊ぶ環境" 
                        onChange={(e)=>setQuery({...query, device: e.target.value})}></input>
                </div>
            </div>
        </div>
    )
}

export default SearchTab;