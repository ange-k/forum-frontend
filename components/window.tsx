import React, { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import styles from '../styles/Window.module.scss'
import PostTab from './postTab';
import SearchTab, { SearchQuery } from './searchTab';

type WindowProps = ({
    games: Game[],
    search: (query: SearchQuery) => void
})

const Window:React.FC<WindowProps> = ({games, search}) => {

    // サーチウィンドウの選択状態
    const [windowActive, setWindowActive] = useState(false)
    const overMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setWindowActive(true)
    }
    const leaveMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setWindowActive(false)
    }
    /**
     * windowVisible=falseのとき、引数のclassNameに.invisibleを追加して返す
     * windowActiveStatus=trueのとき、引数のclassNameに.activeを追加して返す
     * @param className
     * @returns className + .active
     */
    const setActiveStatus = (className: string) => {
        if(windowVisble === false) {
            return `${className} ${styles.invisible}`
        }
        if(windowActive === false) {
            return className;
        }
        return `${className} ${styles.active}`
    }

    // サーチウィンドウの表示状態
    const [windowVisble, setWindowVisible] = useState(true)
    const clickViewBtn = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setWindowVisible(!windowVisble);
    }

    // サーチ, ポストのトグルスイッチ管理
    const [selectSearchTab, setSelectSearchTab] = useState(true)
    const clickSearch = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setSelectSearchTab(true)
    }
    const clickPost = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setSelectSearchTab(false)
    }

    const TabName = {
        SEARCH: 'search',
        POST: 'post'
    } as const;
    type TabName = typeof TabName[keyof typeof TabName];

    /**
     * windowVisible=falseのとき、引数のclassNameに.invisibleを追加して返す
     * selectSearchTabの値を見て、selectクラスの付与をトグルする
     * windowActiveの値を見て、activeクラスの付与をトグルする
     * @param className 
     * @returns 
     */
    const setTabClassName = (tabName:TabName, className: string) => {
        if(windowVisble === false) {
            return `${className} ${styles.invisible}`
        }

        let name = ''
        if(windowActive === true) {
            name = styles.active
        }

        if(tabName === TabName.SEARCH) {
            if(selectSearchTab) {
                name = `${name} ${styles.select}`
            }
        } else {
            if(!selectSearchTab) {
                name = `${name} ${styles.select}`
            }
        }

        return `${className} ${name}`
    }

    const viewTab = () => {
        if(selectSearchTab) {
            return <SearchTab games={games} windowActive={windowActive} windowVisble={windowVisble} search={search}/>
        } else {
            return <PostTab games={games} windowActive={windowActive} windowVisble={windowVisble}/>
        }
    }

    const toggleButton = () => {
        if(windowVisble) {
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        } else {
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
        }
    }

    return (
        <div className={windowVisble ? `${styles.container}` : `${styles.container} ${styles.invisible}`}
            onMouseEnter={overMouse}
            onMouseLeave={leaveMouse}
        >
            <ul className={setActiveStatus(styles.tab)}>
                <li className={setTabClassName(TabName.SEARCH, styles.menu)}
                    onClick={clickSearch}
                >検索する</li>
                <li className={setTabClassName(TabName.POST, styles.menu)}
                    onClick={clickPost}
                >投稿する</li>
                <div className={styles.control}>
                </div>
            </ul>
            <button
                className={styles.btnbase} 
                onClick={clickViewBtn}>
                {
                    toggleButton()
                }
            </button>
            {
                viewTab()
            }
        </div>
    )
}

export default Window;