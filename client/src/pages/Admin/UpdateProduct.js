import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { set } from 'mongoose';
const {Option} = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [fragranceNotes, setFragranceNotes] = useState({
        top: [],
        middle: [],
        base: []
    });
    const [scentFamily, setScentFamily] = useState('');
    const [gender, setGender] = useState(null);
    const [longevity, setLongevity] = useState(null);
    const [occasion, setOccasion] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [tags, setTags] = useState([]);
    const [shipping, setShipping] = useState(null);
    const [id, setId] = useState('');

    //get single product
    const getSingleProduct = async () =>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            if(data?.success){
                const product = data.product;
                setName(product.name);
                setId(product._id);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category._id);
                setFragranceNotes({
                    top: product.fragranceNotes.top,
                    middle: product.fragranceNotes.middle,
                    base: product.fragranceNotes.base
                });
                setScentFamily(product.scentFamily);
                setGender(product.gender);
                setLongevity(product.longevity);
                setOccasion(product.occasion);
                setQuantity(product.quantity);
                setTags(product.tags);
                setShipping(product.shipping);
                setCategory(product.category._id);
            }
        }
        catch(error){
        console.error(error);
        toast.error("Something went wrong while fetching product details");
        }
    }
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    },[])

    //get all categories
    const getAllCategory = async () => {
        try{
        const {data} = await axios.get('/api/v1/category/get-categories');
        if(data?.success){
            setCategories(data?.categories || []); 
        }else{
            toast.error(data?.message);
        }
        }catch(error){
        console.error(error);
        toast.error("Something went wrong while fetching categories");
        }
    }
    useEffect(() => {
        getAllCategory();
        }, []);

        //handle form submit
    const handelUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            photo && formData.append('photo', photo);
            formData.append('fragranceTop', fragranceNotes.top.join(','));
            formData.append('fragranceMiddle', fragranceNotes.middle.join(','));
            formData.append('fragranceBase', fragranceNotes.base.join(','));
            formData.append('scentFamily', scentFamily);
            formData.append('gender', gender);
            formData.append('longevity', longevity);
            formData.append('occasion', occasion);
            formData.append('quantity', quantity);
            formData.append('tags', tags.join(','));
            formData.append('shipping', shipping);

            const { data } = await axios.put(
            `http://localhost:3000/api/v1/product/update-product/${id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (data?.success) {
            toast.success(`${name} is updated`);
            navigate('/dashboard/admin/products');
            // reset form if needed
            } else {
            toast.error(data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating product");
        }
    };

    //handle delete
    const handelDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?");
            if (!answer) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.success(`${name} is deleted`);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting product");
        }
    }


  return (
    <Layout>
        <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <Select variant={false} placeholder="Select Category" size="large" showSearch className="form-select mb-3" onChange={(value) => setCategory(value)} value={category}>
                  {categories.map((cat) => (
                    <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}
                  <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                  </label>
                </div>
                <div className="mb-3">
                    {photo ? (
                        <div className="text-center">
                        <img 
                            src={URL.createObjectURL(photo)} 
                            alt="Product" 
                            className="img-fluid" 
                            style={{ height: '200px' }} 
                        />
                        </div>
                    ) : id ? (
                        <div className="text-center">
                        <img 
                            src={`/api/v1/product/product-photo/${id}`} 
                            alt="Product" 
                            className="img-fluid" 
                            style={{ height: '200px' }} 
                        />
                        </div>
                    ) : (
                        <div className="text-center">
                        <p>No product photo</p>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Product Name" value={name || ""} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" placeholder="Description" value={description || ""} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <input type="number" className="form-control" placeholder="Price" value={price || ""} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Fragrance Notes (Top)" value={fragranceNotes.top.join(', ')} onChange={(e) =>
                  setFragranceNotes({
                    ...fragranceNotes,
                    top: e.target.value.split(',').map(note => note.trim())})}/>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Fragrance Notes (Middle)" value={fragranceNotes.middle.join(', ')} onChange={(e) =>
                  setFragranceNotes({
                    ...fragranceNotes,
                    middle: e.target.value.split(',').map(note => note.trim())})} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Fragrance Notes (Base)" value={fragranceNotes.base.join(', ')} onChange={(e) =>
                  setFragranceNotes({
                    ...fragranceNotes,
                    base: e.target.value.split(',').map(note => note.trim())})} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Scent Family" value={scentFamily} onChange={(e) => setScentFamily(e.target.value)} />
                </div>
                <div className="mb-3">
                  <Select className="form-select mb-3" size="large" placeholder="Select Gender" variant={false} value={gender} onChange={(value) => setGender(value)}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Unisex">Unisex</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <Select
                    className="form-select mb-3"
                    size="large"
                    placeholder="Select Longevity"
                    value={longevity}
                    onChange={(value) => setLongevity(value)}
                  >
                    <Option value="Moderate">Moderate</Option>
                    <Option value="Long-lasting">Long-lasting</Option>
                    <Option value="Very Long-lasting">Very Long-lasting</Option>
                    <Option value="Eternal">Eternal</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Occasion" value={occasion || ""} onChange={(e) => setOccasion(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="number" className="form-control" placeholder="Quantity" value={quantity || ""} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tags (comma separated)"
                    value={tags.join(", ")}   // join array to string
                    onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))} 
                    />
                </div>
                <div className="mb-3">
                  <Select
                    className="form-select mb-3"
                    size="large"
                    placeholder="Select Shipping"
                    onChange={(value) => setShipping(value)}
                    value={shipping}
                    >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                </Select>
                </div>
                <div className='mb-3'>
                  <button className="btn btn-primary" onClick={handelUpdate}>Update Product</button>
                </div>
                <div className='mb-3'>
                  <button className="btn btn-primary" onClick={handelDelete}>Delete Product</button>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct