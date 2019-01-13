if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://user:password24@ds255794.mlab.com:55794/bookstore-prod'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/bookstore'
    }
}