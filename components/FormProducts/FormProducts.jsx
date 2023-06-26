'use client'

import { useFormik } from "formik"
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import axios from "axios";

export default function FormProducts (){

    const [images, setImages] = useState([]);
    const [sizeValue, setSizeValue] = useState([]);
    const [colorValue, setColorValue] = useState([])

  
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(4),
        category: Yup.string().required('Category is required').min(4),
        color: Yup.string().required('Color is required'),
        gender: Yup.string().required('Gender is required'),
        season: Yup.string().required('Season is required'),
        brand: Yup.string().required('Brand is required'),
        price: Yup.number().positive('Price must be a positive number'),
        articleCode:Yup.string().required('articleCode is required'),
        stock: Yup.number().positive('Price must be a positive number'),
        size:Yup.string().max(15, 'Field cannot exceed 15 characters'),
      });

    const formik = useFormik({
        initialValues: {
          name: '',
          category: '',
          gender: '',
          size: '',
          color: '',
          season: '',
          stock: '',
          brand: '',
          price: 1,
          articleCode:""
        },
        validationSchema: validationSchema,
        validate: (values) => {
          const errors = {};
      
          if (sizeValue.length === 0) {
            errors.sizeValue = "At least one size is required";
          }
      
          return errors;
        },
        onSubmit: (values) => { 
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("category", values.category);
            formData.append("gender", values.gender);
            sizeValue.forEach((value) => {
              formData.append("size[]", JSON.stringify(value));
              });
            formData.append("color", values.color);
            formData.append("season", values.season);
            formData.append("stock", values.stock);
            formData.append("brand", values.brand);
            formData.append("articleCode", values.articleCode);
            formData.append("price", values.price);
            images.forEach((file) => {
              formData.append("images", file);
            });
            console.log(formData)
            axios.post("https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/products", formData)
            .then((response)=>{
                alert("product created");
                console.log(response.data);
                formik.setValues(formik.initialValues);
                setSizeValue([])
                setImages([])
            })
            .catch((error) => {
                console.log(error);
                alert("error");
              });
        },
      });

      useEffect(() => {
        formik.validateForm();
      }, [formik.values, sizeValue]);
    useEffect(()=>{
        console.log({color:colorValue,size:sizeValue})
    },[sizeValue,colorValue])
      const handleChange = (event) => {
        formik.handleChange(event); 
      };
      const handleClick = (event) =>{
        if(formik.values.size.length>0&&formik.values.stock!=0){
        setSizeValue([...sizeValue,{size:formik.values.size, stock:formik.values.stock}])
      }
      else{
        alert('Invalid Values in "Size or Stock"')
      }
        formik.setFieldValue('size', '');
        formik.setFieldValue('stock', 1);
        console.log(size)
      }
      const handleClickColor = (event) =>{
        setColorValue([...colorValue,formik.values.color])
        formik.setFieldValue('color', '');
        console.log(color)
      }
      function handleImage(files) {
        const selectFiles = Array.from(files).slice(0, 3);
        setImages(selectFiles);
      }
      const handleBlur = (event) => {
        formik.handleBlur(event); 
      };

      const handleDlete = (value) =>{
        let newArr = sizeValue.filter((size)=>size.size!=value)
        setSizeValue(newArr)
      }
    
      return (
              <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-black">Add your products</h1>
              <form onSubmit={formik.handleSubmit} className="w-full mt-8">
                <div className="mb-6 my-6">
                  <label htmlFor="name" className="text-lg mb-2">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="e.g., Martin"
                    onChange={handleChange}
                    value={formik.values.name}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.errors.name && (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                  )}
            </div>
            <div className="mb-6 my-6">
                <label htmlFor="category" className="flex flex-col gap-y-[0.4rem]">Category: </label>
                <select
                id="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formik.values.category}
                className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '1rem',
                  marginTop: '0.5rem',
                  width: '80%', // Ajusta el valor según tus necesidades
                }}
              >
                <option value="">Select</option>
                <option value="shoe">Shoe</option>
                <option value="hoodie">Hoodie</option>
                <option value="t-shirt">T-shirt</option>
                <option value="pants">Pants</option>
              </select>
                {formik.errors.category &&(
                <div className="text-red-500 text-sm">{formik.errors.category}</div>
                )}
            </div>
            <div className="mb-6 my-6">
            <label htmlFor="gender" className="flex flex-col gap-y-[0.4rem]">
                Gender:
              </label>
              <select
                id="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formik.values.gender}
                className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '1rem',
                  marginTop: '0.5rem',
                  width: '80%', // Ajusta el valor según tus necesidades
                }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="child">Child</option>
              </select>
                {formik.errors.gender && (
                <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                )}
            </div>
            <div className="flex flex-row gap-4 mb-6 my-6">
            <div className="flex-1">
              <label htmlFor="size" className="flex flex-col gap-y-[0.4rem]">Size:</label>
              <input type="text" id="size" placeholder="eje: 42" onChange={handleChange} value={formik.values.size} onBlur={handleBlur} className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"/>
              {(formik.errors.size) && (setSizeValue && sizeValue.length === 0) && (
                <div className="text-red-500 text-sm">{formik.errors.size}</div>
              )}
              <label htmlFor="stock" className="flex flex-col gap-y-[0.4rem]">Stock:</label>
              <input type="number" id="stock" placeholder="eje: 42" onChange={handleChange} value={formik.values.stock} onBlur={handleBlur} className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"/>
              {(formik.errors.stock) && (setSizeValue && sizeValue.length === 0) && (
                <div className="text-red-500 text-sm">{formik.errors.stock}</div>
              )}
              {!formik.errors.size && !formik.errors.stock && (
                 <button onClick={handleClick} className="text-[1rem] py-4 px-[2rem] bg-black text-white rounded-[1rem] w-24 mx-auto relative shadow-md shadow-[#11111180]">
                 <span className="absolute inset-0 flex items-center justify-center">Add</span>
               </button>
              )}
            </div>
            {sizeValue && sizeValue.length > 0 && (
              <div className="flex-1">
                <br />
                {sizeValue.map((siz, index) => (
                  <div key={index}>
                    <hr className="w-64"/>
                    <span>Size: {siz.size} - </span>
                    <span>Stock: {siz.stock}</span>
                    <span className="text-red-500 cursor-pointer hover:underline" onClick={() => handleDlete(siz.size)}>   x</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
          {formik.errors.sizeValue && (
            <div className="text-red-500 text-sm">{formik.errors.sizeValue}</div>
          )}
          </div>
            <div className="mb-6 my-6">
                <label htmlFor="color" className="flex flex-col gap-y-[0.4rem]">Color: </label>
                <input type="text" id="color" placeholder="eje: Red" onChange={handleChange} value={formik.values.color} onBlur={handleBlur} className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"/>
                {formik.errors.color && (
                <div className="text-red-500 text-sm">{formik.errors.color}</div>
                )}
            </div>
            <div className="mb-6 my-6">
                <label htmlFor="season" className="flex flex-col gap-y-[0.4rem]">Season: </label>
                <select id="season" onChange={handleChange} onBlur={handleBlur} value={formik.values.season} className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '1rem',
                  marginTop: '0.5rem',
                  width: '80%', // Ajusta el valor según tus necesidades
                }}>
                    <option value="">Select</option>
                    <option value="spring">Spring </option>
                    <option value="summer">Summer </option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter </option>
                </select>
                {formik.errors.season && (
                <div className="text-red-500 text-sm">{formik.errors.season}</div>
                )}
            </div>
            <div className="justify-start mb-6 my-6"> 
              <label
                htmlFor="images"
                className=" gap-y-[0.4rem]"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '1rem',
                  width: '60%',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '1rem',
                  boxShadow: '0 0.2rem 0.4rem rgba(17, 17, 17, 0.5)',
                }}
              >
                Images: {`${images?images.length:0} Images selected `}
                <input
                  type="file"
                  multiple
                  id="images"
                  placeholder="Choose Images"
                  onChange={(e) => handleImage(e.target.files)}
                  style={{
                    display: 'none',
                  }}
                />
              </label>
            </div>
            <div className="mb-6 my-6">
                <label htmlFor="brand" className="flex flex-col gap-y-[0.4rem]">Brand: </label>
                <input type="text" id="brand" placeholder="eje: Nike" onChange={handleChange} value={formik.values.brand} onBlur={handleBlur} className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]  w-[30rem]"/>
                {formik.errors.brand && (
                <div className="text-red-500 text-sm">{formik.errors.brand}</div>
                )}
            </div>
            <div className="mb-6 my-6">
                <label htmlFor="price">Price: $</label>
                <input type="number" id="price" placeholder="eje: 500" onChange={handleChange} value={formik.values.price} onBlur={handleBlur} className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"/>
                {formik.errors.price && (
                <div className="text-red-500 text-sm">{formik.errors.price}</div>
                )}
            </div>
            <div className="mb-6 my-6">
                <label htmlFor="articleCode">Aticle Code</label>
                <input type="text" id="articleCode" placeholder="eje: 500" onChange={handleChange} value={formik.values.articleCode} onBlur={handleBlur} className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"/>
                {formik.errors.articleCode && (
                <div className="text-red-500 text-sm">{formik.errors.articleCode}</div>
                )}
            </div>
            <div className="mb-6 my-6 flex justify-center">
            {!formik.errors.articleCode && !formik.errors.brand && !formik.errors.category && !formik.errors.category && !formik.errors.color && !formik.errors.gender && !formik.errors.name && !formik.errors.price && !formik.errors.season && sizeValue && sizeValue.length>0 && (
          <button type="submit"  className="font-normal text-[1rem] py-2 px-3 bg-black text-white transform -skew-x-12 w-24 h-12 shadow-md hover:bg-green-500 transition-colors duration-300"
          style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)' }}>Submit</button>
        )}
        </div>
        </form>
    </div>
    )
}