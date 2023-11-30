const UsersModel=require('../Models/Users');

exports.registerPost=async (req, res) => {
    const {username,password}=req.body; 
    try {
      const user = await UsersModel.findOne({username:username})
      console.log(user)
    
      if (user) {
       return res.status(400).json({ message: 'Username already exists' });
     }
 
     const newUser = await UsersModel.create({ username, password: await bcrypt.hash(password, 10) });
     res.status(201).json({ message: 'User registered  dfdfdssuccessfully', newUser });
       
    } catch (error) {
     console.error('Registration failed:', error);
     res.status(500).json({ message: 'Internal server error' });
    }
     
}


exports.loginPost=async (req,res)=>{
    const {username,password}=req.body;
    try{
      const validUser=await UsersModel.findOne({username })
      console.log(validUser)
      if(!validUser){
       return res.status(404).json({ message: 'Usereer not found' });
       
      }
  
      
      const token = jwt.sign({ username}, secretKey, { expiresIn: '1d' });
      res.json({ token });
      console.log(token)
     
  
     }catch(error){
       console.error('LOgin Failed ',error);
       res.status(500).json ({message:'Internal server error'});
  
  
  
     }
    }
 