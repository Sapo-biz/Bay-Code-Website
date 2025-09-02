// User Authentication and Guild Management System

class BayCodeAuth {
    constructor() {
        this.users = [];
        this.guilds = {};
        this.currentUser = null;
        this.chatMessages = [];
        this.apiBaseUrl = 'http://localhost:5000/api';
        this.token = localStorage.getItem('authToken');
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

    // Register new user using backend API
    async register(username, email, password, fullName, school, bayArea) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    fullName,
                    school,
                    bayArea
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('authToken', this.token);
                
                // Also save to local storage for backward compatibility
                const newUser = {
                    username,
                    email,
                    fullName,
                    school,
                    bayArea,
                    guild: data.user.guild,
                    respectPoints: data.user.respectPoints || 0,
                    solvedProblems: []
                };
                this.users.push(newUser);
                this.saveData();
                
                return { success: true, message: 'Registration successful!', user: newUser };
            } else {
                return { success: false, message: data.error || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Login using backend API
    async login(username, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('authToken', this.token);
                
                // Find user in local storage or create if doesn't exist
                let localUser = this.users.find(u => u.username === username);
                if (!localUser) {
                    localUser = {
                        username: data.user.username,
                        email: data.user.email,
                        guild: data.user.guild,
                        respectPoints: data.user.respectPoints || 0,
                        solvedProblems: data.user.solvedProblems || []
                    };
                    this.users.push(localUser);
                    this.saveData();
                }
                
                return { success: true, message: 'Login successful!', user: localUser };
            } else {
                return { success: false, message: data.error || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Logout
    logout() {
        this.currentUser = null;
        this.token = null;
        localStorage.removeItem('authToken');
        return { success: true, message: 'Logged out successfully!' };
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.token !== null && this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get auth token for API calls
    getAuthToken() {
        return this.token;
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