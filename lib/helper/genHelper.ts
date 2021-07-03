import { Game } from "../gen/models/Game";
import { PostPurposeEnum, PostTagsEnum } from "../gen/models/Post";

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
        case PostPurposeEnum.Play:
            return "一緒に遊びたい"
        case PostPurposeEnum.TeamJoin:
            return "ギルド/チーム等に入りたい"
        case PostPurposeEnum.TeamLanch:
            return "ギルド/チーム等の立ち上げメンバー募集"
        case PostPurposeEnum.TeamScout:
            return "ギルド/チーム等メンバー募集"
        case PostPurposeEnum.Other:
        default:
            return "その他"
    }
}

export const convertTags = (tag: PostTagsEnum) => {
    switch(tag) {
        case PostTagsEnum.PsEx:
            return "効率重視"
        case PostTagsEnum.PsJoy:
            return "バランス重視"
        case PostTagsEnum.PsEasy:
            return "楽しさ重視"
        case PostTagsEnum.TimeSociety:
            return "社会人"
        case PostTagsEnum.TimeStudent:
            return "学生"
        case PostTagsEnum.TimeShift:
            return "シフト勤務"
        case PostTagsEnum.TimeNightly:
            return "夜中心"
        case PostTagsEnum.TimeRandom:
            return "不定期ログイン"
        case PostTagsEnum.Years10:
            return "10歳代"
        case PostTagsEnum.Years20:
            return "20歳代"
        case PostTagsEnum.YearsOv30:
            return "30歳代以上"
        case PostTagsEnum.PlayEasy:
            return "初心者"
        case PostTagsEnum.PlayVeteran:
            return "中級者/復帰"
        case PostTagsEnum.PlayHero:
            return "ガチ勢"
        default:
            return "unknown"
    }
}