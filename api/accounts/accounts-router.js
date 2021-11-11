const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload,
        checkAccountNameUnique,
        checkAccountId, 
      } = require('./accounts-middleware')

      router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts =  await Accounts.getAll()
    res.status(200).json(accounts)
  } catch(next) { 
  }
})

router.get('/:id', checkAccountId,  (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/',checkAccountPayload,checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({
     name: req.body.name,
     budget: req.body.budget
    })
    res.status(201).json(newAccount)
   } catch (error) {
    next(error) 
   }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {

  try {
    const updateAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updateAccount)
  } catch(next) {

  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try { 
    const remAccount = await Accounts.deleteById(req.params.id)
    res.status(200).json({
      message:"The account has been removed"
    })
  } catch(next){

  }

})


router.use((err,req,res,next) =>{
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
