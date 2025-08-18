# Bay Code Website

A modern, responsive website for Bay Code - a student-founded and student-led organization that empowers the next generation of coders through inclusive, logic-focused programming events.

## 🌟 Features

### Core Sections
- **Hero Section**: Eye-catching introduction with animated code display
- **Mission Statement**: Clear articulation of Bay Code's purpose and values
- **Monthly Hackathons**: Three brackets (Java, Python, Pseudocode) with $5 entry fee
- **Free Workshops**: Intro to Python, Java, and Machine Learning 101
- **Guild Rankings**: Interactive guild system with respect ranks and competition
- **Practice Problems**: Curated LeetCode problems with difficulty filtering
- **Monthly Editorials**: Coding tips, featured problems, student spotlights, and event recaps
- **Join Section**: Multiple ways to get involved with the organization

### Technical Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Sign-up System**: Collects user information and randomly assigns to guilds
- **Practice Problem System**: Direct links to LeetCode problems with progress tracking
- **Guild Rankings Chart**: Visual representation of guild competition
- **Progress Tracking**: Local storage for tracking solved problems
- **External Links**: All clickable elements link to Google (placeholder)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load with all features functional

### File Structure
```
Bay Code/
├── index.html          # Main HTML file
├── signup.html         # Sign-up page with guild assignment
├── practice.html       # Dedicated practice problems page
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and interactions
└── README.md           # This documentation file
```

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: #2563eb (for buttons and highlights)
- **Gradient Backgrounds**: Purple to blue gradients for hero and join sections
- **Neutral Grays**: For text and backgrounds
- **Success Green**: #16a34a (for easy problems and checkmarks)
- **Warning Orange**: #d97706 (for medium problems)
- **Error Red**: #dc2626 (for hard problems)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Animations
- **Fade-in effects**: Elements animate in as they come into view
- **Hover effects**: Cards lift and scale on hover
- **Smooth scrolling**: Navigation links scroll smoothly to sections
- **Code animation**: Hero section code lines animate in sequence

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px+ (full layout with side-by-side content)
- **Tablet**: 768px-1199px (adjusted grid layouts)
- **Mobile**: <768px (single column, hamburger navigation)

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and cards
- Optimized typography and spacing
- Simplified layouts for smaller screens

## 🏆 Guild System

The website includes a comprehensive guild ranking system with automatic assignment:

### Guilds
- **Blue Guild** (1st place) - Strategic thinking and collaboration
- **Red Guild** (2nd place) - Passion and competitive spirit
- **Green Guild** (3rd place) - Growth and sustainable development
- **Yellow Guild** (4th place) - Energy, creativity, and optimism
- **Pink Guild** (5th place) - Collaboration, support, and inclusive growth
- **Magenta Guild** (6th place) - Creativity with technical excellence

### Sign-up Process
1. **User Information Collection**: Full name, email, school, Bay Area residency
2. **Random Guild Assignment**: Users are randomly assigned to one of six guilds
3. **Guild Features**: Each guild has unique benefits and focus areas
4. **Progress Tracking**: User data stored in localStorage

### Features
- **Respect Ranks**: From Respect I to Respect XX
- **Member Counts**: Track guild membership
- **Point System**: Competitive scoring
- **Seasonal Rewards**: Top guild gets special recognition
- **Guild Descriptions**: Each guild has unique characteristics and benefits

## 💻 Practice Problems

The practice section includes 12 curated LeetCode problems with direct links:

### Easy Problems
- Two Sum - https://leetcode.com/problems/two-sum/
- Valid Parentheses - https://leetcode.com/problems/valid-parentheses/
- Merge Two Sorted Lists - https://leetcode.com/problems/merge-two-sorted-lists/
- Palindrome Number - https://leetcode.com/problems/palindrome-number/
- Longest Common Prefix - https://leetcode.com/problems/longest-common-prefix/

### Medium Problems
- Add Two Numbers - https://leetcode.com/problems/add-two-numbers/
- Longest Substring Without Repeating Characters - https://leetcode.com/problems/longest-substring-without-repeating-characters/
- Container With Most Water - https://leetcode.com/problems/container-with-most-water/
- 3Sum - https://leetcode.com/problems/3sum/
- Integer to Roman - https://leetcode.com/problems/integer-to-roman/

### Hard Problems
- Median of Two Sorted Arrays - https://leetcode.com/problems/median-of-two-sorted-arrays/
- Regular Expression Matching - https://leetcode.com/problems/regular-expression-matching/

### Features
- **Direct LeetCode Links**: Each problem links directly to LeetCode
- **Difficulty Filtering**: Filter by Easy, Medium, Hard, or All
- **Search Functionality**: Search problems by title, description, or category
- **Progress Tracking**: Local storage for solved problems
- **Statistics**: Track total problems, solved count, and completion rate
- **Responsive Design**: Works on all devices

## 🎯 Event Information

### Monthly Hackathons
- **Entry Fee**: $5 (with fee waiver option)
- **Frequency**: Monthly events
- **Brackets**: Java, Python, Pseudocode
- **Target Audience**: All skill levels

### Free Workshops
- **Intro to Python**: Perfect for beginners
- **Intro to Java**: Object-oriented programming
- **Machine Learning 101**: Collaboration with Monta Vista's ML Club

## 🔧 Customization

### Adding New Problems
To add new practice problems, edit the `practiceProblems` array in `script.js`:

```javascript
{
    id: 13,
    title: "New Problem",
    difficulty: "easy", // "easy", "medium", or "hard"
    description: "Problem description...",
    acceptance: "45.2%",
    solved: false,
    category: "Array"
}
```

### Modifying Guild Rankings
Update the guild data in `index.html` within the `.guild-ranking` section.

### Changing Colors
Modify the CSS variables in `styles.css` to match your brand colors.

## 🚀 Future Enhancements

### Planned Features
- **User Authentication**: Login/signup system
- **Real-time Updates**: Live guild rankings
- **Problem Submission**: Students can submit solutions
- **Leaderboards**: Individual and team rankings
- **Event Registration**: Online hackathon registration
- **Workshop RSVP**: Sign up for workshops
- **Newsletter**: Email subscription for updates
- **Admin Panel**: Content management system

### Technical Improvements
- **Backend Integration**: Connect to a server for data persistence
- **Database**: Store user progress and guild data
- **Real-time Chat**: Discord integration for guild communication
- **Analytics**: Track website usage and engagement
- **SEO Optimization**: Better search engine visibility

## 📞 Contact Information

- **Email**: info@baycode.org
- **Location**: Bay Area, CA
- **School**: Monta Vista High School

## 📄 License

This project is created for Bay Code organization. All rights reserved.

---

**Built with ❤️ for the next generation of coders** 