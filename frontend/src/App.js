import React, { useState } from 'react';
import ItemManager from './components/ItemManager';
import Basket from './components/Basket';
import RecipeDisplay from './components/RecipeDisplay';
import './App.css';
import axios from 'axios';

const App = () => {
    const [basketItems, setBasketItems] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [recipeError, setRecipeError] = useState('');

    const addItemToBasket = (item) => {
        setBasketItems(prevItems => [...prevItems, item]);
    };

    const generateRecipe = async () => {
        if (basketItems.length === 0) {
            setRecipeError('Please add items to the basket to generate a recipe.');
            setRecipe(null);
            return;
        }

        setRecipeError('');
        try {
            const response = await axios.post('http://localhost:5000/api/recipes/generate', { basketItems });
            setRecipe(response.data.recipe);
        } catch (error) {
            console.error('Error generating recipe:', error);
            setRecipeError(error.response?.data?.error || 'Failed to generate recipe.');
            setRecipe(null);
        }
    };

    return (
        <div className="app">
            <h1>Recipe Generator</h1>
            <div className="container">
                <ItemManager onAddItemToBasket={addItemToBasket} />
                <Basket items={basketItems} />
            </div>
            <button onClick={generateRecipe} disabled={basketItems.length === 0}>
                Generate Recipe
            </button>
            {recipeError && <p className="error">{recipeError}</p>}
            <RecipeDisplay recipe={recipe} />
        </div>
    );
};

export default App;