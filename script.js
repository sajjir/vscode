document.addEventListener('DOMContentLoaded', function () {
    const vscodeContainer = document.querySelector('.vscode-container');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const overlay = document.getElementById('overlay');
    const activityBarIcons = document.querySelectorAll('.activity-bar .action-icon');
    const fileExplorerItems = document.querySelectorAll('.file-explorer .file');
    const folderItems = document.querySelectorAll('.file-explorer .folder');
    const tabsContainer = document.querySelector('.tabs-container');
    const editorContainer = document.querySelector('.editor-container');
    let openFiles = {};

    function setSidebarVisible(visible) {
        vscodeContainer.dataset.sidebarVisible = visible;
        overlay.classList.toggle('active', visible && window.innerWidth <= 768);
    }

    function isSidebarVisible() {
        return vscodeContainer.dataset.sidebarVisible === 'true';
    }

    activityBarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const wasActive = icon.classList.contains('active');
            const targetViewId = icon.dataset.view + '-view';
            activityBarIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
            document.querySelectorAll('.sidebar').forEach(view => {
                view.style.display = view.id === targetViewId ? 'flex' : 'none';
            });
            if (wasActive) {
                setSidebarVisible(!isSidebarVisible());
            } else {
                setSidebarVisible(true);
            }
        });
    });

    hamburgerMenu.addEventListener('click', (e) => { e.stopPropagation(); setSidebarVisible(!isSidebarVisible()); });
    overlay.addEventListener('click', () => setSidebarVisible(false));
    document.querySelector('.file-explorer').addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.target.closest('.file')) {
            setSidebarVisible(false);
        }
    });
    folderItems.forEach(folder => {
        folder.addEventListener('click', (e) => {
            if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') {
                const currentState = folder.dataset.state;
                folder.dataset.state = currentState === 'closed' ? 'open' : 'closed';
            }
        });
    });
    fileExplorerItems.forEach(item => {
        item.addEventListener('click', () => {
            const filename = item.dataset.file;
            openFile(filename);
        });
    });

    // --- NEW & UPDATED FILE CONTENTS ---
    const fileContents = {
        'readme.md': `
# 👋 Hi, I'm Sajjad!

Welcome to my interactive portfolio. This website is a simulation of my favorite coding environment, **VS Code**.

### 🚀 About Me
- A programmer who loves solving complex problems.
- Always learning new technologies.
- To see my skills, open the \`skills.py\` file!
- To learn more about me, check out \`aboutme.md\`.
`,
        'aboutme.md': `
# About Me

I'm **Sajad Vahidi**, a web developer from Iran who's passionate about leveraging artificial intelligence to enhance my coding capabilities. My expertise spans web development, graphic design, and UI/UX, with a particular focus on creating compelling digital experiences.

## My Expertise
My professional experience centers around web development for e-commerce platforms, digital marketing, and SEO optimization. What truly excites me is the process of brand creation – from conceptualizing a brand's visual identity to bringing its entire ecosystem to life.

There's something incredibly thrilling about taking those first steps in brand development: crafting the initial concept, assembling the right team, and orchestrating different personalities to work toward a shared vision. These early stages of brand building genuinely energize me.

## Background & Philosophy
I hold a software engineering degree, though I'll be honest – traditional educational systems never quite worked for me. I was more of a rebel in school and university, preferring to learn outside conventional academic frameworks.

Today, I dedicate most of my time to **WATANAI.COM**, where I serve as CEO and Co-founder. At Watanai AI, I wear multiple hats: I'm the Social Content Manager, Product Owner, and head of R&D. For the past two years, AI and I have been inseparable – you could say AI has transformed my previously monochrome world into something far more vibrant and engaging.

## Interests & Future Plans
I'm deeply passionate about podcasting and have considered launching a podcast outside the tech sphere – perhaps focusing on health, nutrition, or veganism. However, with AI still in its pre-AGI phase, I believe now isn't the right time to start that venture.

Like most tech enthusiasts since 2021, my focus has been laser-sharp on AI-related topics – and that passion continues to drive everything I do.
`,
        'skills.py': `
class SajjadSkills:
    def __init__(self):
        self.languages = ["Python", "JavaScript", "HTML", "CSS"]
        self.frameworks = {
            "backend": ["Flask", "Django", "FastAPI"],
            "frontend": ["React", "Vue.js"]
        }
        self.expertise = ["Web Development", "Graphic Design", "UI/UX", "SEO", "Branding"]
        self.tools = ["Git", "Docker", "VS Code", "Linux", "Figma"]

    def show_skills(self):
        print("--- My Technical & Creative Skills ---")
        for skill_type, skills in self.__dict__.items():
            print(f"\\n# {skill_type.capitalize()}")
            if isinstance(skills, list):
                for skill in skills: print(f"- {skill}")
            elif isinstance(skills, dict):
                 for category, items in skills.items():
                    print(f"  ## {category.capitalize()}")
                    for item in items: print(f"  - {item}")

me = SajjadSkills()
me.show_skills()
`,
        'cool-project.json': `
{
  "projectName": "VS Code Portfolio",
  "description": "A creative personal website designed with inspiration from the VS Code environment to showcase skills and projects in an engaging way.",
  "technologies": ["HTML", "CSS", "JavaScript", "Python", "Flask"],
  "status": "In Development",
  "github_link": "https://github.com/your-username/your-repo"
}
`,
        'contact.html': `
<div class="contact-container">
    <div class="social-links">
        <h2>Get in Touch</h2>
        <p>You can reach out to me via email or connect with me on social media.</p>
        <ul>
            <li><a href="mailto:HI@SAJJ.IR" target="_blank"><i class="fas fa-envelope"></i> Email</a></li>
            <li><a href="https://x.com/sajj_ir" target="_blank"><i class="fab fa-twitter"></i> X (Twitter)</a></li>
            <li><a href="https://t.me/SAJJ_IR" target="_blank"><i class="fab fa-telegram-plane"></i> Telegram</a></li>
        </ul>
    </div>
    <div class="contact-form">
        <h2>Or Send a Message</h2>
        <p>Fill out the form below for collaborations, questions, or just to say hi!</p>
        <form id="contactForm">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Your Message:</label>
            <textarea id="message" name="message" rows="6" required></textarea>
            <button type="submit">Send Message</button>
        </form>
        <div id="form-response"></div>
    </div>
</div>
`,
        'settings.json': `
{
    "workbench.colorTheme": "Default Dark+",
    "editor.fontFamily": "'Fira Code', 'Consolas', 'Courier New', monospace",
    "editor.fontSize": 14,
    "social": {
        "email": "HI@SAJJ.IR",
        "x_twitter": "https://x.com/sajj_ir",
        "telegram": "https://t.me/SAJJ_IR",
        "github": "https://github.com/your-username"
    },
    "portfolio.greeting": "Thanks for visiting my portfolio!"
}
`,
        'watanai.md': `
# Project: WATANAI.COM

**WATANAI** is my primary focus and a venture I co-founded. It stands at the intersection of technology and artificial intelligence, aiming to [briefly describe what Watanai does, e.g., "build innovative AI-powered solutions for businesses"].

## My Role: CEO & Co-founder

As the CEO and Co-founder, my responsibilities are diverse and cover multiple domains:

-   **Product Owner:** I guide the product vision, define feature roadmaps, and ensure that what we build aligns with our strategic goals and user needs.
-   **Head of R&D:** I lead our research and development efforts, exploring new AI models and technologies to keep our products at the cutting edge.
-   **Social Content Manager:** I oversee our brand's voice and content strategy across various social platforms, engaging with our community and communicating our vision.

Working on Watanai has been an incredible journey, allowing me to merge my passions for web development, branding, and artificial intelligence into a single, cohesive mission.
`
    };

    // --- Core Functions (no changes needed below this line) ---
    function openFile(filename) {
        if (!openFiles[filename]) {
            createTab(filename);
            createEditorContent(filename);
        }
        setActiveFile(filename);
    }

    function createTab(filename) {
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.dataset.file = filename;
        const fileIcon = document.querySelector(`.file[data-file="${filename}"] i`).cloneNode(true);
        const closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-times close-tab';
        tab.appendChild(fileIcon);
        tab.append(` ${filename} `);
        tab.appendChild(closeIcon);
        tabsContainer.appendChild(tab);
        tab.addEventListener('click', () => setActiveFile(filename));
        closeIcon.addEventListener('click', (e) => { e.stopPropagation(); closeFile(filename); });
    }

    function createEditorContent(filename) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'editor-content';
        contentDiv.dataset.file = filename;
        contentDiv.innerHTML = `<pre>${fileContents[filename] || ''}</pre>`;
        editorContainer.appendChild(contentDiv);
        openFiles[filename] = { tab: null, content: contentDiv };
        if (filename === 'contact.html') {
            const form = contentDiv.querySelector('#contactForm');
            if(form) form.addEventListener('submit', handleFormSubmit);
        }
    }

    function setActiveFile(filename) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.editor-content').forEach(c => c.classList.remove('active'));
        const activeTab = document.querySelector(`.tab[data-file="${filename}"]`);
        const activeContent = document.querySelector(`.editor-content[data-file="${filename}"]`);
        if(activeTab) activeTab.classList.add('active');
        if(activeContent) activeContent.classList.add('active');
    }

    function closeFile(filename) {
        const tab = document.querySelector(`.tab[data-file="${filename}"]`);
        const content = document.querySelector(`.editor-content[data-file="${filename}"]`);
        if (tab) tab.remove();
        if (content) content.remove();
        delete openFiles[filename];
        const remainingTabs = document.querySelectorAll('.tab');
        if (remainingTabs.length > 0) {
            setActiveFile(remainingTabs[remainingTabs.length - 1].dataset.file);
        } else {
            editorContainer.innerHTML = '';
        }
    }
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const responseDiv = document.querySelector('#form-response');
        if(!responseDiv) return;
        responseDiv.textContent = 'Sending message...';
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('http://127.0.0.1:5000/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                responseDiv.style.color = '#34c759';
                responseDiv.textContent = result.message;
                form.reset();
            } else {
                throw new Error(result.message || 'An error occurred.');
            }
        } catch (error) {
            responseDiv.style.color = '#ff3b30';
            responseDiv.textContent = `Error sending message: ${error.message}`;
        }
    }

    const terminal = document.getElementById('terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const closeTerminalBtn = document.getElementById('close-terminal');
    const toggleTerminalBtn = document.getElementById('toggle-terminal');
    const terminalHeader = document.querySelector('.terminal-header');

    if (terminalInput) {
        terminalInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                if (command) {
                    const prompt = terminalBody.querySelector('.terminal-prompt');
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.innerHTML = `<span>user@portfolio:~$</span> ${command}`;
                    terminalBody.insertBefore(newLine, prompt);
                    executeCommand(command);
                    terminalInput.value = '';
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }
        });
    }

    if(closeTerminalBtn) closeTerminalBtn.addEventListener('click', () => terminal.style.display = 'none');
    if(toggleTerminalBtn) toggleTerminalBtn.addEventListener('click', toggleTerminal);
    if(terminalHeader) terminalHeader.addEventListener('click', (e) => {
        if(e.target === terminalHeader || e.target.tagName === 'SPAN') {
            toggleTerminal();
        }
    });

    function toggleTerminal() {
        terminal.classList.toggle('hidden');
        const icon = toggleTerminalBtn.classList;
        icon.toggle('fa-chevron-up');
        icon.toggle('fa-chevron-down');
    }

    function executeCommand(command) {
        let output = '';
        const commands = {
            'help': `Available commands:\n- whoami\n- skills\n- contact\n- clear`,
            'whoami': 'Sajjad - A passionate developer...',
            'skills': `Languages: Python, JavaScript, HTML, CSS\nFrameworks: Flask, Django, React, Vue.js\nTools: Git, Docker, VS Code, Linux`,
            'contact': `Email: your_email@gmail.com\nLinkedIn: linkedin.com/in/your-profile`,
            'clear': ''
        };
        const commandKey = command.toLowerCase();
        if (commandKey in commands) {
            output = commands[commandKey];
            if (commandKey === 'clear') {
                const prompt = terminalBody.querySelector('.terminal-prompt');
                terminalBody.innerHTML = '';
                terminalBody.appendChild(prompt);
                document.getElementById('terminal-input').focus();
                return;
            }
        } else {
            output = `bash: command not found: ${command}`;
        }
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line';
        outputLine.textContent = output;
        terminalBody.insertBefore(outputLine, terminalBody.querySelector('.terminal-prompt'));
    }

    openFile('readme.md');
});