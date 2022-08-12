const {Router, json}=require('express');
const router= Router();
const fs = require('fs');
const uuid=require('uuid');


let userList=[];
router.get('/',(req,res)=>{
    res.render('index');
})

//router.get('/user_new',(req,res)=>{
//    res.render('new_user')
//});

router.get('/users',(req,res)=> {
    const data = JSON.parse(fs.readFileSync('src/user.json'));
    res.render('users', {data});
})

router.post('/user_new',(req,res)=>{
    const {name,phone,email,description}=req.body;
    //validacion
    const user={
        id:uuid.v4(),
        name,
        phone,
        email,
        description
    }
    const currentData = JSON.parse(fs.readFileSync('src/user.json'));
    currentData.unshift(user);
    console.log(currentData);
    const json_user=JSON.stringify(currentData);
    fs.writeFileSync('src/user.json',json_user,'utf-8');
    res.redirect('/');
})

router.get('/get/:id' ,(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/user.json'));
    //console.log(currentData);
    let newUserData = currentData.filter(user=> {
        return req.params.id == user.id;
    });
    console.log(newUserData);
    res.render('edituser', newUserData [0]);
});


router.post('/edituser',(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/user.json'));
    currentData.forEach(user=> {
        if(user.id == req.body.id) {
            user.name = req.body.name.length == 0 ? user.name : req.body.name;
            user.phone = req.body.phone.length == 0 ? user.phone : req.body.phone;
            user.email = req.body.email.length == 0 ? user.email : req.body.email;
            user.description = req.body.description.length == 0 ? user.description : req.body.email;
        } 

    });
    fs.writeFileSync('src/user.json', JSON.stringify(currentData), 'utf-8');
    res.redirect('/users');
    console.log(currentData);
    console.log(req.body.name.length);
});

router.get('/delete/:id',(req,res)=>{
    const currentData = JSON.parse(fs.readFileSync('src/user.json'));
    console.log(currentData);
    const newData = currentData.filter(user=>{
        return user.id != req.params.id;
    });
    fs.writeFileSync('src/user.json', JSON.stringify(newData), 'utf-8');
    res.redirect('/users');
})
module.exports=router;