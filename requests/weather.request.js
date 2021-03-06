const rp = require('request-promise')

module.exports = async function(city = '') {
    if (!city) {
        throw new Error('Поле не может быть пустым ')
    }

    const KEY = '01d9ba3f6e6781144151897b6b634485'

    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs:{
          appid: KEY,
          q: city,
          units: 'imperial'
        },
        json: true
    }

    try  {
        const data = await rp(options)
        const celcius = (data.main.temp-32) * 5/9

        return{
            weather: `${data.name}: ${celcius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        console.log(error)
        return {
            weather: null,
            error: error.error.message
        }

    }

   
}