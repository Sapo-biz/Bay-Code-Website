// User Authentication and Guild Management System

class BayCodeAuth {
    constructor() {
        this.users = [];
        this.guilds = {};
        this.currentUser = null;
        this.chatMessages = [];
        this.loadData();
    }

    // Load data from JSON file
    loadData() {
        try {
            const data = localStorage.getItem('bayCodeData');
            if (data) {
                const parsed = JSON.parse(data);
                this.users = parsed.users || [];
                this.guilds = parsed.guilds || {};
                this.chatMessages = parsed.chatMessages || [];
            } else {
                // Initialize with default guild structure if no data exists
                this.guilds = {
                    "Blue Guild": {
                        "members": [],
                        "respectRank": "Respect I",
                        "points": 0,
                        "respectPoints": 0
                    },
                    "Red Guild": {
                        "members": [],
                        "respectRank": "Respect I", 
                        "points": 0,
                        "respectPoints": 0
                    },
                    "Green Guild": {
                        "members": [],
                        "respectRank": "Respect I",
                        "points": 0,
                        "respectPoints": 0
                    },
                    "Yellow Guild": {
                        "members": [],
                        "respectRank": "Respect I",
                        "points": 0,
                        "respectPoints": 0
                    },
                    "Pink Guild": {
                        "members": [],
                        "respectRank": "Respect I",
                        "points": 0,
                        "respectPoints": 0
                    },
                    "Magenta Guild": {
                        "members": [],
                        "respectRank": "Respect I",
                        "points": 0,
                        "respectPoints": 0
                    }
                };
                this.saveData();
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Save data to localStorage (simulating file storage)
    saveData() {
        try {
            const data = {
                users: this.users,
                guilds: this.guilds,
                chatMessages: this.chatMessages
            };
            localStorage.setItem('bayCodeData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Register new user
    register(username, email, password, fullName, school, bayArea) {
        // Check if username already exists
        if (this.users.find(user => user.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        // Check if email already exists
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Validate password strength
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Hash password (simple hash for demo)
        const hashedPassword = this.hashPassword(password);

        // Randomly assign to guild
        const guildNames = Object.keys(this.guilds);
        const randomGuild = guildNames[Math.floor(Math.random() * guildNames.length)];

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword,
            fullName,
            school,
            bayArea,
            guild: randomGuild,
            joinDate: new Date().toISOString(),
            solvedProblems: [],
            respectRank: "Respect I",
            points: 0,
            respectPoints: 0
        };

        // Add user to users array
        this.users.push(newUser);

        // Add user to guild
        if (!this.guilds[randomGuild].members) {
            this.guilds[randomGuild].members = [];
        }
        this.guilds[randomGuild].members.push(newUser.id);

        // Save data
        this.saveData();

        return { 
            success: true, 
            message: 'Registration successful!',
            user: newUser,
            guild: this.guilds[randomGuild]
        };
    }

    // Login user
    login(username, password) {
        const user = this.users.find(u => u.username === username);
        if (!user) {
            return { success: false, message: 'Username not found' };
        }

        const hashedPassword = this.hashPassword(password);
        if (user.password !== hashedPassword) {
            return { success: false, message: 'Incorrect password' };
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));

        return { 
            success: true, 
            message: 'Login successful!',
            user: user,
            guild: this.guilds[user.guild]
        };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    // Get current user
    getCurrentUser() {
        if (!this.currentUser) {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Simple password hashing (for demo purposes)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // Generate password reset token
    async generateResetToken(email) {
        const user = this.users.find(u => u.email === email);
        if (!user) {
            return { success: false, message: 'Email not found' };
        }

        // Generate simple token (in real app, use crypto)
        const token = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
        
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        this.saveData();

        // Send email using email service
        try {
            const emailResult = await emailService.sendPasswordResetEmail(email, token);
            return { success: true, message: 'Password reset link sent to your email' };
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, message: 'Failed to send email. Please try again.' };
        }
    }

    // Reset password with token
    resetPassword(token, newPassword) {
        const user = this.users.find(u => u.resetToken === token);
        if (!user) {
            return { success: false, message: 'Invalid reset token' };
        }

        if (new Date() > new Date(user.resetTokenExpiry)) {
            return { success: false, message: 'Reset token has expired' };
        }

        user.password = this.hashPassword(newPassword);
        delete user.resetToken;
        delete user.resetTokenExpiry;
        this.saveData();

        return { success: true, message: 'Password reset successful' };
    }

    // Get guild statistics with respect points
    getGuildStats() {
        const stats = {};
        Object.keys(this.guilds).forEach(guildName => {
            const guild = this.guilds[guildName];
            const memberCount = guild.members ? guild.members.length : 0;
            
            // Calculate total respect points from all members
            let totalRespectPoints = 0;
            if (guild.members) {
                guild.members.forEach(memberId => {
                    const member = this.users.find(u => u.id === memberId);
                    if (member) {
                        totalRespectPoints += member.respectPoints || 0;
                    }
                });
            }
            
            stats[guildName] = {
                memberCount: memberCount,
                respectRank: this.calculateRespectRank(totalRespectPoints),
                points: guild.points,
                respectPoints: totalRespectPoints
            };
        });
        return stats;
    }

    // Calculate respect rank based on points
    calculateRespectRank(points) {
        const ranks = [
            "Respect I", "Respect II", "Respect III", "Respect IV", "Respect V",
            "Respect VI", "Respect VII", "Respect VIII", "Respect IX", "Respect X",
            "Respect XI", "Respect XII", "Respect XIII", "Respect XIV", "Respect XV",
            "Respect XVI", "Respect XVII", "Respect XVIII", "Respect XIX", "Respect XX"
        ];
        
        const rankIndex = Math.min(Math.floor(points / 10), ranks.length - 1);
        return ranks[rankIndex];
    }

    // Update user's solved problems and respect points
    updateSolvedProblems(problemId, respectPoints = 1) {
        if (!this.currentUser) return false;
        
        if (!this.currentUser.solvedProblems.includes(problemId)) {
            this.currentUser.solvedProblems.push(problemId);
            this.currentUser.points += 10; // Award points for solving problems
            this.currentUser.respectPoints += respectPoints; // Award respect points
            
            // Update respect rank
            this.currentUser.respectRank = this.calculateRespectRank(this.currentUser.respectPoints);
            
            // Update in users array
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = this.currentUser;
            }
            
            // Update guild respect points
            this.updateGuildRespectPoints();
            
            this.saveData();
            return true;
        }
        return false;
    }

    // Update guild respect points
    updateGuildRespectPoints() {
        if (!this.currentUser) return;
        
        const guild = this.guilds[this.currentUser.guild];
        if (guild) {
            let totalRespectPoints = 0;
            if (guild.members) {
                guild.members.forEach(memberId => {
                    const member = this.users.find(u => u.id === memberId);
                    if (member) {
                        totalRespectPoints += member.respectPoints || 0;
                    }
                });
            }
            guild.respectPoints = totalRespectPoints;
            guild.respectRank = this.calculateRespectRank(totalRespectPoints);
        }
    }

    // Add chat message
    addChatMessage(username, message) {
        const newMessage = {
            id: Date.now().toString(),
            username: username,
            message: message,
            timestamp: new Date().toISOString(),
            guild: this.currentUser ? this.currentUser.guild : 'Unknown'
        };
        
        this.chatMessages.push(newMessage);
        
        // Keep only last 100 messages
        if (this.chatMessages.length > 100) {
            this.chatMessages = this.chatMessages.slice(-100);
        }
        
        this.saveData();
        return newMessage;
    }

    // Get chat messages for a specific guild
    getChatMessages(guildName = null) {
        if (!guildName && this.currentUser) {
            guildName = this.currentUser.guild;
        }
        
        if (guildName) {
            return this.chatMessages.filter(msg => msg.guild === guildName);
        }
        
        return this.chatMessages;
    }

    // Get user's guild dashboard data
    getUserGuildDashboard() {
        if (!this.currentUser) return null;

        const guild = this.guilds[this.currentUser.guild];
        const allGuilds = this.getGuildStats();
        
        return {
            user: this.currentUser,
            guild: guild,
            allGuilds: allGuilds,
            guildRank: this.getGuildRank(this.currentUser.guild)
        };
    }

    // Get guild rank (position among all guilds)
    getGuildRank(guildName) {
        const stats = this.getGuildStats();
        const sortedGuilds = Object.entries(stats)
            .sort(([,a], [,b]) => b.respectPoints - a.respectPoints);
        
        const rank = sortedGuilds.findIndex(([name]) => name === guildName) + 1;
        return rank;
    }

    // Get individual leaderboard
    getIndividualLeaderboard() {
        return this.users
            .sort((a, b) => (b.respectPoints || 0) - (a.respectPoints || 0))
            .slice(0, 20);
    }

    // Get problem solving leaderboard
    getProblemSolvingLeaderboard() {
        return this.users
            .sort((a, b) => (b.solvedProblems.length || 0) - (a.solvedProblems.length || 0))
            .slice(0, 20);
    }
}

// Initialize global auth instance
const bayCodeAuth = new BayCodeAuth(); 