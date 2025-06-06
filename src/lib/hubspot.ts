// lib/hubspot.ts
import { Client } from '@hubspot/api-client';


const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});


export default hubspotClient;
