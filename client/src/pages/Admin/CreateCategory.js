import React,{useEffect, useState} from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd';
import { get } from 'mongoose';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  //handel form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/category/create-category', {name});
      if(data?.success){
        toast.success(`${name} is created`);
        getAllCategory();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating category");
    }
  }

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

  //handle update
  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    console.log("Updating category:", selected, updatedName); // debug log

    const { data } = await axios.put(
      `/api/v1/category/update-category/${selected}`,
      { name: updatedName }
    );

    if (data.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Update error:", error.response || error);
    toast.error("Something went wrong while updating category");
  }
};

  //handle delete
  const handleDelete = async (pId) => {

  try {
    console.log("Updating category:", selected, updatedName); // debug log

    const { data } = await axios.delete(
      `/api/v1/category/delete-category/${pId}`
    );

    if (data.success) {
      toast.success(`Category is deleted`);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Update error:", error.response || error);
    toast.error("Something went wrong while deleting category");
  }
};


  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3 w-50">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>
              <div className="w-75">
                <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
              {categories?.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td><button className="btn btn-primary ms-2" onClick={() => {setVisible(true); setUpdatedName(category.name); setSelected(category._id);}}>Edit</button></td>
                  <td><button className="btn btn-primary ms-2" onClick={() => {handleDelete(category._id)}}>Delete</button></td>
                </tr>
              ))}
            </tbody>
                
                </table>
              </div>
              <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
              </Modal>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory