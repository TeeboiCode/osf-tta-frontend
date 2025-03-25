const preload = document.querySelector(".preload");
const startBtn = document.querySelector("#btn_start");
const quizRulesCard = document.querySelector("#quiz_rules");
const continueBtn = document.querySelector("#continueBtn");
const countdownContainer = document.querySelector(".count-down-container ");
const exitBtn = document.querySelector("#exitBtn");
let quizCard = document.querySelector("#quiz_card");
let countdownText = document.getElementById("countdownText");
let countdownNum = document.getElementById("countdownNum");
let countdownTime = document.querySelector(".tym");
let questions = document.querySelector("#question");
let optionAnswerBtn = document.querySelector("#answer-option");
let complete = document.querySelector("#complete");
let correctScore = document.querySelector(".correct-score");
let totalQuestion = document.querySelector(".total-question");
let totalQuestion2 = document.querySelector(".total-question2");
let nextQuestion = document.querySelector(".next-question");
let replayBtn = document.querySelector(".replay-btn");
let quitBtn = document.querySelector(".quit-btn");
let questionNextNum = document.querySelector(".questionNextNum");
let percentageScore = document.querySelector(".percentage-score");
let percentageContainer = document.querySelector("#percentage");
const playerForm = document.getElementById("playerForm");
const playerNameInput = document.getElementById("playerName");
const nameContainer = document.querySelector("#nameContainer");
let playerName = "";

// form
let userForm = document.querySelector("#userForm");
let firstName = document.querySelector("#firstNameInput");
let lastName = document.querySelector("#lastNameInput");
let isEventDisabled;

// setting setTimeout for preloading
stopLoad();
function stopLoad() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      preload.classList.add("hidden");
      nameContainer.classList.remove("hidden");
      // startBtn.classList.remove("hidden");
    }, 2000);
  });
}

// name submit
playerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  playerName = playerNameInput.value.trim();

  if (playerName === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your name!",
    });
    return;
  }

  nameContainer.classList.add("hidden");
  startBtn.classList.remove("hidden");

  Swal.fire({
    icon: "success",
    title: `Welcome ${playerName}!`,
    text: "Click Start Quiz when you're ready to begin.",
    confirmButtonText: "OK",
  });
});

function saveQuizResult(score) {
  let results = JSON.parse(localStorage.getItem("quizResults")) || [];

  const newResult = {
    name: playerName,
    score: correctPicked,
    total: quizQuestions.length,
    percentage: ((correctPicked / quizQuestions.length) * 100).toFixed(1),
    date: new Date().toLocaleDateString(),
  };

  results.push(newResult);

  results.sort((a, b) => b.percentage - a.percentage);

  localStorage.setItem("quizResults", JSON.stringify(results));

  // window.location.href = "results.html";
}

// adding Event Listener to start btn
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  preload.style.display = "flex";
  setTimeout(() => {
    preload.classList.add("hidden");
    quizRulesCard.classList.remove("hidden");
  }, 2000);
});

// Start Quiz
continueBtn.addEventListener("click", continueGo);

function continueGo() {
  countdownContainer.classList.remove("hidden");
  quizRulesCard.classList.add("hidden");

  let countdown = 3;
  countdownText.textContent = "Get ready... The game starts in ";
  countdownNum.textContent = "3";

  const interval = setInterval(() => {
    if (countdown > 1) {
      countdown--;
      countdownText.textContent = `Get ready... The game starts in `;
      countdownNum.textContent = countdown;
    } else {
      clearInterval(interval);
      countdownText.textContent = "Go!";
      countdownNum.classList.add("hidden");
      countdownContainer.classList.add("hidden");
      quizCard.classList.remove("hidden");
      startCountDown();
      //   const goInterval = setInterval(() => {

      //   }, 500);
    }
  }, 1000);
}

// Exit Button
exitBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure you want to exit?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0a69ed",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      // window.close();
      preload.style.display = "flex";
      quizRulesCard.classList.add("hidden");
      window.setTimeout(() => {
        preload.style.display = "none";
        startBtn.classList.remove("hidden");
      }, 1000);
    }
  });
});

// Next question counting down
let isClicked = false;
function startCountDown() {
  countingDown = 30;

  countdownTime.innerHTML = countingDown;

  let countingDownInterval = setInterval(() => {
    countingDown--;
    // console.log(countingDown);

    countdownTime.innerHTML = countingDown;
    if (countingDown === 0) {
      // isClicked = false;
      clearInterval(countingDownInterval);
      load();
      // next();
      return;
    } else if (isClicked) {
      isClicked = false;
      clearInterval(countingDownInterval);
      next();
      return;
    }
  }, 2000);
}

// ======================
// ======================
// Questions
// ======================
// ======================

// HTML

const quizQuestions = [
  // HTML Basics (6 Questions)
  {
    id: 1,
    question: "What is HTML, and why is it important for web development?",
    options: [
      "A programming language for backend development",
      "A markup language used to structure web pages",
      "A database query language",
      "A scripting language for animations",
    ],
    correct: "A markup language used to structure web pages",
  },
  {
    id: 2,
    question: "Explain the structure of a basic HTML document.",
    options: [
      "A single <html> tag containing everything",
      "A document with <html>, <head>, and <body> sections",
      "A file containing only JavaScript",
      "An image file used for styling",
    ],
    correct: "A document with <html>, <head>, and <body> sections",
  },
  {
    id: 3,
    question: "What is the purpose of the <head> section in an HTML document?",
    options: [
      "To define the main content of the page",
      "To contain metadata, links, and scripts",
      "To display headings on the page",
      "To structure the footer of the document",
    ],
    correct: "To contain metadata, links, and scripts",
  },
  {
    id: 4,
    question:
      "What is the difference between ordered lists (<ol>) and unordered lists (<ul>)?",
    options: [
      "Ordered lists use bullets, unordered lists use numbers",
      "Ordered lists use numbers, unordered lists use bullets",
      "There is no difference",
      "Ordered lists cannot have nested lists",
    ],
    correct: "Ordered lists use numbers, unordered lists use bullets",
  },
  {
    id: 5,
    question: "How does the <a> tag work, and what attributes can it have?",
    options: [
      "It creates a table with links",
      "It defines a hyperlink and can have href, target, and rel attributes",
      "It is used to insert images",
      "It is used to style text",
    ],
    correct:
      "It defines a hyperlink and can have href, target, and rel attributes",
  },
  {
    id: 6,
    question: "What is semantic HTML, and why is it important?",
    options: [
      "HTML that uses only div elements",
      "HTML that uses meaningful tags for better structure and accessibility",
      "HTML that removes all styling from a page",
      "HTML used only for tables",
    ],
    correct:
      "HTML that uses meaningful tags for better structure and accessibility",
  },

  // HTML Forms (4 Questions)
  {
    id: 7,
    question: "What are HTML forms, and what are some common input types?",
    options: [
      "Forms are used for animations, and common types are GIF and SVG",
      "Forms collect user input, and common types include text, password, email, and checkbox",
      "Forms are used for structuring data, and common types are XML and JSON",
      "Forms are only used for login pages",
    ],
    correct:
      "Forms collect user input, and common types include text, password, email, and checkbox",
  },
  {
    id: 8,
    question: "What is the use of the required attribute in HTML forms?",
    options: [
      "It makes an input field mandatory before form submission",
      "It sets a maximum character limit",
      "It adds a default value",
      "It makes the input field hidden",
    ],
    correct: "It makes an input field mandatory before form submission",
  },
  {
    id: 9,
    question:
      "What are the different types of buttons available in HTML forms?",
    options: [
      "Submit, reset, button",
      "Click, hover, focus",
      "Enable, disable, toggle",
      "Play, pause, stop",
    ],
    correct: "Submit, reset, button",
  },
  {
    id: 10,
    question: "How can you make an image responsive in HTML?",
    options: [
      "Using the src attribute",
      "By setting the width to 100% and using max-width in CSS",
      "By using the alt attribute",
      "By using a fixed width and height",
    ],
    correct: "By setting the width to 100% and using max-width in CSS",
  },

  // CSS Basics (6 Questions)
  {
    id: 11,
    question: "What is CSS, and why is it used in web development?",
    options: [
      "A markup language for structuring web pages",
      "A style sheet language used to design and layout web pages",
      "A scripting language for backend development",
      "A database management language",
    ],
    correct: "A style sheet language used to design and layout web pages",
  },
  {
    id: 12,
    question: "What are the three ways to apply CSS to an HTML document?",
    options: [
      "Inline, internal, and external",
      "Background, foreground, and inline",
      "Class, ID, and element",
      "Script, embed, and import",
    ],
    correct: "Inline, internal, and external",
  },
  {
    id: 13,
    question: "What is the universal selector in CSS, and how is it used?",
    options: [
      "A selector that applies styles to all elements using *",
      "A selector that only applies to images",
      "A selector that selects elements by class name",
      "A selector used only for JavaScript",
    ],
    correct: "A selector that applies styles to all elements using *",
  },
  {
    id: 14,
    question: "What is the difference between id and class selectors in CSS?",
    options: [
      "id is unique and applies to one element, class can be used on multiple elements",
      "id applies to all elements, class applies only to paragraphs",
      "id is used for images, class is used for buttons",
      "id can only be used once in a document, class cannot be reused",
    ],
    correct:
      "id is unique and applies to one element, class can be used on multiple elements",
  },
  {
    id: 15,
    question: "What are pseudo-classes in CSS?",
    options: [
      "Classes used only in JavaScript",
      "Special keywords that define the state of an element, such as :hover or :focus",
      "Classes that define layout properties",
      "Classes used only for animations",
    ],
    correct:
      "Special keywords that define the state of an element, such as :hover or :focus",
  },
  {
    id: 16,
    question:
      "What is the difference between relative, absolute, and fixed positioning in CSS?",
    options: [
      "They are all the same",
      "Relative moves the element based on its normal position, absolute positions it relative to the nearest ancestor, and fixed stays in place",
      "Relative is used for animations, absolute is for styling, and fixed is for accessibility",
      "Fixed is used for flexible layouts, absolute is for fixed layouts, and relative is for animations",
    ],
    correct:
      "Relative moves the element based on its normal position, absolute positions it relative to the nearest ancestor, and fixed stays in place",
  },
  {
    id: 17,
    question:
      "What is the difference between block, inline, and inline-block elements in CSS?",
    options: [
      "Block elements take full width, inline takes only necessary width, inline-block combines both behaviors",
      "Block is for images, inline is for text, inline-block is for tables",
      "There is no difference",
      "Block elements are hidden by default, inline elements are visible",
    ],
    correct:
      "Block elements take full width, inline takes only necessary width, inline-block combines both behaviors",
  },
  {
    id: 18,
    question: "How can you center an element horizontally using CSS?",
    options: [
      "Using margin: auto and setting a fixed width",
      "By using the color property",
      "By setting display: flex",
      "By using text-align: center",
    ],
    correct: "Using margin: auto and setting a fixed width",
  },
  {
    id: 19,
    question: "What does the z-index property do in CSS?",
    options: [
      "Controls the stacking order of elements",
      "Changes the color of an element",
      "Controls font size",
      "Adds a shadow to elements",
    ],
    correct: "Controls the stacking order of elements",
  },
  {
    id: 20,
    question: "What are media queries in CSS?",
    options: [
      "They are used to define different styles for different screen sizes",
      "They are queries used for fetching database data",
      "They are used to add animations to elements",
      "They allow JavaScript execution in CSS",
    ],
    correct:
      "They are used to define different styles for different screen sizes",
  },
  {
    id: 21,
    question: "What is the difference between em and rem units in CSS?",
    options: [
      "em is relative to the parent element, rem is relative to the root element",
      "They both mean the same thing",
      "em is for images, rem is for text",
      "em is fixed, rem is flexible",
    ],
    correct:
      "em is relative to the parent element, rem is relative to the root element",
  },
  {
    id: 22,
    question: "What is Flexbox in CSS?",
    options: [
      "A layout model for designing flexible and responsive layouts",
      "A JavaScript function for animations",
      "A feature that only works on mobile devices",
      "A framework for building websites",
    ],
    correct: "A layout model for designing flexible and responsive layouts",
  },
  {
    id: 23,
    question: "What is the difference between padding and margin in CSS?",
    options: [
      "Padding is inside the element, margin is outside the element",
      "Padding is for text, margin is for images",
      "Padding is fixed, margin is flexible",
      "Padding only works with inline elements",
    ],
    correct: "Padding is inside the element, margin is outside the element",
  },
  {
    id: 24,
    question:
      "What is the difference between absolute and relative URLs in HTML?",
    options: [
      "Absolute URLs include the full web address, while relative URLs point to locations within the same site",
      "Absolute URLs are case-sensitive, relative URLs are not",
      "Relative URLs always start with http://",
      "There is no difference",
    ],
    correct:
      "Absolute URLs include the full web address, while relative URLs point to locations within the same site",
  },
  {
    id: 25,
    question: "How do you open a link in a new tab using the <a> tag?",
    options: [
      "Using the target='_blank' attribute",
      "Using the href='newtab'",
      "By adding a JavaScript function",
      "By setting the link color to blue",
    ],
    correct: "Using the target='_blank' attribute",
  },
  {
    id: 26,
    question: "What is the purpose of the alt attribute in an <img> tag?",
    options: [
      "To provide alternative text for accessibility and SEO",
      "To change the image size",
      "To add a border around the image",
      "To make the image clickable",
    ],
    correct: "To provide alternative text for accessibility and SEO",
  },
  {
    id: 27,
    question: "How do you comment out code in HTML?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment */",
      "# This is a comment",
    ],
    correct: "<!-- This is a comment -->",
  },
  {
    id: 28,
    question: "What is the default display property of a <div> element?",
    options: ["block", "inline", "flex", "grid"],
    correct: "block",
  },
  {
    id: 29,
    question: "What does the overflow property do in CSS?",
    options: [
      "Controls how content is displayed when it exceeds its container",
      "Adds shadows to text",
      "Aligns text to the center",
      "Defines animation speed",
    ],
    correct: "Controls how content is displayed when it exceeds its container",
  },
  {
    id: 30,
    question: "How do you apply an external CSS file to an HTML document?",
    options: [
      "Using the <link> tag inside the <head> section",
      "Using the <script> tag",
      "By writing CSS inside the HTML file",
      "By renaming the file to .html",
    ],
    correct: "Using the <link> tag inside the <head> section",
  },
];

let remainingQuestion = [...quizQuestions];
// console.log(remainingQuestion);

let wrongPicked = 0;
let correctPicked = 0;
let askedQuestionIndex = [];
totalQuestion2.textContent = quizQuestions.length;

function getRandomNumber() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * remainingQuestion.length);
  } while (askedQuestionIndex.includes(randomIndex));
  askedQuestionIndex.push(randomIndex);

  return randomIndex;
}

displayQuestion();
function displayQuestion() {
  if (askedQuestionIndex.length === remainingQuestion.length) {
    quizCard.classList.add("hidden");
    preload.style.display = "flex";
    setTimeout(() => {
      preload.classList.add("hidden");
      complete.classList.remove("hidden");
    }, 3000);

    // Calculate scores
    const correctPercentage = (
      (correctPicked / remainingQuestion.length) *
      100
    ).toFixed(1);
    correctScore.textContent = correctPicked;
    totalQuestion.textContent = quizQuestions.length;
    percentageScore.textContent = correctPercentage;

    if (correctPercentage >= 70) {
      percentageContainer.style.color = "#00cc00";
    } else if (correctPercentage >= 50) {
      percentageContainer.style.color = "#cca300";
    } else {
      percentageContainer.style.color = "#e62e00";
    }

    console.log("Complete!" + correctPercentage);
    console.log("Wrong Answers: " + wrongPicked);
    console.log("Correct Answers: " + correctPicked);

    // Save results
    saveQuizResult();

    return;
  }

  let randomOptionIndex = [0, 1, 2, 3];
  randomOptionIndex.sort(() => Math.random() - 0.5);
  randomOptionIndex.forEach((num) => {
    num;
  });

  const currentQuestionIndex = getRandomNumber();
  const currentQuestion = remainingQuestion[currentQuestionIndex];
  questions.textContent = currentQuestion.question;
  optionAnswerBtn.innerHTML = "";

  currentQuestion.options.forEach((option, i) => {
    const button = document.createElement("p");
    button.textContent = option;
    button.classList.add("answer-option");
    optionAnswerBtn.appendChild(button);
    button.textContent = currentQuestion.options[randomOptionIndex[i]];

    isEventDisabled = true;

    button.addEventListener("click", () => {
      if (isEventDisabled) {
        if (button.textContent === currentQuestion.correct) {
          correctAns();
          correctPicked++;
        } else {
          correctAns();
          wrongPicked++;
          button.classList.add("wrong");
        }
        isEventDisabled = false;
      }
    });
  });

  let optionAnswerBtnNew = document.querySelectorAll(".answer-option");
  // ====================
  // Correct Function
  // ====================
  function correctAns() {
    optionAnswerBtnNew.forEach((btn) => {
      if (btn.textContent === currentQuestion.correct) {
        btn.classList.add("success");
      }
    });
    isClicked = true;
  }

  questionNextNum.textContent = `${askedQuestionIndex.length}. `;
  nextQuestion.textContent = askedQuestionIndex.length;
  console.log(askedQuestionIndex);
}

function next() {
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  load();
});

function load() {
  displayQuestion();
  startCountDown();
  nextBtn.classList.add("hidden");
}

replayBtn.addEventListener("click", () => {
  // complete.classList.add("hidden");
  window.location.reload();
});

// Quit Button
quitBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure you want to quit the game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0a69ed",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../ttaJavaScript.html";
    }
  });
});
