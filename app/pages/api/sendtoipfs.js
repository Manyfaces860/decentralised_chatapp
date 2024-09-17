// pages/api/ipfs.js

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import {config} from 'dotenv';

const JWT = `Bearer ${process.env.PINATA_JWT_KEY}`;
const url = process.env.PINATA_URL
console.log('-----------------------------------------------------------------------------------------------------------')
console.log(JWT ,'jwt key')

export default async function handler(req, res) {
  console.log('was here--------')
  if (req.method === 'POST') {
    try {
          // console.log('was here too--------')
          // const data = JSON.parse(req.body)
          console.log(req.body ,'body')
          console.log(data, 'data')
          console.log(data.message)
          const src = "C:/Users/agbli/Desktop/nextjsprojects/chat-app/app/pages/static/filetosend.json";
          const formData = new FormData();
            
          const jsonString = JSON.stringify(data.message, null, 2); // The third parameter (2) is for indentation

          // Write the JSON string to the file
          fs.writeFile(src ,jsonString , 'utf8', (err) => {
            if (err) {
              console.error('Error writing to JSON file:', err);
              return;
            }
            console.log('JSON file written successfully');
          })
          console.log('2')
          const file = fs.createReadStream(src);
          formData.append('file', file);
          console.log('3')
          
          const pinataMetadata = JSON.stringify({
            name: 'messages',
          });
          formData.append('pinataMetadata', pinataMetadata);
    
          const pinataOptions = JSON.stringify({
            cidVersion: 0,
          });
          formData.append('pinataOptions', pinataOptions);
    
          const result = await axios.post(url, formData, {
            maxBodyLength: "Infinity",
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: JWT,
            },
          });
          console.log('successfull ----------------------------successfull-----------------------')
          res.status(200).json(result.data);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
}
