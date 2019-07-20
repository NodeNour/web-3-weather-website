
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    fetch('/weather?address=' + location).then((response) => {
    
    response.json().then((data) => {
        if (data.errorMsg) {
            console.log(data.errorMsg)
            messageOne.textContent = data.errorMsg
        } else {
            console.log(data.forecast)
            console.log(data.location)
            messageOne.textContent = data.forecast.temperature + ' ... ' + data.forecast.rainProb
            messageTwo.textContent = data.location
        }
    })
}) 
    //console.log(location)
})