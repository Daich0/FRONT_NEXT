import { useState } from "react"

export const UseForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e) => {


    
     setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    }) 
  }
  const handleImageChange = (imageUrl) => {
    setFormValues({
      ...formValues,
      image: imageUrl,
    });
  };

  const reset = () => {
    setFormValues(initialState)
  }
 
  


  return [formValues,handleImageChange, handleInputChange, reset];
}