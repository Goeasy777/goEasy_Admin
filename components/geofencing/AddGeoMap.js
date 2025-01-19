// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'

// const AddGeoMap = () => {

//     let { name } = useParams();
//     const [mapLocation, setLocation] = useState()
//     const history = useNavigate();

//     useEffect(async () => {
//         await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name} &key=${process.env.REACT_APP_GOOGLEAPI}`)
//         .then(resp => resp.json())
//         .then(data =>{
//             console.log(data);
            
//             setLocation(data.result)
//         }
//     )
//     })
//     return (
//         <div>

//         </div>
//     )
// }

// export default AddGeoMap