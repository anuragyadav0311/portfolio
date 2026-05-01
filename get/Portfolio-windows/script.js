const bootLines = [
  "Initializing AY-DOS kernel...",
  "Loading memory manager............... OK",
  "Detecting profile: ANURAG_YADAV...... OK",
  "Mounting project workspace........... OK",
  "Loading desktop apps.................. OK",
  "Terminal subsystem online............. OK",
  "Ready."
];

const terminalResponses = {
  about: "Anurag Yadav (Anu): second-year CSE undergrad at VIT Bhopal with AI/ML + systems focus.",
  skills: "Python, C++, Java, HTML | Linux (Ubuntu+Arch) | DSA, ML, Automata, backend basics.",
  education: "DPS Risali, Bhilai (2010-2024) -> VIT Bhopal B.Tech CSE (2024-2028).",
  projects: "cpp-auto-installer, CatXForest, interactive portfolio with terminal experience.",
  linux: "Linux-first workflow on Ubuntu (Wayland), with deep customization experiments on Arch.",
  backend: "Building backend modules around app.py, API structure, and maintainable service logic.",
  gate: "Preparing GATE with strong focus on theoretical CS and mathematical rigor.",
  contact: "Email: anuragyadav47844@gmail.com | GitHub: anuragyadav0311 | LinkedIn: anurag-yadav"
};

const wallpaperClasses = ["wallpaper-classic", "wallpaper-sunset", "wallpaper-matrix", "wallpaper-galaxy"];

const galleryImages = [
  "photos/20260222_190159.jpg",
  "photos/20260223_190922.jpg",
  "photos/ChatGPT Image Feb 24, 2026, 10_59_41 PM(1)(1).png",
  "photos/IMG_20260113_014106_078.webp",
  "photos/WhatsApp Image 2026-02-07 at 12.42.33 PM.jpeg"
];

window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.classList.remove("no-js");

  const bootContainer = document.getElementById("bootLines");
  const statusClock = document.getElementById("statusClock");
  const startButton = document.getElementById("startButton");
  const startMenu = document.getElementById("startMenu");
  const windows = Array.from(document.querySelectorAll(".app-window"));
  const iconButtons = Array.from(document.querySelectorAll("[data-open]"));
  const taskButtons = Array.from(document.querySelectorAll("[data-task]"));
  const closeButtons = Array.from(document.querySelectorAll("[data-close]"));
  const minimizeButtons = Array.from(document.querySelectorAll("[data-minimize]"));
  const terminalForm = document.getElementById("terminalForm");
  const terminalInput = document.getElementById("terminalInput");
  const consoleFeed = document.getElementById("consoleFeed");
  const wallpaperButtons = Array.from(document.querySelectorAll("[data-wallpaper]"));
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryLightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const contactPopup = document.getElementById("contactPopup");
  const contactPopupClose = document.getElementById("contactPopupClose");
  const openContactPopupBtn = document.getElementById("openContactPopup");

  const snakeCanvas = document.getElementById("snakeCanvas");
  const snakeScore = document.getElementById("snakeScore");
  const snakeStartBtn = document.getElementById("snakeStart");
  const snakeResetBtn = document.getElementById("snakeReset");

  const tetrisCanvas = document.getElementById("tetrisCanvas");
  const tetrisScore = document.getElementById("tetrisScore");
  const tetrisStartBtn = document.getElementById("tetrisStart");
  const tetrisPauseBtn = document.getElementById("tetrisPause");
  const tetrisResetBtn = document.getElementById("tetrisReset");

  let z = 50;
  let activeWindowId = "app-about";
  const commandHistory = [];
  let historyIndex = -1;

  const findWindow = (id) => document.getElementById(id);

  const snake = {
    grid: 20,
    cells: 12,
    body: [{ x: 5, y: 5 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 8, y: 8 },
    score: 0,
    timer: null,
    running: false,
    ctx: snakeCanvas ? snakeCanvas.getContext("2d") : null
  };

  const tetris = {
    cols: 10,
    rows: 16,
    block: 20,
    arena: [],
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
    running: false,
    lastTime: 0,
    dropCounter: 0,
    dropInterval: 520,
    rafId: null,
    ctx: tetrisCanvas ? tetrisCanvas.getContext("2d") : null
  };

  const setWallpaper = (name) => {
    wallpaperClasses.forEach((cls) => body.classList.remove(cls));
    const next = `wallpaper-${name}`;
    body.classList.add(next);
    wallpaperButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-wallpaper") === name);
    });
  };

  const updateTaskState = () => {
    taskButtons.forEach((btn) => {
      const id = btn.getAttribute("data-task");
      const win = id ? findWindow(id) : null;
      if (!win || win.classList.contains("hidden") || win.style.display === "none") {
        btn.classList.remove("active-task");
        return;
      }
      const isTop = Number(win.style.zIndex || 0) === z;
      btn.classList.toggle("active-task", isTop);
    });
  };

  const focusWindow = (win) => {
    if (!win) return;
    z += 1;
    win.style.zIndex = String(z);
    windows.forEach((w) => w.classList.remove("active"));
    win.classList.add("active");
    activeWindowId = win.id;
    updateTaskState();
  };

  const openWindow = (id) => {
    const win = findWindow(id);
    if (!win) return;
    win.style.display = "block";
    win.classList.remove("hidden");
    clampWindowToViewport(win);
    focusWindow(win);
  };

  const hideWindow = (id) => {
    const win = findWindow(id);
    if (!win) return;
    win.classList.add("hidden");
    win.style.display = "none";
    if (id === "app-snake") stopSnake();
    if (id === "app-tetris") pauseTetris();
    updateTaskState();
  };

  const toggleFromTaskbar = (id) => {
    const win = findWindow(id);
    if (!win) return;
    const hidden = win.classList.contains("hidden") || win.style.display === "none";
    if (hidden) {
      openWindow(id);
    } else {
      hideWindow(id);
    }
  };

  const clampWindowToViewport = (win) => {
    if (!win || window.innerWidth <= 900) return;
    const rect = win.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - rect.width - 6);
    const maxTop = Math.max(0, window.innerHeight - rect.height - 48);
    const left = Math.min(Math.max(0, rect.left), maxLeft);
    const top = Math.min(Math.max(0, rect.top), maxTop);
    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
  };

  const tileWindows = () => {
    if (window.innerWidth <= 900) return;
    const open = windows.filter((w) => w.style.display !== "none" && !w.classList.contains("hidden"));
    if (open.length === 0) return;
    const startX = 160;
    const startY = 26;
    const stepX = 26;
    const stepY = 28;
    open.forEach((win, index) => {
      win.style.left = `${startX + (index % 6) * stepX}px`;
      win.style.top = `${startY + (index % 6) * stepY}px`;
      clampWindowToViewport(win);
    });
  };

  const makeDraggable = (win) => {
    const handle = win.querySelector("[data-drag-handle]");
    if (!handle) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMove = (event) => {
      if (!dragging) return;
      const x = event.clientX - offsetX;
      const y = event.clientY - offsetY;
      win.style.left = `${Math.max(0, x)}px`;
      win.style.top = `${Math.max(0, y)}px`;
    };

    const stopDrag = () => {
      dragging = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopDrag);
    };

    handle.addEventListener("mousedown", (event) => {
      if (window.innerWidth <= 900) return;
      dragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      focusWindow(win);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", stopDrag);
    });
  };

  const addConsoleLine = (text, kind = "output") => {
    if (!consoleFeed) return;
    const li = document.createElement("li");
    li.classList.add(kind);
    li.textContent = text;
    consoleFeed.appendChild(li);
    consoleFeed.scrollTop = consoleFeed.scrollHeight;
    if (consoleFeed.children.length > 120) {
      consoleFeed.removeChild(consoleFeed.firstChild);
    }
  };

  const randomFood = () => {
    let next = { x: 0, y: 0 };
    do {
      next = {
        x: Math.floor(Math.random() * snake.cells),
        y: Math.floor(Math.random() * snake.cells)
      };
    } while (snake.body.some((part) => part.x === next.x && part.y === next.y));
    return next;
  };

  const drawSnake = () => {
    if (!snake.ctx) return;
    snake.ctx.fillStyle = "#000";
    snake.ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    snake.ctx.fillStyle = "#2fff2f";
    snake.body.forEach((part) => {
      snake.ctx.fillRect(part.x * snake.grid, part.y * snake.grid, snake.grid - 1, snake.grid - 1);
    });

    snake.ctx.fillStyle = "#ff4f4f";
    snake.ctx.fillRect(snake.food.x * snake.grid, snake.food.y * snake.grid, snake.grid - 1, snake.grid - 1);
  };

  const resetSnake = () => {
    snake.body = [{ x: 5, y: 5 }];
    snake.dir = { x: 1, y: 0 };
    snake.nextDir = { x: 1, y: 0 };
    snake.food = randomFood();
    snake.score = 0;
    if (snakeScore) snakeScore.textContent = "Score: 0";
    drawSnake();
  };

  const stopSnake = () => {
    snake.running = false;
    if (snake.timer) {
      clearInterval(snake.timer);
      snake.timer = null;
    }
  };

  const tickSnake = () => {
    snake.dir = { ...snake.nextDir };
    const head = {
      x: snake.body[0].x + snake.dir.x,
      y: snake.body[0].y + snake.dir.y
    };

    const hitWall = head.x < 0 || head.y < 0 || head.x >= snake.cells || head.y >= snake.cells;
    const hitSelf = snake.body.some((part) => part.x === head.x && part.y === head.y);

    if (hitWall || hitSelf) {
      stopSnake();
      addConsoleLine("Snake game over. Press Start to play again.");
      return;
    }

    snake.body.unshift(head);

    if (head.x === snake.food.x && head.y === snake.food.y) {
      snake.score += 1;
      if (snakeScore) snakeScore.textContent = `Score: ${snake.score}`;
      snake.food = randomFood();
    } else {
      snake.body.pop();
    }

    drawSnake();
  };

  const startSnake = () => {
    if (snake.running) return;
    snake.running = true;
    snake.timer = setInterval(tickSnake, 130);
  };

  const createMatrix = (w, h) => {
    const m = [];
    for (let y = 0; y < h; y += 1) {
      m.push(new Array(w).fill(0));
    }
    return m;
  };

  const pieces = {
    I: [[1, 1, 1, 1]],
    O: [[2, 2], [2, 2]],
    T: [[0, 3, 0], [3, 3, 3]],
    S: [[0, 4, 4], [4, 4, 0]],
    Z: [[5, 5, 0], [0, 5, 5]],
    J: [[6, 0, 0], [6, 6, 6]],
    L: [[0, 0, 7], [7, 7, 7]]
  };

  const colorMap = {
    0: "#000",
    1: "#00f0f0",
    2: "#f0f000",
    3: "#b050f0",
    4: "#00f060",
    5: "#f03030",
    6: "#4060f0",
    7: "#f09a20"
  };

  const collide = (arena, player) => {
    const { matrix, pos } = player;
    for (let y = 0; y < matrix.length; y += 1) {
      for (let x = 0; x < matrix[y].length; x += 1) {
        if (matrix[y][x] !== 0) {
          const yy = y + pos.y;
          const xx = x + pos.x;
          if (yy >= arena.length || xx < 0 || xx >= arena[0].length || arena[yy][xx] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const merge = (arena, player) => {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  };

  const rotate = (matrix) => {
    const result = matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
    return result;
  };

  const sweepArena = () => {
    let cleared = 0;
    outer: for (let y = tetris.arena.length - 1; y >= 0; y -= 1) {
      for (let x = 0; x < tetris.arena[y].length; x += 1) {
        if (tetris.arena[y][x] === 0) {
          continue outer;
        }
      }
      const row = tetris.arena.splice(y, 1)[0].fill(0);
      tetris.arena.unshift(row);
      cleared += 1;
      y += 1;
    }
    if (cleared > 0) {
      tetris.score += cleared * 10;
      if (tetrisScore) tetrisScore.textContent = `Score: ${tetris.score}`;
    }
  };

  const randomPiece = () => {
    const keys = Object.keys(pieces);
    return pieces[keys[Math.floor(Math.random() * keys.length)]].map((row) => [...row]);
  };

  const spawnPiece = () => {
    tetris.matrix = randomPiece();
    tetris.pos.y = 0;
    tetris.pos.x = Math.floor(tetris.cols / 2) - Math.floor(tetris.matrix[0].length / 2);
    if (collide(tetris.arena, { matrix: tetris.matrix, pos: tetris.pos })) {
      tetris.arena = createMatrix(tetris.cols, tetris.rows);
      tetris.score = 0;
      if (tetrisScore) tetrisScore.textContent = "Score: 0";
      addConsoleLine("Tetris reset after top-out.");
    }
  };

  const drawTetris = () => {
    if (!tetris.ctx || !tetrisCanvas) return;
    tetris.ctx.fillStyle = "#000";
    tetris.ctx.fillRect(0, 0, tetrisCanvas.width, tetrisCanvas.height);

    const drawMatrix = (matrix, offset) => {
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            tetris.ctx.fillStyle = colorMap[value];
            tetris.ctx.fillRect((x + offset.x) * tetris.block, (y + offset.y) * tetris.block, tetris.block - 1, tetris.block - 1);
          }
        });
      });
    };

    drawMatrix(tetris.arena, { x: 0, y: 0 });
    if (tetris.matrix) {
      drawMatrix(tetris.matrix, tetris.pos);
    }
  };

  const dropPiece = () => {
    tetris.pos.y += 1;
    if (collide(tetris.arena, { matrix: tetris.matrix, pos: tetris.pos })) {
      tetris.pos.y -= 1;
      merge(tetris.arena, tetris);
      sweepArena();
      spawnPiece();
    }
    tetris.dropCounter = 0;
  };

  const movePiece = (dir) => {
    tetris.pos.x += dir;
    if (collide(tetris.arena, { matrix: tetris.matrix, pos: tetris.pos })) {
      tetris.pos.x -= dir;
    }
  };

  const rotatePiece = () => {
    const rotated = rotate(tetris.matrix);
    const originalX = tetris.pos.x;
    let offset = 1;
    tetris.matrix = rotated;
    while (collide(tetris.arena, { matrix: tetris.matrix, pos: tetris.pos })) {
      tetris.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (Math.abs(offset) > tetris.matrix[0].length) {
        tetris.matrix = rotate(rotate(rotate(tetris.matrix)));
        tetris.pos.x = originalX;
        return;
      }
    }
  };

  const hardDrop = () => {
    while (!collide(tetris.arena, { matrix: tetris.matrix, pos: { x: tetris.pos.x, y: tetris.pos.y + 1 } })) {
      tetris.pos.y += 1;
    }
    dropPiece();
  };

  const tetrisLoop = (time = 0) => {
    if (!tetris.running) return;
    const delta = time - tetris.lastTime;
    tetris.lastTime = time;
    tetris.dropCounter += delta;

    if (tetris.dropCounter > tetris.dropInterval) {
      dropPiece();
    }

    drawTetris();
    tetris.rafId = requestAnimationFrame(tetrisLoop);
  };

  const startTetris = () => {
    if (tetris.running) return;
    tetris.running = true;
    tetris.lastTime = 0;
    tetris.rafId = requestAnimationFrame(tetrisLoop);
  };

  const pauseTetris = () => {
    tetris.running = false;
    if (tetris.rafId) {
      cancelAnimationFrame(tetris.rafId);
      tetris.rafId = null;
    }
  };

  const resetTetris = () => {
    pauseTetris();
    tetris.arena = createMatrix(tetris.cols, tetris.rows);
    tetris.score = 0;
    if (tetrisScore) tetrisScore.textContent = "Score: 0";
    spawnPiece();
    drawTetris();
  };


  const openLightbox = (src, captionText) => {
    if (!galleryLightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = encodeURI(src);
    lightboxCaption.textContent = captionText;
    galleryLightbox.classList.add("open");
    galleryLightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    if (!galleryLightbox || !lightboxImage || !lightboxCaption) return;
    galleryLightbox.classList.remove("open");
    galleryLightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxCaption.textContent = "";
  };

  const openContactPopup = () => {
    if (!contactPopup) return;
    contactPopup.classList.add("open");
    contactPopup.setAttribute("aria-hidden", "false");
  };

  const closeContactPopup = () => {
    if (!contactPopup) return;
    contactPopup.classList.remove("open");
    contactPopup.setAttribute("aria-hidden", "true");
  };

  const renderGallery = () => {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = "";
    galleryImages.forEach((path, index) => {
      const item = document.createElement("figure");
      item.className = "gallery-item";

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.setAttribute("aria-label", `Open Image ${index + 1}`);

      const img = document.createElement("img");
      img.src = encodeURI(path);
      img.alt = `Image ${index + 1}`;
      img.loading = "lazy";

      const caption = document.createElement("p");
      caption.textContent = `Image ${index + 1}`;

      trigger.appendChild(img);
      trigger.addEventListener("click", () => openLightbox(path, `Image ${index + 1}`));

      item.appendChild(trigger);
      item.appendChild(caption);
      galleryGrid.appendChild(item);
    });
  };

  const showHelp = () => {
    addConsoleLine("Available commands:");
    addConsoleLine("  help, clear, ls, pwd, whoami, date");
    addConsoleLine("  about, skills, education, projects, linux, backend, gate, contact");
    addConsoleLine("  open <app>    (about|education|skills|projects|backend|terminal|contact|gallery|wallpaper|snake|tetris)");
    addConsoleLine("  snake, tetris, gallery");
  };

  const appMap = {
    about: "app-about",
    education: "app-education",
    skills: "app-skills",
    projects: "app-projects",
    backend: "app-backend",
    terminal: "app-terminal",
    contact: "app-contact",
    gallery: "app-gallery",
    wallpaper: "app-wallpaper",
    snake: "app-snake",
    tetris: "app-tetris"
  };

  const runCommand = (raw) => {
    const input = raw.trim();
    const command = input.toLowerCase();
    if (!command) return;

    addConsoleLine(`anu@ay-os:~$ ${input}`, "prompt");

    commandHistory.push(input);
    historyIndex = commandHistory.length;

    if (command === "clear") {
      if (consoleFeed) consoleFeed.innerHTML = "";
      return;
    }

    if (command === "help") {
      showHelp();
      return;
    }

    if (command === "ls") {
      addConsoleLine("about education skills projects backend terminal contact gallery wallpaper snake tetris");
      return;
    }

    if (command === "pwd") {
      addConsoleLine("/home/anurag/portfolio-desktop");
      return;
    }

    if (command === "whoami") {
      addConsoleLine("anurag-yadav");
      return;
    }

    if (command === "date") {
      addConsoleLine(new Date().toString());
      return;
    }

    if (command.startsWith("open ")) {
      const target = command.replace(/^open\s+/, "").trim();
      const appId = appMap[target];
      if (appId) {
        openWindow(appId);
        addConsoleLine(`Opened ${target}.`, "system");
      } else {
        addConsoleLine(`Unknown app: ${target}`);
      }
      return;
    }

    if (command === "snake" || command === "tetris" || command === "gallery") {
      const appId = appMap[command];
      openWindow(appId);
      addConsoleLine(`Opened ${command}.`, "system");
      return;
    }

    const response = terminalResponses[command];
    if (response) {
      addConsoleLine(response);
      return;
    }

    addConsoleLine(`Command not found: ${command}`);
  };

  const runBoot = () => {
    if (!bootContainer) {
      body.classList.add("boot-complete");
      return;
    }
    let index = 0;
    const tick = () => {
      const line = document.createElement("p");
      line.className = "boot-line";
      line.textContent = bootLines[index];
      bootContainer.appendChild(line);
      bootContainer.scrollTop = bootContainer.scrollHeight;
      index += 1;
      if (index < bootLines.length) {
        window.setTimeout(tick, 280);
      } else {
        window.setTimeout(() => {
          body.classList.add("boot-complete");
          body.classList.remove("boot-active");
          addConsoleLine("Welcome to AY desktop. Type 'help'.", "system");
        }, 500);
      }
    };
    tick();
  };

  const updateClock = () => {
    if (!statusClock) return;
    const now = new Date();
    const formatted = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    statusClock.textContent = formatted;
  };

  windows.forEach((win) => {
    win.addEventListener("mousedown", () => focusWindow(win));
    makeDraggable(win);
  });

  iconButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-open");
      if (!id) return;
      openWindow(id);
      if (startMenu) startMenu.classList.remove("open");
    });
  });

  taskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-task");
      if (!id) return;
      toggleFromTaskbar(id);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-close");
      if (!id) return;
      hideWindow(id);
    });
  });

  minimizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-minimize");
      if (!id) return;
      hideWindow(id);
    });
  });

  wallpaperButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-wallpaper");
      if (!name) return;
      setWallpaper(name);
    });
  });

  if (startButton && startMenu) {
    startButton.addEventListener("click", () => {
      startMenu.classList.toggle("open");
      startMenu.setAttribute("aria-hidden", String(!startMenu.classList.contains("open")));
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!startMenu.contains(target) && target !== startButton) {
        startMenu.classList.remove("open");
        startMenu.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runCommand(terminalInput.value);
      terminalInput.value = "";
    });

    terminalInput.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (commandHistory.length === 0) return;
        historyIndex = Math.max(0, historyIndex - 1);
        terminalInput.value = commandHistory[historyIndex] || "";
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (commandHistory.length === 0) return;
        historyIndex = Math.min(commandHistory.length, historyIndex + 1);
        terminalInput.value = commandHistory[historyIndex] || "";
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const current = terminalInput.value.trim().toLowerCase();
        const base = ["help", "clear", "ls", "pwd", "whoami", "date", "about", "skills", "education", "projects", "linux", "backend", "gate", "contact", "gallery", "snake", "tetris", "open "];
        const hit = base.find((cmd) => cmd.startsWith(current));
        if (hit) terminalInput.value = hit;
      }
    });
  }

  if (snakeStartBtn) snakeStartBtn.addEventListener("click", startSnake);
  if (snakeResetBtn) snakeResetBtn.addEventListener("click", () => {
    stopSnake();
    resetSnake();
  });

  if (tetrisStartBtn) tetrisStartBtn.addEventListener("click", startTetris);
  if (tetrisPauseBtn) tetrisPauseBtn.addEventListener("click", pauseTetris);
  if (tetrisResetBtn) tetrisResetBtn.addEventListener("click", resetTetris);

  document.addEventListener("keydown", (event) => {
    if (activeWindowId === "app-snake" && snake.running) {
      if ((event.key === "ArrowUp" || event.key.toLowerCase() === "w") && snake.dir.y !== 1) snake.nextDir = { x: 0, y: -1 };
      if ((event.key === "ArrowDown" || event.key.toLowerCase() === "s") && snake.dir.y !== -1) snake.nextDir = { x: 0, y: 1 };
      if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a") && snake.dir.x !== 1) snake.nextDir = { x: -1, y: 0 };
      if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d") && snake.dir.x !== -1) snake.nextDir = { x: 1, y: 0 };
    }

    if (activeWindowId === "app-tetris" && tetris.running) {
      if (event.key === "ArrowLeft") movePiece(-1);
      if (event.key === "ArrowRight") movePiece(1);
      if (event.key === "ArrowDown") dropPiece();
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "x") rotatePiece();
      if (event.code === "Space") {
        event.preventDefault();
        hardDrop();
      }
      drawTetris();
    }
  });

  renderGallery();

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener("click", (event) => {
      if (event.target === galleryLightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && galleryLightbox && galleryLightbox.classList.contains("open")) {
      closeLightbox();
    }
    if (event.key === "Escape" && contactPopup && contactPopup.classList.contains("open")) {
      closeContactPopup();
    }
  });


  if (openContactPopupBtn) {
    openContactPopupBtn.addEventListener("click", openContactPopup);
  }

  if (contactPopupClose) {
    contactPopupClose.addEventListener("click", closeContactPopup);
  }

  if (contactPopup) {
    contactPopup.addEventListener("click", (event) => {
      if (event.target === contactPopup) {
        closeContactPopup();
      }
    });
  }

  setWallpaper("classic");
  updateClock();
  window.setInterval(updateClock, 30000);

  window.addEventListener("resize", () => {
    windows.forEach((win) => {
      if (win.style.display !== "none" && !win.classList.contains("hidden")) {
        clampWindowToViewport(win);
      }
    });
  });


  resetSnake();
  resetTetris();

  openWindow("app-about");
  tileWindows();
  focusWindow(findWindow("app-about"));
  runBoot();
});
