// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Practice Problems Data
const practiceProblems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        acceptance: "48.2%",
        solved: false,
        category: "Array"
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "medium",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.",
        acceptance: "35.8%",
        solved: false,
        category: "Linked List"
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "medium",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        acceptance: "33.1%",
        solved: false,
        category: "String"
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "hard",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        acceptance: "32.4%",
        solved: false,
        category: "Array"
    },
    {
        id: 5,
        title: "Valid Parentheses",
        difficulty: "easy",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        acceptance: "40.2%",
        solved: false,
        category: "Stack"
    },
    {
        id: 6,
        title: "Merge Two Sorted Lists",
        difficulty: "easy",
        description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
        acceptance: "54.7%",
        solved: false,
        category: "Linked List"
    },
    {
        id: 7,
        title: "Container With Most Water",
        difficulty: "medium",
        description: "Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container.",
        acceptance: "52.3%",
        solved: false,
        category: "Array"
    },
    {
        id: 8,
        title: "3Sum",
        difficulty: "medium",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        acceptance: "28.9%",
        solved: false,
        category: "Array"
    },
    {
        id: 9,
        title: "Regular Expression Matching",
        difficulty: "hard",
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
        acceptance: "27.1%",
        solved: false,
        category: "Dynamic Programming"
    },
    {
        id: 10,
        title: "Palindrome Number",
        difficulty: "easy",
        description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
        acceptance: "51.2%",
        solved: false,
        category: "Math"
    },
    {
        id: 11,
        title: "Integer to Roman",
        difficulty: "medium",
        description: "Given an integer, convert it to a roman numeral.",
        acceptance: "58.4%",
        solved: false,
        category: "String"
    },
    {
        id: 12,
        title: "Longest Common Prefix",
        difficulty: "easy",
        description: "Write a function to find the longest common prefix string amongst an array of strings.",
        acceptance: "39.8%",
        solved: false,
        category: "String"
    }
];

// Load practice problems
function loadProblems(difficulty = 'all') {
    const problemsGrid = document.getElementById('problemsGrid');
    problemsGrid.innerHTML = '<div class="loading">Loading problems...</div>';

    setTimeout(() => {
        const filteredProblems = difficulty === 'all' 
            ? practiceProblems 
            : practiceProblems.filter(problem => problem.difficulty === difficulty);

        problemsGrid.innerHTML = filteredProblems.map(problem => `
            <div class="problem-card ${problem.difficulty}">
                <div class="problem-header">
                    <h3 class="problem-title">${problem.title}</h3>
                    <span class="problem-difficulty">${problem.difficulty}</span>
                </div>
                <p class="problem-description">${problem.description}</p>
                <div class="problem-stats">
                    <span><i class="fas fa-chart-line"></i> ${problem.acceptance} acceptance</span>
                    <span><i class="fas fa-tag"></i> ${problem.category}</span>
                    <span><i class="fas fa-check-circle"></i> ${problem.solved ? 'Solved' : 'Not solved'}</span>
                </div>
                <button class="solve-btn" onclick="solveProblem(${problem.id})">
                    ${problem.solved ? 'View Solution' : 'Solve Problem'}
                </button>
            </div>
        `).join('');
    }, 500);
}

// Filter problems by difficulty
function filterProblems(difficulty) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load filtered problems
    loadProblems(difficulty);
}

// Solve problem function
function solveProblem(problemId) {
    const problem = practiceProblems.find(p => p.id === problemId);
    if (problem) {
        problem.solved = true;
        // Link to Google for now
        window.open('https://google.com', '_blank');
    }
}

// Initialize problems on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProblems();
    
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterProblems(e.target.dataset.difficulty);
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .workshop-card, .guild-card, .problem-card, .editorial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Guild rankings animation
function animateGuildRankings() {
    const guildCards = document.querySelectorAll('.guild-card');
    guildCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, index * 200);
    });
}

// Initialize guild rankings animation
document.addEventListener('DOMContentLoaded', () => {
    const guildCards = document.querySelectorAll('.guild-card');
    guildCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation when guilds section is visible
    const guildsSection = document.querySelector('.guilds');
    if (guildsSection) {
        const guildsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGuildRankings();
                    guildsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        guildsObserver.observe(guildsSection);
    }
});

// Code animation in hero section
function animateCode() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize code animation
document.addEventListener('DOMContentLoaded', () => {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
        line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation after a short delay
    setTimeout(animateCode, 500);
});

// Form handling for join buttons
document.addEventListener('DOMContentLoaded', () => {
    const joinButtons = document.querySelectorAll('.join-card .btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Let the href handle the navigation
            // The signup button will go to signup.html, others to Google
        });
    });
});

// Workshop card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const workshopCards = document.querySelectorAll('.workshop-card');
    workshopCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Event card interactions
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            window.open('https://google.com', '_blank');
        });
    });
});

// Editorial card interactions
document.addEventListener('DOMContentLoaded', () => {
    const editorialCards = document.querySelectorAll('.editorial-card');
    editorialCards.forEach(card => {
        card.addEventListener('click', () => {
            window.open('https://google.com', '_blank');
        });
    });
});

// Guild card interactions
document.addEventListener('DOMContentLoaded', () => {
    const guildCards = document.querySelectorAll('.guild-card');
    guildCards.forEach(card => {
        card.addEventListener('click', () => {
            window.open('https://google.com', '_blank');
        });
    });
});

// Practice problem search functionality (for future implementation)
function searchProblems(query) {
    const filteredProblems = practiceProblems.filter(problem => 
        problem.title.toLowerCase().includes(query.toLowerCase()) ||
        problem.description.toLowerCase().includes(query.toLowerCase()) ||
        problem.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Update the problems grid with filtered results
    const problemsGrid = document.getElementById('problemsGrid');
    // Implementation would go here
}

// Track user progress (for future implementation)
function trackProgress(problemId, solved) {
    // In a real application, this would save to localStorage or a database
    const progress = JSON.parse(localStorage.getItem('bayCodeProgress') || '{}');
    progress[problemId] = solved;
    localStorage.setItem('bayCodeProgress', JSON.stringify(progress));
}

// Load user progress (for future implementation)
function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('bayCodeProgress') || '{}');
    practiceProblems.forEach(problem => {
        if (progress[problem.id]) {
            problem.solved = progress[problem.id];
        }
    });
}

// Initialize progress tracking
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
}); 