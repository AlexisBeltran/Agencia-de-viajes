import bcryptjs from 'bcryptjs';

const encrypt = async (Text) => {
    const hash = await bcryptjs.hash(Text, 8);
    return hash;
}
const compare = async (passwordPlain, passowrdHash) =>{
    try{
        return await bcryptjs.compare(passwordPlain, passowrdHash);
    }catch(Error){
        console.log(Error);
    }
    
}
export{
    encrypt,
    compare
}