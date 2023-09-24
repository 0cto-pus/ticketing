import mongoose, { mongo } from "mongoose";
import { Password } from "../services/password";


//user özelliklerinin tanımlandığı kısım burada
interface UserAttrs{
    email: string;
    password: string;
}

//interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
} 

//user doc properties
interface UserDoc extends mongoose.Document{
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            
        }
    }
});

userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) =>{
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User',userSchema);

/* const user = User.build({
    email: 'annen',
    password: 'net',
}); */

/* 
const buildUser = (attrs: UserAttrs )=>{
    return new User(attrs); //user typeları ile göndermek için bu fonksiyonu kullanıyoruz böylece type hatası alabiliriz.
    ****burası userSchema.statics.build de yapılıyor. bu örnekte sürekli dışarı export etmek zorunda kaldığımız için
    yorucu bir çözüm olacaktı mongoose bunun yerine statics.build fonksiyonunu sunuyor 
}; */


export {User};