console.log("Terminal script loaded.");
const input = document.getElementById('input');
const output = document.getElementById('output');

const portfolioData = {
    greetings: 'Hello! I am a chatbot. You can ask me about Anurag Yadav. Type "help" to see what I can answer. Press Ctrl+C to exit.',
    help: 'You can ask me about: about, education, skills, projects, contact.',
    about: `I am a passionate Software Developer and Linux Enthusiast with a deep-seated
interest in building efficient, user-centric applications. With a strong
foundation in Python and C++, I thrive on solving complex algorithmic challenges
and optimizing performance at the system level.`,
    education: `B.Tech CSE (AIML) — VIT Bhopal University (2024–2028)
Schooling — Delhi Public School, Risali, Bhilai`,
    skills: `💻 C++
🐍 Python
☕ Java
🌐 HTML
🐧 Linux
🔧 Git & GitHub
🧠 DSA
🤖 Machine Learning`,
    projects: `📁 Portfolio Website - Personal portfolio built using HTML, CSS & JS.
⚙️ C++ Auto Installer - One-click cross-platform C/C++ compiler installer.
🤖 CatXForest - AI-powered student career recommendation system.
📚 Library Management System - Console-based C++ management system.
🐧 OmarchyMadeEasy - Automation scripts for Arch Linux.
🧑‍💻 GitHub Profile Repo - Personal GitHub profile repository.`,
    contact: `📧 Email: anuragyadav47844@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/anurag-yadav-aa7127325/
🐙 GitHub: https://github.com/anuragyadav0311
🏆 Codeforces: https://codeforces.com/profile/anuragyadav0311
📘 LeetCode: https://leetcode.com/u/anurag_yadav_0311/`,
};

function getBotResponse(question) {
    const lowerCaseQuestion = question.toLowerCase();
    if (lowerCaseQuestion.includes('hello') || lowerCaseQuestion.includes('hi')) {
        return portfolioData.greetings;
    }
    if (lowerCaseQuestion.includes('help')) {
        return portfolioData.help;
    }
    if (lowerCaseQuestion.includes('about') || lowerCaseQuestion.includes('who are you')) {
        return portfolioData.about;
    }
    if (lowerCaseQuestion.includes('education') || lowerCaseQuestion.includes('school') || lowerCaseQuestion.includes('college')) {
        return portfolioData.education;
    }
    if (lowerCaseQuestion.includes('skill') || lowerCaseQuestion.includes('know')) {
        return portfolioData.skills;
    }
    if (lowerCaseQuestion.includes('project') || lowerCaseQuestion.includes('work')) {
        return portfolioData.projects;
    }
    if (lowerCaseQuestion.includes('contact') || lowerCaseQuestion.includes('email') || lowerCaseQuestion.includes('linkedin')) {
        return portfolioData.contact;
    }
    return "I can only answer questions about Anurag's portfolio. Please ask about 'about', 'education', 'skills', 'projects', or 'contact'.";
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        window.location.href = 'index.html';
    }
});

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const question = input.value.trim();
        input.value = '';
        
        output.innerHTML += `\n> ${question}\n`;
        
        const response = getBotResponse(question);
        output.innerHTML += `${response}\n`;
        
        // Scroll to the bottom
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }
});

output.innerHTML = `Welcome to my terminal portfolio!
I am a chatbot. Ask me about Anurag.
Type "help" to see what I can answer.
Press Ctrl+C to exit.
`;
