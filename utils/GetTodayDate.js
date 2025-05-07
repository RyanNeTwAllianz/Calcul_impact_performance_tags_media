

const GetTodayDate = () => {
    let date = new Date().toISOString()
    date = date.split('T')[0];
    date = date.replaceAll('-', '')
    
    return date
}

export default GetTodayDate