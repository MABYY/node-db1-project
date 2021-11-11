
const Accounts = require('./accounts-model');

function logger(req, res, next) {
  const timeStamp = new Date()
  console.log(req.method, req.originalUrl, timeStamp)
  next() // send response to the client or call next
}

async function checkAccountPayload (req, res, next) {
  
    const {name,budget} = req.body
    error = {status:400 }

    if(!name || ! budget) {
      error = {
        message: "name and budget are required"
      }

    } else if (typeof name !== 'string' ) {
      error = {
        message: "name mush be a string" 
      } 
    } else if(typeof budget !== 'number') {
      error = {
        message: "budget of account must be a number" 
      } 
    } else if( budget < 0 || budget > 10000000000 ) {
      error = {
        message: "budget of account is too large or too small"
      } 
    }
    
    if(error.message){
      next(error)
    } else {
      next()
    }

  }

async function checkAccountNameUnique (req, res, next) {
  try{
    const {name} = req.body
    const account = await Accounts.getByName(name)
    if(account) {
      res.status(400).json({ status: 400,
                message: "that name is taken"})
    } else {
      next()
    }
    
  } catch(next) {

  }
}

async function checkAccountId  (req, res, next) {
  try{
      const account = await Accounts.getById(req.params.id)
      if(account) {
        //console.log('account by id is working')
        req.account = account
        next()
      } else {
        next({
          status:404,
          message: "account not found"
        })
        
      }
  } catch(next){
  }
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
  logger,
}