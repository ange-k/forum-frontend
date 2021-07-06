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
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fefefe"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        } else {
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fefefe"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        }
    }

    return (
        <div className={windowVisble ? `${styles.container}` : `${styles.container} ${styles.invisible}`}
            onMouseEnter={overMouse}
            onMouseLeave={leaveMouse}
        >
            <ul className={setActiveStatus(styles.tab)}>
                <li className={setTabClassName(TabName.SEARCH, styles.menu)}
                    onClick={clickSearch}>
                    <div className={styles.svgtab}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"/></svg>
                        <span>検索する</span>
                    </div>
                </li>
                <li className={setTabClassName(TabName.POST, styles.menu)}
                    onClick={clickPost}>
                    <div className={styles.svgtab}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        <span>投稿する</span>
                    </div>
                </li>
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