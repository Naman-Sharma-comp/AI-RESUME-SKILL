import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Helper: Rejects if a model hangs longer than timeoutMs
function withTimeout(promise, timeoutMs, modelName) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Model ${modelName} timed out after ${timeoutMs / 1000}s`)),
        timeoutMs
      )
    ),
  ]);
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running smoothly!' });
});

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
      You are an expert technical recruiter and engineering career coach. Compare the candidate's Resume against the target Job Description.
      Return ONLY a valid JSON object with the exact following keys:
      - "matchScore": A number between 0 and 100 representing the overall match percentage.
      - "matchedSkills": An array of strings listing technical and soft skills found in both the resume and job description.
      - "missingSkills": An array of strings listing critical skills required by the job description that are missing from the resume.
      - "actionableFeedback": An array of 3 specific, one-sentence tips on how the candidate should tailor their resume for this role.
      - "learningRoadmap": An array of up to 4 objects for the most critical missing skills, each containing:
          * "skill": Name of the missing skill
          * "learningStep": A concise 1-sentence guide on what core concepts to learn first
          * "miniProjectIdea": A specific, practical mini-project idea the candidate can build to demonstrate this skill on their resume
      - "coverLetterPitch": A compelling 3-4 sentence tailored cover letter paragraph pitching the candidate's matched skills for this specific role.

      ${!req.file ? `Candidate Resume:\n${resumeText}\n` : 'The Candidate Resume is attached as a PDF document.'}

      Target Job Description:
      ${jobDescription}
    `;

    contents.push(promptText);

    console.log('---> 3. Waiting for Gemini AI response...');

    // Prioritize responsive models and enforce a 12-second timeout per attempt
    const modelsToTry = [
      'gemini-flash-lite-latest',
      'gemini-flash-latest',
      'gemini-3.8-flash',
    ];

    let response = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`---> Trying model: ${modelName}`);
        response = await withTimeout(
          ai.models.generateContent({
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
                  learningRoadmap: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        skill: { type: Type.STRING },
                        learningStep: { type: Type.STRING },
                        miniProjectIdea: { type: Type.STRING },
                      },
                      required: ['skill', 'learningStep', 'miniProjectIdea'],
                    },
                  },
                  coverLetterPitch: { type: Type.STRING },
                },
                required: [
                  'matchScore',
                  'matchedSkills',
                  'missingSkills',
                  'actionableFeedback',
                  'learningRoadmap',
                  'coverLetterPitch',
                ],
              },
            },
          }),
          12000,
          modelName
        );
        break;
      } catch (err) {
        lastError = err;
        console.warn(`---> ${modelName} failed or timed out (${err.message || err.status}). Trying next...`);
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