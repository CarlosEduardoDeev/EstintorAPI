const router = require("express").Router()


//Models do Extintor
const Extintor = require("../../Models/Extintor/index")

// ROTA DE ADD EXTINTOR, criar extintor na lista 
router.post('/extintor/add',async (req,res) =>{
    
    //Criar Dados
    const {numeracao,ano,tipo,peso,local,obs} = req.body
    //Validaçoes
    if (!numeracao){ res.status(422).json({erro: "Precisa adicionar a numeração"})
     return
}
    if(!ano){return  res.status(422).json({msg:"Precisa digitar o ano"})}
    if(!tipo){return res.status(422).json({msg:"Precisa digitar o tipo"})}
    if(!peso){return res.status(422).json({msg:"Precisa digitar o peso"})}
    if(!local){return res.status(422).json({msg:"Precisa digitar o local"})}
    const numeracaoExist = await Extintor.findOne({numeracao:numeracao})    

    //Validação se existe algum Extintor cadastrado
    if(numeracaoExist){return res.status(422).json({msg:"Extintor ja cadastrado !"})}


    const extintor = {numeracao,ano,tipo,peso,local,obs}
    try{
        await Extintor.create(extintor)
        res.status(201).json({msg: "Extintor Cadastrado"})

    }catch(error){
        res.status(500).json({ error:error})
    }
})



// ROTA DE PUXAR OS EXTINTORES, puxando dados dos extintores 
router.get('/extintor/list', async (req,res) =>{
   try{
        const extintores =  await Extintor.find()
        
        res.status(200).json(extintores)

   }catch(error){
        res.status(500).json({error: error})

    }
})


//ROTA DE PUXAR DADOS PELA ID, Puxando dados pelo QRCODE
// Puxar os dados 
router.get('/extintor/:id', async (req,res) =>{
    
    const id = req.params.id;

    const extintores =  await Extintor.findOne({_id:id})

    if(!extintores){return res.status(422).json({msg:"Exintor nao encontrado !"})}
    try{

     res.status(200).json(extintores)
 
    }catch(error){
 
         res.status(500).json({error: error})
 
     }
 })

 //ROTA DE DELETAR OS DADOS DO EXTINTOR
// Deletar os dados

 router.delete('/extintor/delete/:id', async (req,res) =>{
    
    const id = req.params.id

    const extintores =  await Extintor.findOne({_id:id})

    if(!extintores){return res.status(422).json({msg:"Exintor nao encontrado !"})}

    try{

     await Extintor.deleteOne({_id:id})
     res.status(200).json({msg:"Extintor excluido !"})
 
    }catch(error){
          res.status(500).json({error: error})
     }
})


module.exports = app => app.use('/equipamento',router)