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