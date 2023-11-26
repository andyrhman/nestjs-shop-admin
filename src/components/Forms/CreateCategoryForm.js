import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ErrorAlert from '../Alert/Error';

const CreateCategoryForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('category', {
        name
      })
      sessionStorage.setItem('createSuccess', '1');
      router.push('/categories')
    } catch (error) {
      console.error(error.response);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
        window.scrollTo(0, 0);
      }
    }
  }
  return (
    <>
      <ErrorAlert error={error}/>
      <form>
        <div className='mb-5'>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            placeholder="Category Name"
            className="input input-bordered w-full max-w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
      <div className="mb-5 flex justify-center">
        <button className="btn btn-success btn-wide" onClick={submit}>Submit</button>
      </div>
    </>
  )
}

export default CreateCategoryForm