document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('#explorer-view');
    const overlay = document.getElementById('overlay');
    const allSidebars = document.querySelectorAll('.sidebar');

    // --- Mobile Menu Logic ---
    hamburgerMenu.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling up
        const explorerSidebar = document.getElementById('explorer-view');
        const isOpen = explorerSidebar.classList.contains('open');

        // Close all sidebars first
        allSidebars.forEach(s => s.classList.remove('open'));

        // If it was closed, open the explorer one
        if (!isOpen) {
            explorerSidebar.classList.add('open');
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    });

    // Close sidebar when clicking the overlay or a file
    function closeMobileMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    overlay.addEventListener('click', closeMobileMenu);

    document.querySelector('.file-explorer').addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.target.closest('.file')) {
            closeMobileMenu();
        }
    });


    // --- Original Logic from before ---
    const fileExplorerItems = document.querySelectorAll('.file-explorer .file');
    const folderItems = document.querySelectorAll('.file-explorer .folder');
    const activityBarIcons = document.querySelectorAll('.activity-bar .action-icon');
    
    const tabsContainer = document.querySelector('.tabs-container');
    const editorContainer = document.querySelector('.editor-container');
    let openFiles = {};

    const fileContents = {
        'readme.md': `
# 👋 Hi, I'm Sajjad!

Welcome to my interactive portfolio. This website is a simulation of my favorite coding environment, **VS Code**.

### 🚀 About Me
- A programmer who loves solving complex problems.
- Always learning new technologies.
- To see my skills, open the \`skills.py\` file!

### 🎮 Hobbies
- Strategic video games
- Reading sci-fi books
- Exploring GitHub for interesting projects
`,
        'aboutme.md': `
## A More Detailed Bio

I am a software developer with experience in... My main passion is building efficient and creative tools that make life easier for people.
This project is one of my portfolio pieces to showcase a combination of my front-end and back-end skills.
`,
        'skills.py': `
class SajjadSkills:
    def __init__(self):
        self.languages = ["Python", "JavaScript", "HTML", "CSS"]
        self.frameworks = {
            "backend": ["Flask", "Django", "FastAPI"],
            "frontend": ["React", "Vue.js"]
        }
        self.tools = ["Git", "Docker", "VS Code", "Linux"]

    def show_skills(self):
        print("--- My Technical Skills ---")
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
<div class="contact-form">
    <h2><i class="fas fa-paper-plane"></i> Contact Me</h2>
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
`
    };

    activityBarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // On mobile, clicking activity icons should close the sidebar
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
            activityBarIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
            
            const viewId = icon.dataset.view + '-view';
            document.querySelectorAll('.sidebar').forEach(view => {
                view.style.display = view.id === viewId ? 'flex' : 'none';
            });
        });
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

    // --- Terminal Logic ---
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

    // Open README.md by default
    openFile('readme.md');
});