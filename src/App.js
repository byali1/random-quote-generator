import { useState } from 'react';
import './App.css';

function App() {

  const [quote, setQuote] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null); 

  const categories = [
    "age", "alone", "amazing", "anger", "architecture", "art", "attitude",
    "beauty", "best", "birthday", "business", "car", "change", "communication",
    "computers", "cool", "courage", "dad", "dating", "death", "design",
    "dreams", "education", "environmental", "equality", "experience", "failure",
    "faith", "family", "famous", "fear", "fitness", "food", "forgiveness",
    "freedom", "friendship", "funny", "future", "god", "good", "government",
    "graduation", "great", "happiness", "health", "history", "home", "hope",
    "humor", "imagination", "inspirational", "intelligence", "jealousy",
    "knowledge", "leadership", "learning", "legal", "life", "love", "marriage",
    "medical", "men", "mom", "money", "morning", "movies", "success"
  ];

  const getQuote = async () => {
    setError(null); 
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        method: "GET",
        headers: {
          'X-Api-Key': 'API-KEY' 
        },
      });
      const data = await response.json();
      
      if (data.length > 0) {
        setQuote(data[0]);
      } else {
        setError("No quotes found for this category.");
      }
    } catch (err) {
      setError("An error occurred while fetching the quote.");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "") {
      alert("Please, select a category!");
      return;
    }
    getQuote();
  };


  return (
    <>
      <div className='container mt-5'>
        <h1 className='text-center'>Random Quote Generator</h1>

        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <div className='border rounded w-75 text-center'>
              {error ? (
                <p className='my-3 text-danger'>{error}</p>
              ) : (
                <>
                  <p className='my-3' id='quote'>{quote ? quote.quote : "No quote generated yet."}</p>
                  <p className='my-3' id='author'>{quote ? `— ${quote.author}` : ""}</p>
                </>
              )}

              <div className='d-flex justify-content-center my-3'>
                <label htmlFor='category' className='me-2'>Category:</label>
                <select className="form-select w-25" value={category} onChange={(e) => setCategory(e.target.value)} name='category' aria-label="Quote Category" required>
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <button className='btn btn-dark mb-4' type='submit'>Generate Quote</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
