import { Game } from "../gen/models/Game";
import { PostPlayTimeEnum, PostPurposeEnum, PostVcUseEnum } from "../gen/models/Post";
import { TagsIdEnum } from "../gen/models/Tags"

export const dateFormat = ((date:Date) => {
    const jst = new Date(date.toLocaleString([], {timeZone:'Asia/Tokyo'}))
    const zeroFill = ((num:number) => {
        const fill = "00" + num;
        return fill.slice(-2)
    })
    const dateStr = `${jst.getFullYear()}/${zeroFill(jst.getMonth()+1)}/${zeroFill(jst.getDate())}`
    const timeStr = `${zeroFill(jst.getHours())}:${zeroFill(jst.getMinutes())}`
    return `${dateStr} ${timeStr}`
})

export const getGameName = ((games: Game[], gameId:string) => {
    return games.filter((g) => g.idName === gameId)[0].viewName
})

export const convertPropose = (purpose: PostPurposeEnum) => {

    switch(purpose) {
        case PostPurposeEnum.Event:
            return "イベント開催したい"
        case PostPurposeEnum.Friend:
            return "フレンド募集"
        case PostPurposeEnum.Guruguru:
            return "周回コンテンツ募集"
        case PostPurposeEnum.EndContent:
            return "エンドコンテンツ募集"
        case PostPurposeEnum.Helpme:
            return "助けてほしい"
        case PostPurposeEnum.Play:
            return "一緒に遊びたい"
        case PostPurposeEnum.TeamJoin:
            return "ギルド/チーム等に入りたい"
        case PostPurposeEnum.TeamLanch:
            return "ギルド/チーム等の立ち上げメンバー募集"
        case PostPurposeEnum.TeamScout:
            return "ギルド/チーム等メンバー募集"
        case PostPurposeEnum.Trade:
            return "アイテム取引"
        case PostPurposeEnum.Other:
        default:
            return "その他"
    }
}

export const convertVcUse = (vc: PostVcUseEnum) => {
    switch(vc) {
        case PostVcUseEnum.Use:
            return "積極的に利用"
        case PostVcUseEnum.Unuse:
            return "基本使わない"
        case PostVcUseEnum.Either:
        default:
            return "時と場合による"
    }
}

export const convertTags = (tag: TagsIdEnum) => {
    switch(tag) {
        case TagsIdEnum.PsEx:
            return "効率重視"
        case TagsIdEnum.PsJoy:
            return "バランス重視"
        case TagsIdEnum.PsEasy:
            return "楽しさ重視"
        case TagsIdEnum.TimeSociety:
            return "社会人"
        case TagsIdEnum.TimeStudent:
            return "学生"
        case TagsIdEnum.Years10:
            return "10歳代"
        case TagsIdEnum.Years20:
            return "20歳代"
        case TagsIdEnum.YearsOv30:
            return "30歳代以上"
        case TagsIdEnum.PlayEasy:
            return "初心者"
        case TagsIdEnum.PlayVeteran:
            return "中級者/復帰"
        case TagsIdEnum.PlayHero:
            return "ガチ勢"
        case TagsIdEnum.JobAck:
            return "アタッカー"
        case TagsIdEnum.JobDef:
            return "タンク"
        case TagsIdEnum.JobHeal:
            return "回復/支援"
        default:
            return "unknown"
    }
}

export const convertPlayTime = (time : PostPlayTimeEnum) => {
    switch(time) {
        case PostPlayTimeEnum.WeekdaysEm:
            return "平日/早朝"
        case PostPlayTimeEnum.WeekdaysM:
            return "平日/朝"
        case PostPlayTimeEnum.WeekdaysL:
            return "平日/昼"
        case PostPlayTimeEnum.WeekdaysN:
            return "平日/夜"
        case PostPlayTimeEnum.WeekdaysMn:
            return "平日/深夜"
        case PostPlayTimeEnum.WeekdaysM:
            return "平日"
        case PostPlayTimeEnum.HolidaysEm:
            return "休日/早朝"
        case PostPlayTimeEnum.HolidaysM:
            return "休日/朝"
        case PostPlayTimeEnum.HolidaysL:
            return "休日/昼"
        case PostPlayTimeEnum.HolidaysN:
            return "休日/夜"
        case PostPlayTimeEnum.HolidaysMn:
            return "休日/深夜"
        case PostPlayTimeEnum.Holidays:
            return "休日"
        case PostPlayTimeEnum.Random:
            return "不定期"
        case PostPlayTimeEnum.BestEffort:
            return "可能な範囲でいつでも"
        default:
            return "unknown"
    }
}

export const proposes = () => {
    const enums = Object.entries(PostPurposeEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertPropose(k[1])
        }
    })
}

export const vcuses = () => {
    const enums = Object.entries(PostVcUseEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertVcUse(k[1])
        }
    })
}

export const tags = () => {
    const enums = Object.entries(TagsIdEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertTags(k[1])
        }
    })
}

export const playTimes = () => {
    const enums = Object.entries(PostPlayTimeEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertPlayTime(k[1])
        }
    })
}