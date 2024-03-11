export function setItemWeather(key, data){
    localStorage.setItem(key, JSON.stringify(data))
    
}


export function getItemWeather(key){
    let data = localStorage.getItem(key)
    return  JSON.parse(data)

}
