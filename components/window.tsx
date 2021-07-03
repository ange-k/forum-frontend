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

    return (
        <div className={windowVisble ? `${styles.container}` : `${styles.container} ${styles.invisible}`}
            onMouseEnter={overMouse}
            onMouseLeave={leaveMouse}
        >
            <ul className={setActiveStatus(styles.tab)}>
                <li className={setTabClassName(TabName.SEARCH, styles.menu)}
                    onClick={clickSearch}
                >search</li>
                <li className={setTabClassName(TabName.POST, styles.menu)}
                    onClick={clickPost}
                >post</li>
                <div className={styles.control}>
                    <button onClick={clickViewBtn}>
                        {windowVisble ? '+' : '-'}
                    </button>
                </div>
            </ul>
            <SearchTab games={games} windowActive={windowActive} windowVisble={windowVisble} search={search}/>
        </div>
    )
}

export default Window;