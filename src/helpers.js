export function TitleCase(str){
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
}

export function DeleteUPCSection(fullStr){
    return fullStr.replace(/upc:[0-9]+$/gmi, "")
}

export function GetDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    return today
}

export function ConfigDate(today){
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    return today
}


export function toPercent(num){
    return (num * 100).toFixed(0)
}

export function objIsEmpty( obj ) { 
    for ( let prop in obj ) { 
      return false; 
    } 
    return true; 
}