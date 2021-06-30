import React, { useState } from 'react';
import styles from '../styles/Search.module.scss'

export default function Search() {
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
            <div className={setActiveStatus(styles.window)}>
                <div className={styles.item}>
                    <label>Game</label>
                    <select>
                        <option value="pso2">PSO2</option>
                    </select>
                </div>
                <div className={styles.item}>
                    <label>目的</label>
                    <select>
                        <option value="pso2">一緒に遊びたい</option>
                    </select>
                </div>
                <div className={styles.item}>
                    <label>VC</label>
                    <select>
                        <option value="pso2">なし</option>
                    </select>
                </div>
                <hr/>
                <span>フリーワード検索</span>
                <div className={styles.item}>
                    <label>サーバ</label>
                    <input></input>
                </div>
                <div className={styles.item}>
                    <label>名前</label>
                    <input></input>
                </div>
            </div>
        </div>
    )
}