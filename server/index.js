import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { GoogleGenAI, Type } from '@google/genai';

// 1. Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Configure Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Configure Multer for in-memory PDF uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 4. Initialize Google Gemini AI Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 5. Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running smoothly!' });
});

// 6. Main AI Resume Analysis Route
app.post('/api/analyze-skills', upload.single('resumeFile'), async (req, res) => {
  console.log('---> 1. Incoming request received at /api/analyze-skills');
  try {
    const resumeText = req.body?.resumeText || '';
    const jobDescription = req.body?.jobDescription || '';

    if (!jobDescription.trim()) {
      return res.status(400).json({ error: 'Please provide a target job description.' });
    }

    if (!req.file && !resumeText.trim()) {
      return res.status(400).json({ error: 'Please upload a PDF resume or paste your resume text.' });
    }

    // Build the contents payload for Gemini (supports BOTH native PDF and plain text)
    const contents = [];

    if (req.file) {
      console.log(`---> 2. Attaching uploaded PDF directly to Gemini: ${req.file.originalname} (${req.file.size} bytes)`);
      contents.push({
        inlineData: {
          data: req.file.buffer.toString('base64'),
          mimeType: 'application/pdf',
        },
      });
    }

    const promptText = `
      You are an expert technical recruiter. Compare the candidate's Resume against the target Job Description.
      Return ONLY a valid JSON object with the exact following keys:
      - "matchScore": A number between 0 and 100 representing the overall match percentage.
      - "matchedSkills": An array of strings listing technical and soft skills found in both the resume and job description.
      - "missingSkills": An array of strings listing critical skills required by the job description that are missing from the resume.
      - "actionableFeedback": An array of 3 specific, one-sentence tips on how the candidate should tailor their resume for this role.

      ${!req.file ? `Candidate Resume:\n${resumeText}\n` : 'The Candidate Resume is attached as a PDF document.'}

      Target Job Description:
      ${jobDescription}
    `;

    contents.push(promptText);

    console.log('---> 3. Waiting for Gemini 3.8 Flash response...');

console.log('---> 3. Waiting for Gemini AI response...');

    const modelsToTry = [
      'gemini-3.8-flash',
      'gemini-flash-latest',
      'gemini-flash-lite-latest',
    ];

    let response = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`---> Trying model: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                matchScore: { type: Type.INTEGER },
                matchedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                actionableFeedback: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['matchScore', 'matchedSkills', 'missingSkills', 'actionableFeedback'],
            },
          },
        });
        // If successful, break out of the loop!
        break;
      } catch (err) {
        lastError = err;
        console.warn(`---> Model ${modelName} busy or unavailable (${err.status}). Trying next...`);
      }
    }

    if (!response) {
      throw lastError;
    }
    console.log('---> 4. Gemini response received! Sending to browser.');
    const analysisResult = JSON.parse(response.text);
    return res.status(200).json(analysisResult);

  } catch (error) {
    console.error('---> ERROR analyzing skills:', error);
    return res.status(500).json({
      error: `Server Error: ${error.message || 'Failed to analyze resume.'}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});