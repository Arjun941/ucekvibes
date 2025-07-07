export type Option = {
  text: string;
};

export type Question = {
  question: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    question:
      'You walk into your first programming lab. Notepad blinks. DOSBox is open. No one flinches. Your first thought is...',
    options: [
      { text: '“This feels prehistoric.”' },
      { text: '“Will it even compile?”' },
      { text: '“I’ll just quietly use my laptop.”' },
      { text: '“Notepad? Bold of them to assume I need an IDE.”' },
    ],
  },
  {
    question:
      'It’s been four months since your exam. Everyone else has results. You still refresh the portal daily. You tell yourself...',
    options: [
      { text: '“This is frustrating.”' },
      { text: '“Maybe the servers are slow?”' },
      { text: '“It is what it is.”' },
      { text: '“Results arrive when the universe is ready.”' },
    ],
  },
  {
    question:
      'Someone casually mentions that your college fest almost featured a major celebrity performance. You think...',
    options: [
      { text: '“Sounds too dramatic for a college.”' },
      { text: '“I think I read about that.”' },
      { text: '“Respect to whoever tried pulling that off.”' },
      { text: '“This is exactly the kind of chaos I want in life.”' },
    ],
  },
  {
    question:
      'A message pops up: “Class moved from AB2 to Seminar Hall. Or maybe Block C. Also postponed by an hour.” Your move is...',
    options: [
      { text: '“Why is this so confusing?”' },
      { text: '“I’ll wait for someone to confirm.”' },
      { text: '“Just follow the crowd, bro.”' },
      { text: '“This is how legends are made.”' },
    ],
  },
  {
    question: 'Describe your ideal canteen experience.',
    options: [
      { text: '“I’ll take nothing less than gourmet.”' },
      { text: '“Just decent food and hygiene.”' },
      { text: '“Affordable, filling, and familiar tastes.”' },
      {
        text: '“Thattu dosa, meals, fish fry, sambar, chammanthi. Ah, anthass 🔥”',
      },
    ],
  },
  {
    question:
      'It’s 10 PM. A club event is happening. There’s chai, a PowerPoint, and six people debugging code on the floor. You would...',
    options: [
      { text: '“...avoid it. Why is this happening at night?”' },
      { text: '“...think it is kinda cool, I guess.”' },
      { text: '“...might swing by after dinner.”' },
      { text: '“...be running that event. And I would tell people to come through.”' },
    ],
  },
  {
    question:
      'You’re invited to join student clubs: tech, arts, dance, memes. Your reaction is to...',
    options: [
      { text: '“...say that I am not really into all that.”' },
      { text: '“...say maybe I’ll check one out.”' },
      { text: '“...think it sounds fun, I’ll sign up.”' },
      { text: '“...join five of them and organize three.”' },
    ],
  },
  {
    question:
      'How do you feel about a well-planned mass bunk — the group chat votes, the majority vanishes, and campus feels extra quiet?',
    options: [
      { text: '“Feels irresponsible, honestly.”' },
      { text: '“I’ll join if there\'s a good reason.”' },
      { text: '“One of the few things we always agree on.”' },
      { text: '“If the vibe says bunk, who am I to resist?”' },
    ],
  },
  {
    question:
      'Your project presentation day. The projector doesn’t work. Half the class is missing. You...',
    options: [
      { text: '“...would say we can’t do this.”' },
      { text: '“...would try to find a workaround.”' },
      { text: '“...would ask if I can mirror it from my phone?”' },
      { text: '“...would think this is exactly how it\'s supposed to go.”' },
    ],
  },
  {
    question:
      'A club meeting starts 30 minutes late. Everyone just shrugs and continues like it’s normal. What do you think?',
    options: [
      { text: '“I don’t like this disorganization.”' },
      { text: '“Okay… I’ll adjust.”' },
      { text: '“This is engineered flexibility.”' },
      { text: '“This is standard operating procedure.”' },
    ],
  },
  {
    question: 'You hear someone say “Campus placements are kinda rare here.” Your reaction:',
    options: [
      { text: '“That’s a red flag.”' },
      { text: '“Guess I’ll look off-campus too.”' },
      { text: '“Technopark’s nearby, right?”' },
      { text: '“Placements are optional. Hustle isn’t.”' },
    ],
  },
  {
    question:
      'Your internals are next week. But there’s a workshop AND a hackathon happening. You...',
    options: [
      { text: '“...will study. Always.”' },
      { text: '“...will attend the workshop, study later.”' },
      { text: '“...will do the hackathon by day, and read notes by night.”' },
      { text: '“...will figure out internals when I get to it.”' },
    ],
  },
  {
    question:
      'You pass a wall plastered with posters: “Hackathon this Friday”, “Design Sprint”, “Band Auditions”, “Flea Market.” You feel...',
    options: [
      { text: '“...like it is too much going on.”' },
      { text: '“...like I might attend one.”' },
      { text: '“...that this is kinda cool.”' },
      { text: '“...like I want to volunteer for half of them.”' },
    ],
  },
  {
    question:
      'You have your exam at H7. You have no idea where that is. What would you do?',
    options: [
      { text: '“I give up. Let them mark me absent.”' },
      { text: '“Ask a senior who looks mildly confident.”' },
      {
        text: '“Rely on my feelings and wander all around the block.”',
      },
      { text: '“Do a 3D scan of the entire building with my Jarvis.”' },
    ],
  },
  {
    question:
      'You check your attendance. It’s at 42%. The minimum required is 75%. You think...',
    options: [
      { text: '“Panic mode.”' },
      { text: '“I’ll figure it out.”' },
      { text: '“That’s fine. Probably.”' },
      { text: '“42% is symbolic. Trust the system.”' },
    ],
  },
  {
    question:
      'It’s the night before internals. Everyone’s sharing PDFs, voice notes, and memes in the class group. You feel...',
    options: [
      { text: '“...that this is not how exams should work.”' },
      { text: '“...that we should just get through it.”' },
      { text: '“...that the actual syllabus begins now.”' },
      {
        text: '“...proud that I’ve contributed 3 Drive folders and 12 memes.”',
      },
    ],
  },
  {
    question:
      'A friend says, “Bro... baa namk oru startup thonam.” You nod. The vibe is serious, but you’re currently eating porotta. You reply...',
    options: [
      { text: '“Bro we can’t even get projectors to work.”' },
      { text: '“Let’s talk after internals.”' },
      { text: '“I have an idea. But no name yet.”' },
      { text: '“I\'ve already made the logo. Let\'s launch.”' },
    ],
  },
  {
    question:
      'Everyone’s chilling. You feel restless. You want to build something, create something, do *something.* What’s your move?',
    options: [
      { text: '“I’ll wait for someone else to start.”' },
      { text: '“Maybe next week, once things settle.”' },
      {
        text: '“I’ll put out a story and see who’s interested.”',
      },
      { text: '“I already bought the domain name. Let’s go.”' },
    ],
  },
  {
    question:
      'You walk past a courtyard full of students — coding, dancing, sketching, jamming, all at once. You feel...',
    options: [
      { text: '“...chaotic.”' },
      { text: '“...like there is a different energy here.”' },
      {
        text: '“...like it’s a college version of a startup fair.”',
      },
      { text: '“...like this is home. I see my people.”' },
    ],
  },
  {
    question:
      'You wake up. No result update. No class schedule. Birds are chirping. The chai is warm. Your thought is...',
    options: [
      { text: '“This college is so unpredictable.”' },
      { text: '“Should I be worried?”' },
      { text: '“Another normal day.”' },
      { text: '“This is the life.”' },
    ],
  },
];
