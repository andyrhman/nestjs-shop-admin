import React, { useState } from 'react'
import axios from 'axios'
import ErrorAlert from '../Alert/Error'
import CreateProductForm from '../Forms/CreateProductForm'

const CreateProducts = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')

    const [error, setError] = useState('')

    const submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('products', {
                title,
                description,
                image,
                price
            })
            sessionStorage.setItem('deleteSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    return (
        <>
            <dialog id="create_user" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Insert Your Products</h3>
                    <ErrorAlert error={error}/>
                    <CreateProductForm 
                        title={(e) => setTitle(e.target.value)}
                        description={(e) => setDescription(e.target.value)}
                        image={(e) => setImage(e.target.value)}
                        price={(e) => setPrice(e.target.value)}
                    />
                    <div className="modal-action space-x-2">
                        <form method="dialog">
                            <button className="btn btn-outline btn-error">Close</button>
                        </form>

                        <button className="btn btn-success" type='submit' onClick={submit}>Submit</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default CreateProducts