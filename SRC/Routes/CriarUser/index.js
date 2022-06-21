const router = require('express').Router()
const bcrypt = require('bcrypt')


const User = require('../../Models/User/index')




router.post('/auth/register', async (req,res) =>{
    const{name,setor,user,password,confirmpassword} = req.body

    //Validações na hora do post 
    if(!name){return res.status(422).json({msg:'Precisa do nome!'})}
    if(!user){return res.status(422).json({msg:'Precisa do nome do usuario!'})}
    if(!setor){return res.status(422).json({msg:'Insira o Setor !'})}
    if(!password){return res.status(422).json({msg:'Escreva o Password '})}
    if(password !== confirmpassword){return res.status(422).json({msg:'Senhas não conferem '})}

    //Validação para saber se ja á algum usuario 
    const userExist = await User.findOne({user:user})
    if(userExist){return res.status(422).json({msg:"Use outro usuario !"})}
    
    //Criação de senha com Bcrypt 
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    
    //Create Usuario
    const usuario = new User({
        name,
        user,
        setor,
        password:passwordHash,
    })
        try{
            await usuario.save()

            res.status(201).json({msg: 'Usuario Criado com sucesso! '})
            
        }catch(error){
            res.status(500).json({
                msg:'Erro de servidor tente mais tarde'
            })
        }


})


module.exports = app => app.use('/criaruser', router)