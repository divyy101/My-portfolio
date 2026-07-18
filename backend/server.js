import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

// In-Memory Cache
const cache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 mins

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, { timestamp: Date.now(), data });
}

// ----------------------------------------------------
// 1. GitHub Contributions Proxy API
// ----------------------------------------------------
app.get('/api/github/contributions/:username', async (req, res) => {
  const { username } = req.params;
  const cacheKey = `github_${username}`;

  const cachedData = getCached(cacheKey);
  if (cachedData) {
    return res.json({ source: 'cache', data: cachedData });
  }

  try {
    // Fetch from GitHub contribution provider or fallback parser
    const response = await fetch(`https://github-contributions-api.jmondi.org/v1/${username}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API HTTP error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return res.json({ source: 'live', data });
  } catch (err) {
    console.error('GitHub Proxy Error:', err.message);
    // Fallback response generator if network fails
    const fallbackWeeks = [];
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const count = Math.random() > 0.6 ? Math.floor(Math.random() * 8) : 0;
        days.push({ count, level: count > 6 ? 4 : count > 3 ? 3 : count > 1 ? 2 : count > 0 ? 1 : 0 });
      }
      fallbackWeeks.push({ days });
    }
    return res.json({ 
      source: 'fallback', 
      data: { total: { 2025: 1284, 2026: 412 }, contributions: fallbackWeeks } 
    });
  }
});

// ----------------------------------------------------
// 2. LeetCode Activity Proxy API (GraphQL)
// ----------------------------------------------------
app.get('/api/leetcode/:username', async (req, res) => {
  const { username } = req.params;
  const cacheKey = `leetcode_${username}`;

  const cachedData = getCached(cacheKey);
  if (cachedData) {
    return res.json({ source: 'cache', data: cachedData });
  }

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        submissionCalendar
        profile {
          ranking
          reputation
          starRating
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        topPercentage
        totalParticipants
      }
    }
  `;

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode GraphQL error: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors || !json.data || !json.data.matchedUser) {
      throw new Error('LeetCode user not found or private');
    }

    const userData = json.data;
    setCache(cacheKey, userData);
    return res.json({ source: 'live', data: userData });
  } catch (err) {
    console.error('LeetCode Proxy Error:', err.message);
    // Mock/Fallback realistic data structure
    const fallbackData = {
      matchedUser: {
        username: username,
        submitStats: {
          acSubmissionNum: [
            { difficulty: 'All', count: 342, submissions: 580 },
            { difficulty: 'Easy', count: 145, submissions: 200 },
            { difficulty: 'Medium', count: 165, submissions: 310 },
            { difficulty: 'Hard', count: 32, submissions: 70 },
          ]
        },
        submissionCalendar: JSON.stringify({
          [Math.floor(Date.now() / 1000) - 86400 * 2]: 4,
          [Math.floor(Date.now() / 1000) - 86400 * 1]: 6,
          [Math.floor(Date.now() / 1000)]: 3,
        }),
        profile: { ranking: 48210, reputation: 320 }
      },
      userContestRanking: { rating: 1685, globalRanking: 24100, topPercentage: 12.5 }
    };
    return res.json({ source: 'fallback', data: fallbackData });
  }
});

// ----------------------------------------------------
// 3. Blog Data API
// ----------------------------------------------------
app.get('/api/blogs', (req, res) => {
  const blogs = [
    {
      id: 'my-mern-journey',
      title: 'My MERN Journey: From Basics to Full-Stack Architect',
      slug: 'my-mern-journey',
      category: 'Web Dev',
      readTime: '6 min read',
      date: 'July 2026',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      excerpt: 'How I navigated state management, REST APIs, JWT authentication, and full-stack deployment patterns.',
      content: `### Building Scalable Full-Stack Web Applications
Transitioning from standard frontend HTML/CSS to full-stack MERN architecture was one of the most rewarding shifts in my software engineering learning path.

#### Key Milestones:
1. **API First Mindset**: Designing clean REST APIs with Express and Node.js.
2. **MongoDB Schemas**: Structuring non-relational database models with Mongoose.
3. **React State & Hooks**: Mastering component lifecycles, context API, and optimized rendering.
4. **Authentication**: Securing user sessions using JSON Web Tokens (JWT) and HTTP-only cookies.`
    },
    {
      id: 'how-i-started-dsa',
      title: 'How I Started DSA: Java, Patterns & Consistent Problem Solving',
      slug: 'how-i-started-dsa',
      category: 'Data Structures',
      readTime: '8 min read',
      date: 'June 2026',
      tags: ['Java', 'Algorithms', 'LeetCode', 'DSA'],
      excerpt: 'My step-by-step roadmap for mastering array manipulation, dynamic programming, and graph algorithms in Java.',
      content: `### Navigating Data Structures & Algorithms
Solving complex problems requires more than memoizing code — it requires pattern identification.

#### Core Patterns Mastered:
- **Two Pointers & Sliding Window** for string/array optimization.
- **Fast & Slow Pointers** for linked list cycle detection.
- **Recursion & Backtracking** for tree traversals and N-Queens.
- **Dynamic Programming** to reduce exponential time complexity down to polynomial bounds.`
    },
    {
      id: 'building-campus-cognition',
      title: 'Building Campus Cognition: Multi-Agent AI for Students',
      slug: 'building-campus-cognition',
      category: 'AI & Systems',
      readTime: '7 min read',
      date: 'May 2026',
      tags: ['AI', 'Gemini API', 'MERN', 'FastAPI'],
      excerpt: 'Architecting an AI platform that assists students with syllabus analysis, PYQs, and code debugging.',
      content: `### Multi-Agent Decision Engines
Campus Cognition was designed to solve academic information fragmentation.

Using specialized LLM agents integrated with Gemini API, the platform provides tailored scholarship recommendations, syllabus mapping, and automated exam preparation prompts.`
    },
    {
      id: 'temple-crowd-management-architecture',
      title: 'Temple Crowd Management Architecture & High-Density Analytics',
      slug: 'temple-crowd-management-architecture',
      category: 'System Design',
      readTime: '9 min read',
      date: 'April 2026',
      tags: ['Crowd Analytics', 'System Design', 'IoT', 'AI Surveillance'],
      excerpt: 'Engineering intelligent crowd flow monitoring and queue density metrics for major pilgrimage centers.',
      content: `### High-Density Pilgrimage Site Analytics
Managing high-density crowds during festival peaks requires real-time telemetry, queue bottleneck detection, and automated alert systems.`
    },
    {
      id: 'lessons-from-hackathons',
      title: 'Lessons from Hackathons & Leadership as NIITS Vice President',
      slug: 'lessons-from-hackathons',
      category: 'Leadership',
      readTime: '5 min read',
      date: 'March 2026',
      tags: ['NIITS', 'Leadership', 'Hackathons', 'Teamwork'],
      excerpt: 'What leading technical societies and competing in ideathons taught me about rapid prototyping and teamwork.',
      content: `### Leading Tech Societies & Team Vectormind
Serving as Vice President of NIITS taught me how to foster innovation, organize hackathons, and guide peer developers to turn ideathon concepts into shipping software.`
    }
  ];

  res.json({ blogs });
});

// ----------------------------------------------------
// 4. Contact Form Handler
// ----------------------------------------------------
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log(`Received message from ${name} (${email}): ${message}`);
  res.json({ success: true, message: 'Message received successfully! Divyansh will get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`Portfolio API Proxy Server running on http://localhost:${PORT}`);
});
