// Seeds data

const usernames = [
  "CodeNinja",
  "WebWizard",
  "DataDriven",
  "DevDynamo",
  "CloudCarl",
  "ReactRachel",
  "NodeNancy",
  "MongoMike",
  "FullStackFiona",
  "GitGuru",
  "AlexCoder",
  "SarahDev",
  "JavierJS",
  "TechTina",
  "ByteBob",
  "DebugDiana",
  "ServerSam",
  "ApiAmy",
  "SecureSteve",
  "OptimizeOlivia",
];

const thoughtContent = [
  "Just deployed my first MERN project! Feeling proud 💻",
  "React hooks are game-changing for managing state",
  "MongoDB flexibility is amazing for rapid development",
  "Finished my first full-stack authentication system!",
  "CSS Grid and Flexbox have changed how I build layouts",
  "GraphQL is the future of API design, change my mind",
  "Debugging async/await code can be tricky but so satisfying",
  "Finally understood how closures work in JavaScript!",
  "Building a social network has taught me so much about databases",
  "Express middleware is elegant once you understand the flow",
  "The best part of coding? That 'aha!' moment when it all clicks",
  "Working on performance optimization today, shaving off milliseconds",
  "Version control with Git is essential - can't imagine coding without it",
  "Just implemented real-time notifications with WebSockets",
  "Learning Docker to containerize my applications",
  "API design is harder than I thought but so important",
  "Testing my code has saved me so many bugs in production",
  "The MERN stack is perfect for building scalable applications",
  "Starting to understand Redis caching and its power",
  "Open source contributions are the best way to learn",
  "Code review feedback has made me a better developer",
  "Building this social network app is pushing my skills to the next level",
  "Refactored my code today and reduced it by 40% - clean code feels good",
  "Just implemented proper error handling across the app",
  "Learning about microservices architecture patterns",
  "Accessibility in web development shouldn't be an afterthought",
  "TypeScript is making my code so much more maintainable",
  "Finally got my CI/CD pipeline working smoothly",
  "Web performance metrics are more important than I realized",
  "Building features that users actually want - that's the real challenge",
];

const reactionEmojis = [
  "❤️ Love this!",
  "🔥 Fire!",
  "👏 Great work!",
  "🙌 Awesome!",
  "💯 Perfect!",
  "🚀 Amazing!",
  "👍 Nice!",
  "😄 Made me smile",
  "🎉 Celebrate!",
  "💪 Keep it up!",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get multiple random items from an array
const getRandomArrItems = (arr, num) => {
  const results = [];
  for (let i = 0; i < num; i++) {
    results.push(getRandomArrItem(arr));
  }
  return results;
};

// Gets a random user
const getRandomUser = () => getRandomArrItem(usernames);

// Function to generate random thoughts
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtContent),
    });
  }
  return results;
};

// Function to get random reactions
const getRandomReaction = () => getRandomArrItem(reactionEmojis);

// Export the functions for use in seed.js
module.exports = {
  getRandomUser,
  getRandomThoughts,
  getRandomReaction,
  getRandomArrItem,
  getRandomArrItems,
  usernames,
  thoughtContent,
};
