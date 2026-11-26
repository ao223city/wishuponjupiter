const spaceJourney = document.getElementById("space-journey");
const journeyStarsFar = document.getElementById("journey-stars-far");
const journeyStarsMid = document.getElementById("journey-stars-mid");
const journeyStarsNear = document.getElementById("journey-stars-near");
const journeyScene = document.getElementById("journey-scene");
const journeyStarField = document.getElementById("journey-star-field");
const journeyCapsule = document.getElementById("journey-capsule");
const journeyCapsuleWish = document.getElementById("journey-capsule-wish");
const journeyText = document.getElementById("journey-text");
const wishForm = document.getElementById("wish-form");
const wishInput = document.getElementById("wish-input");
const sendButton = document.getElementById("send-button");
const starField = document.getElementById("star-field");
const wishArea = document.getElementById("wish-area");
const capsule = document.getElementById("capsule");
const capsuleWish = document.getElementById("capsule-wish");
const journeyMusic = document.getElementById("journey-music");
const landingPage = document.querySelector(".landing-page");
const wishBoxWrapper = document.querySelector(".wish-box-wrapper");

let birthdayMessageShown = false;
let musicHasEnded = false;
let birthdayEndingStarted = false;

journeyMusic.addEventListener("timeupdate", () => {
    if (
        journeyMusic.duration &&
        journeyMusic.currentTime >= journeyMusic.duration - 9 &&
        !musicHasEnded
    ) {
        musicHasEnded = true;

        if (birthdayMessageShown) {
            beginBirthdayEnding();
        }
    }
});

journeyMusic.addEventListener("ended", () => {
    musicHasEnded = true;

    if (birthdayMessageShown) {
        beginBirthdayEnding();
    }
});

const STAR_COUNT = 90;

function createStar() {
    const star = document.createElement("span");
    star.classList.add("pixel-star");

    const size = Math.random() < 0.7 ? 2 : 3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;

    return star;
}

function createStarField() {
    if (!starField) return;

    starField.innerHTML = "";

    for (let i = 0; i < STAR_COUNT; i++) {
        starField.appendChild(createStar());
    }
}

function createJourneyStar(container, type) {
    if (!container) return;

    const star = document.createElement("span");
    star.classList.add("journey-star");

    if (type) {
        star.classList.add(type);
    }

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;

    container.appendChild(star);
}

function createJourneyStarField() {
    createJourneyStar(journeyStarsFar, "far");
    createJourneyStar(journeyStarsMid, "mid");
    createJourneyStar(journeyStarsNear, "near");
}

function createJourneyBackgroundStars() {
    if (!journeyStarField) return;

    journeyStarField.innerHTML = "";

    for (let i = 0; i < 70; i++) {
        const star = document.createElement("span");
        star.classList.add("journey-background-star");

        const size = Math.random() < 0.8 ? 2 : 3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${2 + Math.random() * 4}s`;

        journeyStarField.appendChild(star);
    }
}

function createComets() {
    if (!journeyStarField) return;

    const oldComets =
        journeyStarField.querySelectorAll(".pixel-comet");

    oldComets.forEach((comet) => comet.remove());

    const cometData = [
    // WAVE 1 — First 11 comets
    { type: "small",  left: "82%", top: "14%", delay: "0.3s" },
    { type: "normal", left: "28%", top: "32%", delay: "0.9s" },
    { type: "large",  left: "88%", top: "38%", delay: "1.5s" },
    { type: "small",  left: "15%", top: "18%", delay: "2.2s" },
    { type: "normal", left: "91%", top: "68%", delay: "2.8s" },
    { type: "small",  left: "47%", top: "86%", delay: "3.5s" },
    { type: "large",  left: "35%", top: "58%", delay: "4.1s" },
    { type: "small",  left: "76%", top: "52%", delay: "4.8s" },
    { type: "normal", left: "18%", top: "72%", delay: "5.4s" },
    { type: "small",  left: "52%", top: "34%", delay: "6.1s" },
    { type: "normal", left: "94%", top: "20%", delay: "6.7s" },

    // WAVE 2 — Next 11 comets
    { type: "small",  left: "12%", top: "8%",  delay: "9.5s" },
    { type: "normal", left: "68%", top: "25%", delay: "10.2s" },
    { type: "large",  left: "76%", top: "30%", delay: "10.8s" },
    { type: "small",  left: "42%", top: "12%", delay: "11.5s" },
    { type: "normal", left: "64%", top: "48%", delay: "12.1s" },
    { type: "small",  left: "8%",  top: "45%", delay: "12.8s" },
    { type: "large",  left: "84%", top: "82%", delay: "13.4s" },
    { type: "normal", left: "22%", top: "40%", delay: "14.1s" },
    { type: "small",  left: "61%", top: "74%", delay: "14.7s" },
    { type: "normal", left: "72%", top: "8%",  delay: "15.4s" },
    { type: "small",  left: "25%", top: "88%", delay: "16.0s" },

    // WAVE 3 — Final 11 comets
    { type: "normal", left: "32%", top: "20%", delay: "18.8s" },
    { type: "small",  left: "55%", top: "16%", delay: "19.5s" },
    { type: "large",  left: "58%", top: "63%", delay: "20.1s" },
    { type: "small",  left: "6%",  top: "60%", delay: "20.8s" },
    { type: "normal", left: "80%", top: "58%", delay: "21.4s" },
    { type: "small",  left: "44%", top: "44%", delay: "22.1s" },
    { type: "large",  left: "15%", top: "52%", delay: "22.7s" },
    { type: "normal", left: "70%", top: "78%", delay: "23.4s" },
    { type: "small",  left: "50%", top: "56%", delay: "24.0s" },
    { type: "normal", left: "90%", top: "90%", delay: "24.7s" },
    { type: "large",  left: "38%", top: "70%", delay: "25.3s" }
];

    cometData.forEach((data) => {
        const comet = document.createElement("span");

        comet.classList.add("pixel-comet");

        if (data.type !== "normal") {
            comet.classList.add(data.type);
        }

        comet.style.left = data.left;
        comet.style.top = data.top;
        comet.style.animation = "none";

        journeyStarField.appendChild(comet);

        void comet.offsetWidth;

        comet.style.animation =
            "shootingStar 3.5s linear 1 forwards";

        comet.style.animationDelay = data.delay;
    });
}

function startJourneyMusic() {
    if (!journeyMusic) return;

    journeyMusic.pause();
    journeyMusic.currentTime = 0;
    journeyMusic.volume = 0;

    musicHasEnded = false;
    birthdayMessageShown = false;
    birthdayEndingStarted = false;

    const playPromise = journeyMusic.play();

    if (playPromise && typeof playPromise.then === "function") {
        playPromise
            .then(() => {
                const startTime = performance.now();
                const fadeDuration = 2000;

                function fadeMusic(currentTime) {
                    const progress = Math.min(
                        (currentTime - startTime) / fadeDuration,
                        1
                    );

                    journeyMusic.volume = 0.7 * progress;

                    if (progress < 1) {
                        requestAnimationFrame(fadeMusic);
                    }
                }

                requestAnimationFrame(fadeMusic);
            })
            .catch(error => {
                console.error("Journey music failed:", error);
            });
    }
}

function enterJourneyScene(wish) {
    if (!journeyScene) return;

    if (journeyCapsuleWish) {
        journeyCapsuleWish.textContent = wish;
    }

    if (journeyCapsule) {
        journeyCapsule.classList.remove("drifting");
    }

    createJourneyBackgroundStars();

    document.body.classList.add("showing-journey");

    journeyScene.classList.add("active");

    scheduleFinalScene();

    window.setTimeout(() => {
        createComets();
    }, 150);

    window.setTimeout(() => {
        if (journeyCapsule) {
            journeyCapsule.classList.add("drifting");
        }

        if (journeyText) {
            journeyText.classList.add("visible");
        }
    }, 500);
}

function scheduleFinalScene() {
    window.setTimeout(() => {
        startFinalScene();
    }, 30950);
}

async function launchWish() {
    if (!wishInput || !capsule || !wishArea) return;

    const wish = wishInput.value.trim();

    if (!wish) {
        wishInput.focus();
        return;
    }

    if (sendButton && sendButton.disabled) return;

    if (sendButton) sendButton.disabled = true;

    wishInput.disabled = true;

    if (capsuleWish) {
        capsuleWish.textContent = wish;
    }

    startJourneyMusic();

    wishArea.classList.add("launching");

    window.setTimeout(() => {
        wishArea.classList.add("capsule-mode");

        window.setTimeout(async () => {
            capsule.classList.add("ready");

            await new Promise(resolve => {
                let finished = false;
                let fallback;

                function finish() {
                    if (finished) return;
                    finished = true;

                    clearTimeout(fallback);

                    capsule.removeEventListener(
                        "transitionend",
                        handleTransition
                    );

                    resolve();
                }

                function handleTransition(event) {
                    if (event.propertyName !== "transform") return;
                    finish();
                }

                fallback = setTimeout(finish, 1200);

                capsule.addEventListener(
                    "transitionend",
                    handleTransition
                );
            });

            const jupiter = document.querySelector(".jupiter-icon");

            if (!jupiter) {
                console.error("Jupiter icon was not found.");
                return;
            }

            const capsuleRect =
                capsule.getBoundingClientRect();

            const jupiterRect =
                jupiter.getBoundingClientRect();

            const capsuleCenterX =
                capsuleRect.left + capsuleRect.width / 2;

            const capsuleCenterY =
                capsuleRect.top + capsuleRect.height / 2;

            const jupiterCenterX =
                jupiterRect.left + jupiterRect.width / 2;

            const jupiterCenterY =
                jupiterRect.top + jupiterRect.height / 2;

            const flightX =
                jupiterCenterX - capsuleCenterX;

            const flightY =
                jupiterCenterY - capsuleCenterY;

            capsule.style.setProperty(
                "--flight-x",
                `${flightX}px`
            );

            capsule.style.setProperty(
                "--flight-y",
                `${flightY}px`
            );

            capsule.classList.remove("arrived", "launch");

            void capsule.offsetWidth;

            function handleCapsuleArrival(event) {
                if (event.animationName !== "capsuleFlight") return;

                capsule.removeEventListener(
                    "animationend",
                    handleCapsuleArrival
                );

                capsule.classList.remove("launch");

                const finalJupiter =
                    document.querySelector(".jupiter-icon");

                if (finalJupiter) {
                    const finalRect =
                        finalJupiter.getBoundingClientRect();

                    document.body.appendChild(capsule);

                    capsule.style.position = "fixed";
                    capsule.style.left =
                        `${finalRect.left + finalRect.width / 2}px`;
                    capsule.style.top =
                        `${finalRect.top + finalRect.height / 2}px`;

                    capsule.style.setProperty("--flight-x", "0px");
                    capsule.style.setProperty("--flight-y", "0px");
                }

                capsule.classList.add("arrived");

                window.setTimeout(() => {
                    enterJourneyScene(wish);
                }, 900);
            }

            capsule.addEventListener(
                "animationend",
                handleCapsuleArrival
            );

            wishArea.classList.add("launch-started");

            requestAnimationFrame(() => {
                capsule.classList.add("launch");
            });


        }, 1600);

    }, 100);
}

function handleWishSubmit(event) {
    event.preventDefault();
    launchWish();
}

function initialize() {
    createStarField();
    createJourneyStarField();
    createJourneyBackgroundStars();

    if (wishForm) {
        wishForm.addEventListener(
            "submit",
            handleWishSubmit
        );
    }
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialize
    );
} else {
    initialize();
}

/* =========================================================
   PAGE 3 — JUPITER'S FINAL SCENE
   New functionality only. Existing scenes remain untouched.
   ========================================================= */

const finalScene = document.getElementById("final-scene");
const finalStarField = document.getElementById("final-star-field");
const finalJupiter = document.getElementById("final-jupiter");
const finalCometField = document.getElementById("final-comet-field");
const finalArrivalStar = document.getElementById("final-arrival-star");
const finalMessage = document.getElementById("final-message");


/* Create the background stars for Page 3 */

function createFinalBackgroundStars() {
    if (!finalStarField) return;

    finalStarField.innerHTML = "";

    for (let i = 0; i < 90; i++) {
        const star = document.createElement("span");

        star.className = "final-background-star";

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.animationDelay = `${Math.random() * 3}s`;

        finalStarField.appendChild(star);
    }
}


/* Wait for a specific amount of time */

function finalSceneWait(milliseconds) {
    return new Promise(resolve => {
        window.setTimeout(resolve, milliseconds);
    });
}


/* Create the capsule for its final approach to Jupiter */

function createFinalCapsule(wish) {
    if (!finalScene || !finalJupiter) return null;

    const capsule = document.createElement("div");
    capsule.className = "final-capsule";
    capsule.setAttribute("aria-hidden", "true");

    // Match the Page 2 capsule structure
    const windowElement = document.createElement("div");
    windowElement.className = "final-capsule-window";

    const wishText = document.createElement("span");
    wishText.textContent = wish;
    windowElement.appendChild(wishText);

    const detail = document.createElement("div");
    detail.className = "final-capsule-detail";

    const exhaust = document.createElement("div");
    exhaust.className = "final-capsule-exhaust";

    for (let i = 0; i < 3; i++) {
        exhaust.appendChild(document.createElement("span"));
    }

    capsule.appendChild(windowElement);
    capsule.appendChild(detail);
    capsule.appendChild(exhaust);

    // Start outside the left edge of the screen
    capsule.style.left = "-140px";
    capsule.style.bottom = "17%";

    finalScene.appendChild(capsule);
    return capsule;
}


/* Fly the capsule toward Jupiter and turn it into a star */

async function animateFinalArrival() {
    if (!finalScene || !finalJupiter || !finalArrivalStar) return;

    const capsule = createFinalCapsule(
        wishInput ? wishInput.value.trim() : ""
    );

    // Let the capsule be added to Page 3 before measuring positions.
    await finalSceneWait(300);

    const capsuleRect = capsule.getBoundingClientRect();
    const jupiterRect = finalJupiter.getBoundingClientRect();

    // Find the center of the capsule at launch.
    const startX = capsuleRect.left + capsuleRect.width / 2;
    const startY = capsuleRect.top + capsuleRect.height / 2;

    // Aim for Jupiter's center.
    const targetX = jupiterRect.left + jupiterRect.width / 2;
    const targetY = jupiterRect.top + jupiterRect.height / 2;

    // Calculate the exact travel distance.
    capsule.style.setProperty(
        "--final-flight-x",
        `${targetX - startX}px`
    );

    capsule.style.setProperty(
        "--final-flight-y",
        `${targetY - startY}px`
    );

    // Position the arrival star at the same destination.
    finalArrivalStar.style.left = `${targetX}px`;
    finalArrivalStar.style.top = `${targetY}px`;

    // Start the flight toward Jupiter.
    capsule.classList.remove("flying");
    void capsule.offsetWidth;
    capsule.classList.add("flying");

    // Wait for the capsule's CSS flight animation.
    await finalSceneWait(4100);

    // The capsule becomes a twinkling star.
    capsule.remove();

    finalArrivalStar.classList.remove("twinkle");
    void finalArrivalStar.offsetWidth;
    finalArrivalStar.classList.add("twinkle");

    // Let the star twinkle without delaying the next scene.
}

/* Send three comets falling downward, one at a time */

/* Page 3 — Continuous falling comets until the scene fades out */

async function animateFinalComets() {
    if (!finalCometField || !finalScene) return;

    finalCometField.innerHTML = "";

    // Keep creating comets while Page 3 is active.
    while (
        finalScene.classList.contains("active") &&
        !finalScene.classList.contains("fading-out")
    ) {
        const comet = document.createElement("span");

        comet.className = "final-comet";

        // Random horizontal position.
        comet.style.left = `${5 + Math.random() * 90}%`;

        // Randomize the comet's size.
        const size = Math.random();

        if (size < 0.3) {
            comet.style.width = "3px";
            comet.style.height = "3px";
        } else if (size > 0.8) {
            comet.style.width = "6px";
            comet.style.height = "6px";
        }

        // Slightly vary the falling speed.
        const fallDuration = 2 + Math.random() * 1.5;
        comet.style.animationDuration = `${fallDuration}s`;

        finalCometField.appendChild(comet);

        // Start the falling animation.
        void comet.offsetWidth;
        comet.classList.add("falling");

        // Remove each comet after it finishes falling.
        window.setTimeout(() => {
            comet.remove();
        }, fallDuration * 1000 + 100);

        // Brief pause before creating the next comet.
        await finalSceneWait(450 + Math.random() * 650);
    }

    // Clear remaining comets when Page 3 ends.
    finalCometField.innerHTML = "";
}


/* Display Jupiter's messages in sequence */

async function showFinalMessages() {
    if (!finalMessage) return;

    const wish = (wishInput?.value || "").toLowerCase();

    const keywordAliases = {
    love: ["love", "lovelife"],
    happiness: ["happiness", "happy", "joy", "pleasure"],
    success: [
        "success",
        "achievement",
        "achieve",
        "accomplish",
        "victory",
        "victorious"
    ],
    hope: ["hope"],
    healing: ["healing", "healed", "heal"],
    family: ["family"],
    friendship: ["friendship", "friends", "companion"],
    money: ["money", "wealth", "rich"],
    health: ["health", "healthy"],
    dreams: ["dreams", "ambition", "goals"]
};

    const keywordMessages = {
        love: [
            "Jupiter wants you to know that love is finding its way toward you",
            "You deserve a love that feels like home and shines like the stars",
            "May your heart always be surrounded by warmth and genuine connection",
            "The universe has beautiful ways of bringing hearts together"
        ],

        happiness: [
            "Jupiter wishes you a life filled with happiness and beautiful moments",
            "May laughter and joy find their way into your everyday life",
            "You deserve happiness that shines brighter than the stars",
            "May happiness always find its way back to you"
        ],

        success: [
            "Jupiter believes beautiful opportunities are waiting for you",
            "May every step bring you closer to your dreams",
            "Your determination can take you farther than you imagine",
            "May the universe open beautiful doors for your success"
        ],

        hope: [
            "Jupiter reminds you that brighter days are always possible",
            "Even the darkest skies eventually reveal their stars",
            "May hope guide you toward beautiful new beginnings",
            "Trust that wonderful possibilities are finding their way toward you"
        ],

        healing: [
            "Jupiter wishes your heart the peace it deserves",
            "Give yourself permission to rest and begin again",
            "May every passing day bring you renewed strength",
            "Even wounded stars continue to shine across the universe"
        ],

        family: [
            "Jupiter wishes your family love and happiness",
            "May the bonds you cherish grow stronger every day",
            "May your home always be filled with warmth and understanding",
            "Family love can be one of the brightest lights in your universe"
        ],

        friendship: [
            "Jupiter wishes you beautiful and genuine friendships",
            "May you always find people who appreciate your heart",
            "True friendship makes every journey feel lighter",
            "May wonderful companions always find their way into your life"
        ],

        money: [
            "Jupiter wishes abundance and prosperity into your life",
            "May your efforts open doors to greater opportunities",
            "May prosperity bring you freedom and peace",
            "May wonderful opportunities find their way toward you"
        ],

        health: [
            "Jupiter wishes you strength, wellness, and renewed energy",
            "May your body and mind receive the care they deserve",
            "May every sunrise bring another opportunity to nurture yourself",
            "Your well-being is precious, just like every star in the universe"
        ],

        dreams: [
            "Jupiter wishes your dreams grow brighter every day",
            "Believe in the possibilities waiting beyond what you can see",
            "May courage carry you toward the life you imagine",
            "Some dreams are written among the stars, waiting for you to reach them"
        ]
    };

    const genericMessages = [
        "Jupiter wants you to know that beautiful things are still waiting for you",
        "Close your eyes and believe that wonderful possibilities are finding their way toward you",
        "Because somewhere in this vast universe, a little magic is meant for you",
        "May the stars remind you that your story is still unfolding beautifully"
    ];

    const detectedCategories = Object.keys(keywordAliases).filter(category => {
        return keywordAliases[category].some(keyword => {
            return new RegExp(`\\b${keyword}\\b`, "i").test(wish);
        });
    });

    const selectedMessages = detectedCategories.length === 1
        ? keywordMessages[detectedCategories[0]]
        : genericMessages;

    const messages = [
        {
            text: "Your wish has reached, Jupiter",
            duration: 3500
        },
        {
            text: selectedMessages[0],
            duration: 5500
        },
        {
            text: selectedMessages[1],
            duration: 5000
        },
        {
            text: selectedMessages[2],
            duration: 4000
        },
        {
            text: selectedMessages[3],
            duration: 6000
        }
    ];

    for (const message of messages) {
        finalMessage.classList.remove("visible");

        await finalSceneWait(1000);

        finalMessage.textContent = message.text;

        void finalMessage.offsetWidth;

        finalMessage.classList.add("visible");

        await finalSceneWait(message.duration);

        finalMessage.classList.remove("visible");

        await finalSceneWait(1000);
    }

    await beginBirthdayEnding();
}

/* Start Page 3 */

async function startFinalScene() {
    if (!finalScene || !journeyScene) return;

    createFinalBackgroundStars();

    finalScene.classList.add("active");
    journeyScene.classList.remove("active");

    await animateFinalArrival();

    // Wait one second after the capsule reaches Jupiter.
    await finalSceneWait(1000);

    // Start the messages and comets together.
    animateFinalComets();
    showFinalMessages();
}

/* Birthday Ending — Return Home Before Music Ends */

async function beginBirthdayEnding() {
    if (!finalScene || !landingPage || birthdayEndingStarted) return;

    birthdayEndingStarted = true;

    // Jupiter glows while music continues.
    if (finalJupiter) {
        finalJupiter.classList.add("birthday-magic");
    }

    if (finalMessage) {
        finalMessage.classList.remove("visible");
    }

    // Keep Jupiter glowing and music playing.
    await finalSceneWait(2500);

    // Fade the scene while music is still playing.
    finalScene.classList.add("fading-out");

    await finalSceneWait(1000);

    // Stop music just before returning home.

    // Fade music out before returning home.
    if (journeyMusic) {
        const fadeDuration = 2500;
        const startVolume = journeyMusic.volume;
        const fadeStep = startVolume / 50;

        for (let i = 0; i < 50; i++) {
            journeyMusic.volume = Math.max(
                0,
                journeyMusic.volume - fadeStep
            );

            await finalSceneWait(fadeDuration / 50);
        }

        journeyMusic.pause();
        journeyMusic.currentTime = 0;
        journeyMusic.volume = 0;
    }

    finalScene.classList.remove("active", "fading-out");
    document.body.classList.remove("showing-journey");

    if (wishForm) wishForm.reset();

    if (wishInput) {
        wishInput.value = "";
        wishInput.disabled = false;
        wishInput.readOnly = false;
        wishInput.style.removeProperty("pointer-events");
        wishInput.style.removeProperty("visibility");
    }

    if (sendButton) sendButton.disabled = false;

    if (wishArea) {
        wishArea.classList.remove("capsule-mode", "launching", "launch-started");
    }

    if (wishForm) {
        wishForm.classList.remove("capsule-mode", "launching", "launch-started");
    }

    if (capsule) {
        capsule.classList.remove("ready", "launch", "arrived");
        capsule.style.removeProperty("--flight-x");
        capsule.style.removeProperty("--flight-y");

        if (wishBoxWrapper) {
            wishBoxWrapper.appendChild(capsule);
        }

        capsule.style.removeProperty("position");
        capsule.style.removeProperty("left");
        capsule.style.removeProperty("top");
    }

    if (landingPage) {
        landingPage.classList.remove("launching");
    }

    if (finalJupiter) {
        finalJupiter.classList.remove("birthday-magic");
    }

    if (finalMessage) {
        finalMessage.classList.remove("visible");
        finalMessage.textContent = "";
    }

    birthdayEndingStarted = false;
}