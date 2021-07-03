import { PostPurposeEnum } from "../gen/models/Post";

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