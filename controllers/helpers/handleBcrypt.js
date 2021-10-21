import bcryptjs from 'bcryptjs';

const encrypt = async (Text) => {
    const hash = await bcryptjs.hash(Text, 8);
    return hash;
}

export{
    encrypt
}