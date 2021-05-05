const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const data = [

]

//HOME
router.get('/', (req, res, next) => {
    res.render('index', { products: data, title: "Guest Book" })
})

//LEAVE NOTE
router.get('/ln', (req, res, next) => {
    res.render('leaveNote', { products: data, title: "Leave a Note" })
})

//READ NOTES
router.get('/rn', (req, res, next) => {
    res.render('readNotes', { products: data, title: "Read Notes" })
})

//404
router.get('*', (req, res, next) => {
    res.render('404')
})



router.post('/add-product', (req, res, next) => {
    data.push({
        id: Math.random(),
        product: req.body.product
    })
    fs.writeFile(path.join(__dirname, '..', 'products.json'), JSON.stringify(data, null, 2), () => {
        res.status(302).redirect('/')
    })
})

module.exports = router