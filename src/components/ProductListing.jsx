import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import { useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCategory(null);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
  

  console.log("Products :", products);
  return (
    <div className="ui grid container">
      <h1>Product List</h1>
    <div>
      <span>Filter by category:</span>
      {categories.map((category) => (
        <button key={category} onClick={() => handleCategorySelect(category)}>
          {category}
        </button>
      ))}
      <button onClick={() => handleCategorySelect(null)}>Clear</button>
    </div>
    <div className='topnav'>
      <input type="text" id="search" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search.." />
    </div>
    {filteredProducts.map((product) => (
      <div key={product.id}>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} />
        <p>{product.description}</p>
        <p><b>Price :$</b>{product.price}</p>
      </div>
    ))}
    </div>
  );
};

export default ProductPage;
