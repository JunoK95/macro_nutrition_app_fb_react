export function TitleCase(str){
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
}

export function DeleteStringSection(fullStr){
    return fullStr.replace(/[, upc:[0-9]+$/gmi, "")
}