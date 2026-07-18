async function testLeetcode() {
  try {
    const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/divyy101');
    const json = await res.json();
    console.log('LeetCode API Result:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Leetcode error:', err.message);
  }
}

async function testLeetcodeDirect() {
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
        profile {
          ranking
          reputation
          starRating
        }
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({ query, variables: { username: 'divyy101' } })
    });
    const text = await res.text();
    console.log('Direct LeetCode Raw Response:', text.slice(0, 500));
  } catch (err) {
    console.error('Direct Leetcode Error:', err.message);
  }
}

async function testGithub() {
  try {
    const res = await fetch('https://github-contributions-api.jmondi.org/v1/divyy101');
    const text = await res.text();
    console.log('GitHub API Status:', res.status);
    console.log('GitHub API Raw Text:', text.slice(0, 300));
  } catch (err) {
    console.error('GitHub error:', err.message);
  }
}

testLeetcode();
testLeetcodeDirect();
testGithub();
