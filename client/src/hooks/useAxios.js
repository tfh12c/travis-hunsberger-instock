// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export const useAxios = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const getData = async () => {
//             setLoading(true);
//             try{
//                 const response = await axios.get(url);
//                 setData(response.data);
//                 setLoading(false);
//                 setError(null);
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//                 setError('Could not fetch data.');
//             }
//         }
//         getData();
//     }, [url])
//     return { data, loading, error }
// }