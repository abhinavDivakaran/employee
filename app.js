const Express=require('express');
var app= Express();

var bodyparser = require('body-parser');

const Mongoose=require('mongoose');

var request=require('request');

app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));


const employee=Mongoose.model("employeedetails",{
    name:String,
    desigination:String,
    salary:String 
});


Mongoose.connect("mongodb://localhost:27017/employeedb");

app.get('/',(req,res)=>{

    res.render("index");
});

app.post('/',(req,res)=>{

    console.log(req.body);

    var employeeobj=new employee(req.body);
    var result=employeeobj.save((error,data)=>{
        console.log("user Added");
    });
});

app.get('/getemployeeapi/:salary',(req,res)=>{
    var sal=req.params.salary;
    employee.find({salary:sal},(error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data);
        }
    });   
});

app.get('/getdata',(req,res)=>{
    result=employee.find((error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data);
        }
    }

    )});

    const getdataapii="http://localhost:3456/getdata"//ivideaanu calling nadakkunnath.


app.get('/view',(req,res)=>{
   
    request(getdataapii,(error,response,body)=>{
        var data=JSON.parse(body);

        console.log(data)

        res.render('view',{'data':data});


    });

});



    app.listen(process.env.PORT || 3456,()=>{
        console.log("Working Server...::3456...");
    });    