import axios from 'axios';
import { useState } from 'react';
function TestApiMongo() {


const [finalData, setFinalData] = useState("FINAL");
  const url = 'https://eu-west-1.aws.data.mongodb-api.com/app/data-udnwu/endpoint/data/v1/action/findOne';
  const headers = {
    'Content-Type': 'application/json',
    'api-key': 'WGdlsu4CeTdlTO0btrz0SdQXcGj3DO5ei0dwTQhv4rXYgJu0MyXcqm9qGlHDu4zG'
  };
  const data = {
    collection: 'users',
    database: 'sample_mflix',
    dataSource: 'igcluster',
    projection: { _id: 1 }
  };

  axios.post(url, data, { headers })
    .then(response => {
      console.log(response.data);
      // Aquí puedes actualizar el estado de tu componente con la respuesta convirtiendola primero en un string
        setFinalData(JSON.stringify(response.data));
        

    })
    .catch(error => {
      console.error(error);
    });

  return (
    <div>
      <h1>{finalData}</h1>
      <p>hola</p>
    </div>
  );
}

export default TestApiMongo;
