const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors()); app.use(express.json());
const Question = mongoose.model('Question', new mongoose.Schema({subject:String, chapter:String, difficulty:String, prompt:String, options:[String], answer:Number, explanation:String}));
const Progress = mongoose.model('Progress', new mongoose.Schema({userId:String, subject:String, topic:String, accuracy:Number, mastery:Number, lastPracticed:Date}));
const User = mongoose.model('User', new mongoose.Schema({name:String, email:String, streak:Number, xp:Number, prepScore:Number}));
app.get('/api/dashboard', async (_,res)=>res.json({streak:12, prepScore:72, xp:2840, weakTopics:[{topic:'Human Physiology',accuracy:54},{topic:'Chemical Bonding',accuracy:61},{topic:'Rotational Motion',accuracy:64}], recommendation:{subject:'Biology',topic:'Plant Kingdom',mastery:68}}));
app.get('/api/questions/adaptive', async (req,res)=>{ const {subject, difficulty='basic'}=req.query; const query={difficulty}; if(subject)query.subject=subject; const data=await Question.find(query).limit(20); res.json(data); });
app.post('/api/attempts', async (req,res)=>{ const accuracy=Number(req.body.accuracy||0); const nextDifficulty=accuracy>=75?'advanced':accuracy>=55?'moderate':'basic'; res.status(201).json({saved:true,nextDifficulty,recommendation:accuracy<55?'Revise this topic with a targeted practice set.':'You are ready for the next challenge.'}); });
app.post('/api/doubts', (req,res)=>res.json({answer:`Let’s work through “${req.body.question}” step by step. This answer can be replaced by an OpenAI-powered NEET tutor service.`, sessionsRemaining:4}));
const port = process.env.PORT || 5000;
let databaseStatus = 'not configured';

app.get('/api/health', (_, res) => res.json({
  ok: true,
  service: 'NEET Community API',
  database: databaseStatus
}));

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. The API will start, but database routes will be unavailable.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    databaseStatus = 'connected';
    console.log('Connected to MongoDB');
  } catch (error) {
    databaseStatus = 'unavailable';
    console.error('MongoDB connection failed:', error.message);
  }
}

app.listen(port, () => console.log(`API running on ${port}`));
connectDatabase();
