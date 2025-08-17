import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
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
  const [occasion, setOccasion] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tags, setTags] = useState([]);
  const [shipping, setShipping] = useState(null);

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
  const handelCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('photo', photo);
      formData.append('fragranceTop', fragranceNotes.top.join(','));
      formData.append('fragranceMiddle', fragranceNotes.middle.join(','));
      formData.append('fragranceBase', fragranceNotes.base.join(','));
      formData.append('scentFamily', scentFamily);
      formData.append('gender', gender);
      formData.append('longevity', longevity);
      formData.append('occasion', occasion);
      formData.append('quantity', quantity);
      formData.append('tags', JSON.stringify(tags));
      formData.append('shipping', shipping);
      const {data} = await axios.post('/api/v1/product/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if(data?.success){
        toast.success(`${name} is created`);
        navigate('/dashboard/admin/products');
        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setPhoto(null);
        setFragranceNotes({top: [], middle: [], base: []});
        setScentFamily('');
        setGender('');
        setLongevity('');
        setOccasion('');
        setQuantity('');
        setTags([]);
        setShipping(false);
      } else {
        toast.error(data?.message);
      }
    }
    catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating product");
    }
  }

  return (
    <Layout>
        <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9">
              <h1>Create Product</h1>
              <div className="m-1 w-75">
                <Select variant={false} placeholder="Select Category" size="large" showSearch className="form-select mb-3" onChange={(value) => setCategory(value)}>
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
                  {photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="Product" className="img-fluid" style={{height: '200px'}} />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <input type="number" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
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
                  <input type="text" className="form-control" placeholder="Occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="number" className="form-control" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Tags (comma separated)" value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(', '))} />
                </div>
                <div className="mb-3">
                  <Select className="form-select mb-3" size="large" variant={false} placeholder="Select Shipping" value={shipping} onChange={(value) => setShipping(value)}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select> 
                </div>
                <div className='mb-3'>
                  <button className="btn btn-primary" onClick={handelCreate}>Create Product</button>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct