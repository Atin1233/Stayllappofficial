const { VertexAI } = require('@google-cloud/vertexai');

const project = 'stayll';
const location = 'us-central1';
const model = 'gemini-2.0-flash-lite';

const vertexAI = new VertexAI({ project, location });

async function testVertexAI() {
  try {
    const generativeModel = vertexAI.getGenerativeModel({ model });
    const result = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: 'Say hello from Vertex AI!' }] }]
    });
    console.log('Vertex AI Response:', result);
  } catch (error) {
    console.error('Vertex AI Error:', error);
  }
}

testVertexAI(); 