import dish from "../Modal/Dish.js";

export const addDishHandler = async (req, res) =>{
  try {
    const {
      title,
      description,
      prize,
      cuisine_type,
      dish_type,
      choices,
      dishUrl,
    } = req.body;

    const newDish = new dish({
      title,
      description,
      prize,
      cuisine_type,
      dish_type,
      choices,
      dishUrl,
    });

    await newDish.save();

    return res.status(201).json({ message: 'Dish added successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteDishHandler = async (req, res) => {
    try {
      const dishId = req.params.dishId; 

      const deletedDish = await dish.findByIdAndDelete(dishId);
  
      if (!deletedDish) {
        return res.status(404).json({ message: 'Dish not found.' });
      }
  
      return res.status(200).json({ message: 'Dish deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const updateDishHandler = async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const updatedDishData = req.body;   
      const updatedDish = await dish.findByIdAndUpdate(dishId, updatedDishData, { new: true });
  
      if (!updatedDish) {
        return res.status(404).json({ message: 'Dish not found.' });
      }
  
      return res.status(200).json({ message: 'Dish updated successfully.', data : updatedDish });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const getAllDishHandler = async (req,res)=>{
    try {
        const dishes = await dish.find({})
        .sort({ timestamp: -1 }) .exec();
    
        return res.status(200).json({ message : "All Dishes" , data : dishes });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  }
  
  
  