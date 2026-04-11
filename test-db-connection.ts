import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { connect } from '@tidbcloud/serverless';

async function testConnection() {
  console.log('Testing TiDB Cloud Connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'Not Found');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing in .env.local');
    return;
  }

  try {
    const client = connect({ url: process.env.DATABASE_URL });
    const result = await client.execute('SELECT 1 + 1 AS result');
    console.log('Connection Successful!');
    console.log('Query Result:', result);
  } catch (error) {
    console.error('Connection Failed:', error);
  }
}

testConnection();
