// 'use client'
// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'


// const Page = () => {


//     const history = useNavigate();

//     const [name, setName] = useState();
//     let message = '';

//     const addName = () => {
//         axios.post('http://localhost:5000/addName', { name: name })
//             .then(response => {
//                 if (response) {
//                     message = response.data.message
//                     alert(message)
//                     history.push(`/map/${name}`)
//                 }
//             }).catch(err => console.log(err))
//     }
//     return (
//         <>
//             <div>
//                 <form onSubmit={SearchHandler}>
//                     <input type="search" placeholder='Search...' name="Search" value={name} onChange={(e) => setName(e.target.value)} />
//                     <button type='submit' onClick={addName} className='bg-blue-500 p-3'>Search</button>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default Page