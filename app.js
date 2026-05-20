// Navigation & Scroll transitions
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Logo scroll to top
  const logo = document.getElementById('logo-btn');
  if (logo) {
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialize interactive components
  initCalculator();
  updateSandbox();
  loadQuiz();
});

// Role Switcher Logic
function switchRole(role) {
  // Update Selector Buttons
  const buttons = document.querySelectorAll('.role-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Find clicked button
  event.currentTarget.classList.add('active');

  // Update Tutorial Blocks
  const blocks = document.querySelectorAll('.role-block');
  blocks.forEach(block => {
    block.classList.remove('active');
  });

  const activeBlock = document.getElementById(`block-${role}`);
  if (activeBlock) {
    activeBlock.classList.add('active');
  }
}

// Interactive Sandbox (HTML/CSS Playground)
function updateSandbox() {
  const textSelect = document.getElementById('sb-text');
  const radiusRange = document.getElementById('sb-radius');
  const colorSelect = document.getElementById('sb-color');
  const paddingRange = document.getElementById('sb-padding');
  
  const btn = document.getElementById('sandbox-btn');
  const codeBlock = document.getElementById('sandbox-code-block');

  if (!btn || !codeBlock) return;

  const btnText = textSelect.value;
  const radius = radiusRange.value + 'px';
  const color = colorSelect.value;
  const padding = paddingRange.value + 'px';

  // Apply styles dynamically to the button preview
  btn.innerText = btnText;
  btn.style.backgroundColor = color;
  btn.style.borderRadius = radius;
  btn.style.padding = `${padding} ${parseInt(padding) * 2}px`;
  
  // Custom glowing drop shadow matching the background color
  btn.style.boxShadow = `0 4px 15px ${color}55`;

  // Update HTML code snippet inside the block
  codeBlock.innerHTML = `&lt;button style="background: ${color}; padding: ${padding} ${parseInt(padding) * 2}px; border-radius: ${radius}; color: #ffffff; border: none; font-weight: 600;"&gt;\n  ${btnText}\n&lt;/button&gt;`;
}

// Timofey Toropov Funnel Calculator Logic
function initCalculator() {
  const incomeGoal = document.getElementById('income-goal');
  const incomeVal = document.getElementById('income-val');
  const avgCheck = document.getElementById('avg-check');
  const checkVal = document.getElementById('check-val');

  if (!incomeGoal || !avgCheck) return;

  const updateValues = () => {
    // Format slider values nicely with thousands separators
    incomeVal.value = parseInt(incomeGoal.value).toLocaleString('ru-RU');
    checkVal.value = parseInt(avgCheck.value).toLocaleString('ru-RU');

    // Funnel calculations based on conversions from presentation PDF (pages 17, 47)
    const goal = parseInt(incomeGoal.value);
    const ticket = parseInt(avgCheck.value);

    // Sales needed (Income / average ticket, rounded up)
    const sales = Math.ceil(goal / ticket);
    
    // Zoom diagnostics (40% conversion from zoom to sale: sales / 0.4)
    const zooms = Math.ceil(sales / 0.40);
    
    // Chats/conversations (25% conversion from chat to zoom: zooms * 4)
    const chats = Math.ceil(zooms / 0.25);
    
    // Reach in stories needed (8% conversion from story viewers to chats: chats / 0.08)
    const reach = Math.ceil(chats / 0.08);

    // Update Dashboard UI
    document.getElementById('res-sales').innerText = sales;
    document.getElementById('res-zooms').innerText = zooms;
    document.getElementById('res-chats').innerText = chats;
    document.getElementById('res-reach').innerText = reach.toLocaleString('ru-RU');
  };

  incomeGoal.addEventListener('input', updateValues);
  avgCheck.addEventListener('input', updateValues);
  updateValues();
}

// Quiz Component Logic
const quizData = [
  {
    question: "Чем AntiGravity 2.0 принципиально отличается от обычного ChatGPT?",
    options: [
      "Он просто пишет более развернутые тексты и сказки",
      "Он умеет сам создавать, изменять и запускать файлы на компьютере, а также автономно исправлять свои ошибки",
      "Он умеет работать только на смартфонах Apple и нигде больше",
      "Ничем, это просто переименованный ChatGPT"
    ],
    answer: 1
  },
  {
    question: "Какое действие выполняет слэш-команда /goal в AntiGravity?",
    options: [
      "Сразу выводит готовый диплом об окончании курса",
      "Запускает ИИ выполнять сложную многоэтапную задачу автономно в фоне (ИИ сам проверяет код, гуглит и исправляет ошибки, пока цель не будет достигнута)",
      "Выключает компьютер пользователя для экономии энергии",
      "Включает режим обычного разговора о погоде"
    ],
    answer: 1
  },
  {
    question: "Как работает функция 'Self-Healing' (самоисправление) кода в AntiGravity?",
    options: [
      "ИИ отправляет вам уведомление на телефон, чтобы вы сами починили код",
      "ИИ сам запускает написанный код, видит системные ошибки или косяки верстки в консоли и автоматически переписывает файлы до тех пор, пока они не заработают без ошибок",
      "Эта функция лечит вирусы на компьютере пользователя",
      "Она переводит код на русский язык для простоты чтения"
    ],
    answer: 1
  },
  {
    question: "Кто такие Субагенты в системе AntiGravity?",
    options: [
      "Компьютерные вирусы, мешающие нормальной работе",
      "Независимые фоновые ИИ-помощники, которым основной ИИ может поручить параллельный поиск информации или тестирование кода, не отвлекая пользователя",
      "Служба поддержки пользователей в Telegram",
      "Специальные программы для скачивания музыки"
    ],
    answer: 1
  },
  {
    question: "Какова роль человека в запуске веб-агентства на AntiGravity по схеме Тимофея Торопова?",
    options: [
      "Вы должны вручную писать сложный код на JS и настраивать сервера сутками",
      "Вы занимаетесь только дизайном в Photoshop, а код заказываете у фрилансеров",
      "Ваша суперсила — продажи, кастдевы, смыслы и общение с клиентами. Всю техническую реализацию сайтов и воронки под ключ делает AntiGravity",
      "Вы вообще ничего не делаете, а просто ждете, когда деньги появятся на карте"
    ],
    answer: 2
  }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuiz() {
  const qText = document.getElementById('quiz-prog-text');
  const qTitle = document.getElementById('quiz-q-title');
  const optionsBox = document.getElementById('quiz-options-box');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (!qTitle || !optionsBox) return;

  nextBtn.style.display = 'none';
  qText.innerText = `Вопрос ${currentQuestion + 1} из ${quizData.length}`;
  
  const currentQ = quizData[currentQuestion];
  qTitle.innerText = currentQ.question;
  
  optionsBox.innerHTML = '';
  currentQ.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerText = opt;
    btn.onclick = () => selectOption(idx);
    optionsBox.appendChild(btn);
  });
}

function selectOption(index) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.classList.remove('selected');
    if (idx === index) {
      opt.classList.add('selected');
    }
  });

  userAnswers[currentQuestion] = index;
  document.getElementById('quiz-next-btn').style.display = 'inline-flex';
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuiz();
  } else {
    // Show Name Screen
    document.getElementById('quiz-question-screen').style.display = 'none';
    document.getElementById('quiz-name-screen').style.display = 'block';
  }
}

// Certificate Generation Modal trigger
function generateCertificate() {
  const nameInput = document.getElementById('user-name-input');
  const certName = document.getElementById('cert-user-name');
  const modal = document.getElementById('cert-modal');

  if (!nameInput || !modal) return;

  const name = nameInput.value.trim() || 'Успешный AI-Мастер';
  certName.innerText = name;
  modal.classList.add('active');

  // Trigger smooth confetti effect using simple canvas-less CSS circles floating up if supported
  createConfetti();
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  // Reset Quiz
  currentQuestion = 0;
  userAnswers = [];
  document.getElementById('quiz-question-screen').style.display = 'block';
  document.getElementById('quiz-name-screen').style.display = 'none';
  loadQuiz();
}

function createConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 8 + 5 + 'px';
    confetti.style.height = Math.random() * 8 + 5 + 'px';
    confetti.style.backgroundColor = ['#d946ef', '#06b6d4', '#3b82f6', '#facc15'][Math.floor(Math.random() * 4)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '105vh';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = Math.random() * 0.7 + 0.3;
    confetti.style.transition = `transform ${Math.random() * 2 + 1.5}s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 2s ease`;
    
    document.body.appendChild(confetti);

    // Force reflow
    confetti.offsetHeight;

    confetti.style.transform = `translateY(-115vh) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
    
    setTimeout(() => {
      confetti.style.opacity = '0';
      setTimeout(() => confetti.remove(), 1000);
    }, Math.random() * 1000 + 1500);
  }
}
