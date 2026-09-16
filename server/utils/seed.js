// Seeds
const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  usernames,
  thoughtContent,
  getRandomReaction,
  getRandomArrItem,
  getRandomArrItems,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  console.log("💾 Creating users...");

  // Create users
  const users = [];

  for (let i = 0; i < usernames.length; i++) {
    const user = {
      username: usernames[i],
      email: `${usernames[i].toLowerCase()}@techmail.com`,
      password: "password123", // In real app, would be hashed before
    };
    users.push(user);
  }

  // Insert users into database
  const userData = await User.insertMany(users);
  console.log(`✅ Created ${userData.length} users`);

  console.log("💭 Creating thoughts...");

  // Create thoughts
  const thoughtsToCreate = [];

  // Create 60-80 thoughts distributed among users
  const numberOfThoughts = 70;
  for (let i = 0; i < numberOfThoughts; i++) {
    const randomAuthor = getRandomArrItem(userData);
    const randomThought = getRandomArrItem(thoughtContent);

    // Add 0-5 random reactions to each thought
    const numReactions = Math.floor(Math.random() * 5);
    const reactions = [];

    for (let j = 0; j < numReactions; j++) {
      const randomReactor = getRandomArrItem(userData);
      reactions.push({
        reactionBody: getRandomReaction(),
        username: randomReactor.username,
      });
    }

    thoughtsToCreate.push({
      thoughtText: randomThought,
      username: randomAuthor.username,
      reactions: reactions,
      // Vary the timestamps to make it look more realistic
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
    });
  }

  // Insert thoughts
  const thoughtData = await Thought.insertMany(thoughtsToCreate);
  console.log(`✅ Created ${thoughtData.length} thoughts with reactions`);

  console.log("🔗 Setting up follower relationships...");

  // Create follower/following relationships
  // Each user follows 3-8 random other users
  for (let user of userData) {
    const numberOfFollows = Math.floor(Math.random() * 6) + 3; // 3-8 follows
    const usersToFollow = getRandomArrItems(
      userData.filter((u) => u._id.toString() !== user._id.toString()),
      numberOfFollows,
    );

    user.following = usersToFollow.map((u) => u._id);

    // Add this user to their followers' followers list
    for (let followedUser of usersToFollow) {
      if (!followedUser.followers.includes(user._id)) {
        followedUser.followers.push(user._id);
      }
    }
  }

  // Save all users with their relationships
  await Promise.all(userData.map((user) => user.save()));
  console.log("✅ Set up follower relationships");

  console.log("🔌 Linking thoughts to users...");

  // Link thoughts to their authors
  const userThoughtsMap = new Map();

  for (let thought of thoughtData) {
    const author = userData.find((u) => u.username === thought.username);
    if (author) {
      author.thoughts.push(thought._id);
    }
  }

  // Save users with their thoughts
  await Promise.all(userData.map((user) => user.save()));
  console.log("✅ Linked thoughts to users");

  // Log statistics
  console.log("\n📊 Seed Data Summary:");
  console.log(`   • Users created: ${userData.length}`);
  console.log(`   • Thoughts created: ${thoughtData.length}`);
  console.log(
    `   • Total reactions: ${thoughtData.reduce((sum, t) => sum + t.reactions.length, 0)}`,
  );
  console.log(
    `   • Average thoughts per user: ${(thoughtData.length / userData.length).toFixed(1)}`,
  );

  console.table(
    userData.map((u) => ({
      username: u.username,
      email: u.email,
      thoughts: u.thoughts.length,
      followers: u.followers.length,
      following: u.following.length,
    })),
  );

  console.info("\n✨ Seeding complete! 🌱\n");
  process.exit(0);
});
