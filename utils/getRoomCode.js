import axios from 'axios';
export const getRoomCode = async()=>{

    const options = {
        method: 'GET',
        url: 'https://ludo-king-room-code-api2.p.rapidapi.com/rapidapi/CostomBot/classic/',
        params: {
          botname: 'Khiladibaaz'
        },
        headers: {
          'X-RapidAPI-Key': '33f922f66fmsh35ca224dcd07a41p1c4f54jsn238c6196fe6b',
          'X-RapidAPI-Host': 'ludo-king-room-code-api2.p.rapidapi.com'
        }
      };
      
      try {
            const response = await axios.request(options);
          console.log(response.data);
          return response.data;
      } catch (error) {
          console.error(error);
      }
}

