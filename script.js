document.addEventListener('DOMContentLoaded', function () {
    const vscodeContainer = document.querySelector('.vscode-container');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const overlay = document.getElementById('overlay');
    const activityBarIcons = document.querySelectorAll('.activity-bar .action-icon');
    const fileExplorerItems = document.querySelectorAll('.file-explorer .file');
    const folderItems = document.querySelectorAll('.file-explorer .folder');
    const tabsContainer = document.querySelector('.tabs-container');
    const editorContainer = document.querySelector('.editor-container');
    const terminal = document.getElementById('terminal');
    const closeTerminalBtn = document.getElementById('close-terminal');
    const toggleTerminalBtn = document.getElementById('toggle-terminal');
    const terminalHeader = document.querySelector('.terminal-header');
    let openFiles = {};

    function setSidebarVisible(visible) { /* ... same as before ... */ }
    function isSidebarVisible() { /* ... same as before ... */ }

    // --- Event Listeners ---
    activityBarIcons.forEach(icon => { /* ... same as before ... */ });
    hamburgerMenu.addEventListener('click', (e) => { /* ... same as before ... */ });
    overlay.addEventListener('click', () => setSidebarVisible(false));
    document.querySelector('.file-explorer').addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.target.closest('.file')) {
            setSidebarVisible(false);
        }
        // Add link handling for welcome page
        if (e.target.tagName === 'A' && e.target.dataset.file) {
            e.preventDefault();
            openFile(e.target.dataset.file);
        }
    });
    folderItems.forEach(folder => { /* ... same as before ... */ });
    fileExplorerItems.forEach(item => { /* ... same as before ... */ });

    // --- Terminal Animation Logic ---
    closeTerminalBtn.addEventListener('click', () => terminal.classList.add('closed'));
    toggleTerminalBtn.addEventListener('click', () => {
        if (terminal.classList.contains('closed')) {
            terminal.classList.remove('closed');
        } else {
            terminal.classList.toggle('hidden');
        }
        const icon = toggleTerminalBtn.classList;
        icon.toggle('fa-chevron-up');
        icon.toggle('fa-chevron-down');
    });
    terminalHeader.addEventListener('click', (e) => {
        if(e.target === terminalHeader || e.target.tagName === 'SPAN') {
            if (terminal.classList.contains('closed')) return; // Don't toggle if fully closed
            toggleTerminalBtn.click();
        }
    });

    // --- ALL NEW CONTENT WITH SYNTAX HIGHLIGHTING ---
    const fileContents = {
        'welcome.md': `
<div class="welcome-page">
    <h1><span class="hand">👋</span> Welcome</h1>
    <p>This is my interactive portfolio, designed to look and feel like VS Code.</p>
    <div class="welcome-grid">
        <div class="welcome-card">
            <h3><i class="fas fa-user"></i> About Me</h3>
            <ul>
                <li><a data-file="aboutme.md"><i class="fab fa-markdown"></i> about_me.md</a></li>
                <li><a data-file="skills.py"><i class="fab fa-python"></i> skills.py</a></li>
            </ul>
        </div>
        <div class="welcome-card">
            <h3><i class="fas fa-folder-open"></i> View My Work</h3>
            <ul>
                <li><a data-file="cool-project.json"><i class="fas fa-project-diagram"></i> cool-project.json</a></li>
                <li><a data-file="readme.md"><i class="fab fa-markdown"></i> README.md</a></li>
            </ul>
        </div>
        <div class="welcome-card">
            <h3><i class="fas fa-link"></i> Get in Touch</h3>
            <ul>
                <li><a data-file="contact.html"><i class="fas fa-envelope"></i> contact.html</a></li>
                <li><a data-file="settings.json"><i class="fas fa-cog"></i> settings.json</a></li>
            </ul>
        </div>
    </div>
</div>
`,
        'readme.md': `
# 👋 Hi, I'm Sajjad!

Welcome to my interactive portfolio. This is a simulation of my favorite coding environment, **VS Code**.

### 🚀 Navigation
- Use the **file explorer** on the left to navigate.
- Click on files like \`aboutme.md\` and \`skills.py\` to learn more about me.
- Check out the **Welcome Page** for quick links.
`,
        'aboutme.md': `
# About Me
I'm **Sajad Vahidi**, a web developer from Iran...
(Your full text here, same as before)
`,
        'skills.py': `
<span class="token-keyword">class</span> <span class="token-class">SajjadSkills</span>:
    <span class="token-keyword">def</span> <span class="token-function">__init__</span>(<span class="token-keyword">self</span>):
        <span class="token-keyword">self</span>.languages = [<span class="token-string">"Python"</span>, <span class="token-string">"JavaScript"</span>, <span class="token-string">"HTML"</span>, <span class="token-string">"CSS"</span>]
        <span class="token-keyword">self</span>.frameworks = {
            <span class="token-string">"backend"</span>: [<span class="token-string">"Flask"</span>, <span class="token-string">"Django"</span>, <span class="token-string">"FastAPI"</span>],
            <span class="token-string">"frontend"</span>: [<span class="token-string">"React"</span>, <span class="token-string">"Vue.js"</span>]
        }
        <span class="token-keyword">self</span>.expertise = [<span class="token-string">"Web Development"</span>, <span class="token-string">"Graphic Design"</span>, <span class="token-string">"UI/UX"</span>, <span class="token-string">"SEO"</span>, <span class="token-string">"Branding"</span>]
        <span class="token-keyword">self</span>.tools = [<span class="token-string">"Git"</span>, <span class="token-string">"Docker"</span>, <span class="token-string">"VS Code"</span>, <span class="token-string">"Linux"</span>, <span class="token-string">"Figma"</span>]

    <span class="token-keyword">def</span> <span class="token-function">show_skills</span>(<span class="token-keyword">self</span>):
        <span class="token-function">print</span>(<span class="token-string">"--- My Technical & Creative Skills ---"</span>)
        <span class="token-comment"># ... (code to print skills)</span>

me = SajjadSkills()
me.show_skills()
`,
        'settings.json': `
{
    <span class="token-property">"workbench.colorTheme"</span>: <span class="token-string">"Default Dark+"</span>,
    <span class="token-property">"editor.fontFamily"</span>: <span class="token-string">"'Fira Code', 'Consolas', 'Courier New', monospace"</span>,
    <span class="token-property">"editor.fontSize"</span>: <span class="token-number">14</span>,
    <span class="token-property">"social"</span>: {
        <span class="token-property">"email"</span>: <span class="token-string">"HI@SAJJ.IR"</span>,
        <span class="token-property">"x_twitter"</span>: <span class="token-string">"https://x.com/sajj_ir"</span>,
        <span class="token-property">"telegram"</span>: <span class="token-string">"https://t.me/SAJJ_IR"</span>,
        <span class="token-property">"github"</span>: <span class="token-string">"https://github.com/your-username"</span>
    },
    <span class="token-property">"portfolio.greeting"</span>: <span class="token-string">"Thanks for visiting my portfolio!"</span>
}
`,
        'contact.html': `... same as before ...`,
        'cool-project.json': `... same as before ...`
    };

    // --- Core Functions (with a small modification for the welcome page) ---
    function createEditorContent(filename) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'editor-content';
        contentDiv.dataset.file = filename;
        const content = fileContents[filename] || '';

        // Check if the content is HTML (for welcome page) or plain text/code
        if (content.trim().startsWith('<')) {
            contentDiv.innerHTML = content;
        } else {
            contentDiv.innerHTML = `<pre>${content}</pre>`;
        }

        editorContainer.appendChild(contentDiv);
        openFiles[filename] = { tab: null, content: contentDiv };
        if (filename === 'contact.html') {
            const form = contentDiv.querySelector('#contactForm');
            if(form) form.addEventListener('submit', handleFormSubmit);
        }
    }

    // --- Initial Load ---
    openFile('welcome.md');

    // The rest of your script (helper functions) remains the same
    // Make sure to include all of them. I'm omitting them here for brevity.
    function setSidebarVisible(visible) { vscodeContainer.dataset.sidebarVisible = visible; overlay.classList.toggle('active', visible && window.innerWidth <= 768); }
    function isSidebarVisible() { return vscodeContainer.dataset.sidebarVisible === 'true'; }
    activityBarIcons.forEach(icon => { icon.addEventListener('click', () => { const wasActive = icon.classList.contains('active'); const targetViewId = icon.dataset.view + '-view'; activityBarIcons.forEach(i => i.classList.remove('active')); icon.classList.add('active'); document.querySelectorAll('.sidebar').forEach(view => { view.style.display = view.id === targetViewId ? 'flex' : 'none'; }); if (wasActive) { setSidebarVisible(!isSidebarVisible()); } else { setSidebarVisible(true); } }); });
    hamburgerMenu.addEventListener('click', (e) => { e.stopPropagation(); const isOpening = !isSidebarVisible(); setSidebarVisible(isOpening); if (isOpening) { document.querySelectorAll('.sidebar').forEach(view => { view.style.display = view.id === 'explorer-view' ? 'flex' : 'none'; }); activityBarIcons.forEach(i => i.classList.remove('active')); document.querySelector('.action-icon[data-view="explorer"]').classList.add('active'); } });
    folderItems.forEach(folder => { folder.addEventListener('click', (e) => { if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') { const currentState = folder.dataset.state; folder.dataset.state = currentState === 'closed' ? 'open' : 'closed'; } }); });
    fileExplorerItems.forEach(item => { item.addEventListener('click', () => { const filename = item.dataset.file; openFile(filename); }); });
    function openFile(filename) { if (!openFiles[filename]) { createTab(filename); createEditorContent(filename); } setActiveFile(filename); }
    function createTab(filename) { const tab = document.createElement('div'); tab.className = 'tab'; tab.dataset.file = filename; const fileIcon = document.querySelector(`.file[data-file="${filename}"] i`).cloneNode(true); const closeIcon = document.createElement('i'); closeIcon.className = 'fas fa-times close-tab'; tab.appendChild(fileIcon); tab.append(` ${filename} `); tab.appendChild(closeIcon); tabsContainer.appendChild(tab); tab.addEventListener('click', () => setActiveFile(filename)); closeIcon.addEventListener('click', (e) => { e.stopPropagation(); closeFile(filename); }); }
    function setActiveFile(filename) { document.querySelectorAll('.tab').forEach(t => t.classList.remove('active')); document.querySelectorAll('.editor-content').forEach(c => c.classList.remove('active')); const activeTab = document.querySelector(`.tab[data-file="${filename}"]`); const activeContent = document.querySelector(`.editor-content[data-file="${filename}"]`); if(activeTab) activeTab.classList.add('active'); if(activeContent) activeContent.classList.add('active'); }
    function closeFile(filename) { const tab = document.querySelector(`.tab[data-file="${filename}"]`); const content = document.querySelector(`.editor-content[data-file="${filename}"]`); if (tab) tab.remove(); if (content) content.remove(); delete openFiles[filename]; const remainingTabs = document.querySelectorAll('.tab'); if (remainingTabs.length > 0) { setActiveFile(remainingTabs[remainingTabs.length - 1].dataset.file); } else { editorContainer.innerHTML = ''; } }
    async function handleFormSubmit(event) { event.preventDefault(); const form = event.target; const responseDiv = document.querySelector('#form-response'); if(!responseDiv) return; responseDiv.textContent = 'Sending message...'; const formData = new FormData(form); const data = Object.fromEntries(formData.entries()); try { const response = await fetch('http://127.0.0.1:5000/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); const result = await response.json(); if (response.ok) { responseDiv.style.color = '#34c759'; responseDiv.textContent = result.message; form.reset(); } else { throw new Error(result.message || 'An error occurred.'); } } catch (error) { responseDiv.style.color = '#ff3b30'; responseDiv.textContent = `Error sending message: ${error.message}`; } }
    const terminalInput = document.getElementById('terminal-input'); const terminalBody = document.getElementById('terminal-body'); if (terminalInput) { terminalInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { const command = terminalInput.value.trim(); if (command) { const prompt = terminalBody.querySelector('.terminal-prompt'); const newLine = document.createElement('div'); newLine.className = 'terminal-line'; newLine.innerHTML = `<span>user@portfolio:~$</span> ${command}`; terminalBody.insertBefore(newLine, prompt); executeCommand(command); terminalInput.value = ''; terminalBody.scrollTop = terminalBody.scrollHeight; } } }); }
    function executeCommand(command) { let output = ''; const commands = { 'help': `Available commands:\n- whoami\n- skills\n- contact\n- clear`, 'whoami': 'Sajjad - A passionate developer...', 'skills': `Languages: Python, JavaScript, HTML, CSS\nFrameworks: Flask, Django, React, Vue.js\nTools: Git, Docker, VS Code, Linux`, 'contact': `Email: your_email@gmail.com\nLinkedIn: linkedin.com/in/your-profile`, 'clear': '' }; const commandKey = command.toLowerCase(); if (commandKey in commands) { output = commands[commandKey]; if (commandKey === 'clear') { const prompt = terminalBody.querySelector('.terminal-prompt'); terminalBody.innerHTML = ''; terminalBody.appendChild(prompt); document.getElementById('terminal-input').focus(); return; } } else { output = `bash: command not found: ${command}`; } const outputLine = document.createElement('div'); outputLine.className = 'terminal-line'; outputLine.textContent = output; terminalBody.insertBefore(outputLine, terminalBody.querySelector('.terminal-prompt')); }
});