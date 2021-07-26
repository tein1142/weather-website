console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const img = document.querySelector('#imgOfForecast')


weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    img.src = ''
    e.preventDefault()
    const location = search.value
        // console.log(location)
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            console.log('/weather?address=' + location)
            if (data.error) {
                messageOne.textContent = data.error
            } else
                messageOne.textContent = data.location
            console.log(data.forecast)
            messageTwo.textContent = data.forecast[0]
            img.src = data.forecast[1]


        })
    })
})