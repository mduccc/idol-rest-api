require('dotenv').config()
const server = require('./app')
const app = new server().build()
const router = require('./router/router')
const routerapp = new router()

const firebase = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')

const firebaseapp = firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
  	databaseURL: 'https://api-idol-272da.firebaseio.com'
})

app.use('/', (req, res, next) =>{
	console.log('wellcome')
	next()
})

app.use('/v1', (req, res, next) =>{
	console.log('v1')
	next()
})

app.use('/v1/idol', (req, res, next) =>{
	console.log('idol')
	next()
})

app.use('/v1/profile', (req, res, next) =>{
	console.log('profile')
	next()
})

app.use('/v1/song', (req, res, next) =>{
	console.log('song')
	next()
})

app.use('/v1/album', (req, res, next) =>{
	console.log('album')
	next()
})

app.use('/v1/mv', (req, res, next) =>{
	console.log('mv')
	next()
})

app.use('/admin', (req, res, next) =>{
	console.log('admin')
	next()
})


routerapp.go(app, firebaseapp)