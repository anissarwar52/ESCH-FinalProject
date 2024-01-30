const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    shop:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    tokens:[
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
})



// Hashing The Password

shopSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();

});


//Generating Token
shopSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token});
        await this.save();
        return token;
    } catch (err) {   
        console.log(err);
    }
}


// Collection Creation
const Shopkeeper = mongoose.model('shopkeeper',shopSchema);
module.exports = Shopkeeper;