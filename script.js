const API_URL = "http://localhost:5000/api";


// =====================================================
// ELEMENTS
// =====================================================

const authSection =
    document.getElementById("authSection");

const dashboard =
    document.getElementById("dashboard");

const loginBox =
    document.getElementById("loginBox");

const signupBox =
    document.getElementById("signupBox");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const signupName =
    document.getElementById("signupName");

const signupEmail =
    document.getElementById("signupEmail");

const signupPassword =
    document.getElementById("signupPassword");

const loginMessage =
    document.getElementById("loginMessage");

const signupMessage =
    document.getElementById("signupMessage");

const showSignupBtn =
    document.getElementById("showSignup");

const showLoginBtn =
    document.getElementById("showLogin");

const logoutBtn =
    document.getElementById("logoutBtn");

const recommendBtn =
    document.getElementById("recommendBtn");

const recommendationResult =
    document.getElementById("recommendationResult");

const environment =
    document.getElementById("environment");

const sunlight =
    document.getElementById("sunlight");

const maintenance =
    document.getElementById("maintenance");

const myPlantsResult =
    document.getElementById("myPlantsResult");

const plantProblem =
    document.getElementById("plantProblem");

const doctorBtn =
    document.getElementById("doctorBtn");

const doctorResult =
    document.getElementById("doctorResult");


// =====================================================
// SHOW SIGNUP
// =====================================================

showSignupBtn.addEventListener(
    "click",
    function () {

        loginBox.classList.add("hidden");

        signupBox.classList.remove("hidden");

        loginMessage.textContent = "";
        signupMessage.textContent = "";

    }
);


// =====================================================
// SHOW LOGIN
// =====================================================

showLoginBtn.addEventListener(
    "click",
    function () {

        signupBox.classList.add("hidden");

        loginBox.classList.remove("hidden");

        loginMessage.textContent = "";
        signupMessage.textContent = "";

    }
);


// =====================================================
// SIGNUP
// =====================================================

signupForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        signupMessage.textContent =
            "Creating account...";

        signupMessage.style.color =
            "#555";


        const name =
            signupName.value.trim();

        const email =
            signupEmail.value.trim();

        const password =
            signupPassword.value;


        try {

            const response =
                await fetch(
                    `${API_URL}/auth/signup`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                signupMessage.textContent =
                    data.message ||
                    "Signup failed.";

                signupMessage.style.color =
                    "red";

                return;
            }


            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            signupMessage.textContent =
                "Account created successfully!";

            signupMessage.style.color =
                "green";


            signupForm.reset();


            setTimeout(
                showDashboard,
                300
            );


        } catch (error) {

            console.error(error);

            signupMessage.textContent =
                "Cannot connect to backend.";

            signupMessage.style.color =
                "red";
        }

    }
);


// =====================================================
// LOGIN
// =====================================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        loginMessage.textContent =
            "Logging in...";

        loginMessage.style.color =
            "#555";


        const email =
            loginEmail.value.trim();

        const password =
            loginPassword.value;


        try {

            const response =
                await fetch(
                    `${API_URL}/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                loginMessage.textContent =
                    data.message ||
                    "Login failed.";

                loginMessage.style.color =
                    "red";

                return;
            }


            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            loginMessage.textContent =
                "Login successful!";

            loginMessage.style.color =
                "green";


            loginForm.reset();


            setTimeout(
                showDashboard,
                300
            );


        } catch (error) {

            console.error(error);

            loginMessage.textContent =
                "Cannot connect to backend.";

            loginMessage.style.color =
                "red";
        }

    }
);


// =====================================================
// SHOW DASHBOARD
// =====================================================

function showDashboard() {

    authSection.classList.add(
        "hidden"
    );

    dashboard.classList.remove(
        "hidden"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =====================================================
// HOME
// =====================================================

function goHome() {

    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "user"
    );


    dashboard.classList.add(
        "hidden"
    );

    authSection.classList.remove(
        "hidden"
    );


    loginBox.classList.remove(
        "hidden"
    );

    signupBox.classList.add(
        "hidden"
    );


    loginMessage.textContent = "";

    signupMessage.textContent = "";


    window.scrollTo({
        top: 0
    });

}


logoutBtn.addEventListener(
    "click",
    logout
);


// =====================================================
// CHECK LOGIN
// =====================================================

async function checkLogin() {

    const token =
        localStorage.getItem(
            "token"
        );


    if (!token) {

        authSection.classList.remove(
            "hidden"
        );

        dashboard.classList.add(
            "hidden"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/auth/profile`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        if (!response.ok) {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            authSection.classList.remove(
                "hidden"
            );

            dashboard.classList.add(
                "hidden"
            );

            return;
        }


        const user =
            await response.json();


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        showDashboard();


    } catch (error) {

        console.error(error);

    }

}


// =====================================================
// RECOMMENDATION SCROLL
// =====================================================

function scrollToRecommendation() {

    document
        .getElementById("recommend")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// CARE SCROLL
// =====================================================

function scrollToCare() {

    document
        .getElementById("care")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// RECOMMEND PLANTS
// =====================================================

recommendBtn.addEventListener(
    "click",
    async function () {

        recommendationResult.classList.remove(
            "hidden"
        );


        recommendationResult.innerHTML = `
            <p>🌱 Finding plants...</p>
        `;


        const env =
            environment.value;

        const sun =
            sunlight.value;

        const maintain =
            maintenance.value;


        try {

            const url =
                `${API_URL}/plants/recommend` +
                `?environment=${encodeURIComponent(env)}` +
                `&sunlight=${encodeURIComponent(sun)}` +
                `&maintenance=${encodeURIComponent(maintain)}`;


            const response =
                await fetch(url);


            const plants =
                await response.json();


            if (!response.ok) {

                recommendationResult.innerHTML = `
                    <p>
                        ❌ ${
                            plants.message ||
                            "Recommendation failed."
                        }
                    </p>
                `;

                return;
            }


            if (
                !Array.isArray(plants) ||
                plants.length === 0
            ) {

                recommendationResult.innerHTML = `
                    <div class="empty-message">
                        🌱 No matching plants found.
                    </div>
                `;

                return;
            }


            let html = `
                <h3>
                    🌿 Recommended Plants
                </h3>

                <div class="plant-grid">
            `;


            plants.forEach(
                function (plant) {

                    html += `

                        <div class="plant-card">

                            ${
                                plant.image
                                ?
                                `
                                <img
                                    src="${plant.image}"
                                    class="plant-image"
                                    alt="${plant.name}"
                                >
                                `
                                :
                                ""
                            }

                            <h4>
                                ${plant.name}
                            </h4>

                            <p>
                                <strong>
                                    Scientific Name:
                                </strong>

                                ${
                                    plant.scientificName ||
                                    "Not available"
                                }
                            </p>

                            <p>
                                <strong>
                                    Environment:
                                </strong>

                                ${plant.environment}
                            </p>

                            <p>
                                <strong>
                                    Sunlight:
                                </strong>

                                ${plant.sunlight}
                            </p>

                            <p>
                                <strong>
                                    Maintenance:
                                </strong>

                                ${plant.maintenance}
                            </p>

                            <p>
                                <strong>
                                    Water:
                                </strong>

                                ${
                                    plant.waterRequirement ||
                                    "Not available"
                                }
                            </p>

                            <p>
                                ${
                                    plant.description ||
                                    ""
                                }
                            </p>

                            <button
                                class="primary-btn"
                                onclick="addPlant('${plant._id}')"
                            >
                                🪴 Add to My Plants
                            </button>

                        </div>

                    `;

                }
            );


            html += `
                </div>
            `;


            recommendationResult.innerHTML =
                html;


        } catch (error) {

            console.error(error);

            recommendationResult.innerHTML = `
                <p>
                    ❌ Cannot connect to PlantAI backend.
                </p>
            `;

        }

    }
);


// =====================================================
// ADD PLANT
// =====================================================

async function addPlant(
    plantId
) {

    const token =
        localStorage.getItem(
            "token"
        );


    if (!token) {

        alert(
            "Please login first."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/user-plants`,
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        plantId:
                            plantId,

                        nickname:
                            "",

                        lastWatered:
                            null,

                        nextWatering:
                            null

                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to add plant."
            );

            return;
        }


        alert(
            `${data.plant.name} added!`
        );


        loadMyPlants();


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to backend."
        );

    }

}


// =====================================================
// SHOW MY PLANTS
// =====================================================

function showMyPlants() {

    document
        .getElementById("myPlants")
        .scrollIntoView({
            behavior: "smooth"
        });


    loadMyPlants();

}


// =====================================================
// LOAD MY PLANTS
// =====================================================

async function loadMyPlants() {

    const token =
        localStorage.getItem(
            "token"
        );


    if (!token) {

        myPlantsResult.innerHTML = `
            <p>
                Please login first.
            </p>
        `;

        return;
    }


    myPlantsResult.innerHTML = `
        <p>
            🌱 Loading your plants...
        </p>
    `;


    try {

        const response =
            await fetch(
                `${API_URL}/user-plants`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const plants =
            await response.json();


        if (!response.ok) {

            myPlantsResult.innerHTML = `
                <p>
                    ❌ ${
                        plants.message ||
                        "Unable to load plants."
                    }
                </p>
            `;

            return;
        }


        if (!plants.length) {

            myPlantsResult.innerHTML = `
                <div class="empty-message">
                    🪴 Your collection is empty.
                    <br><br>
                    Go to Recommendations
                    and add a plant.
                </div>
            `;

            return;
        }


        let html = `
            <h3>
                🪴 My Plants
            </h3>

            <div class="plant-grid">
        `;


        plants.forEach(
            function (item) {

                const plant =
                    item.plant;


                if (!plant) {
                    return;
                }


                html += `

                    <div class="plant-card">

                        ${
                            plant.image
                            ?
                            `
                            <img
                                src="${plant.image}"
                                class="plant-image"
                                alt="${plant.name}"
                            >
                            `
                            :
                            ""
                        }

                        <h4>
                            ${plant.name}
                        </h4>

                        <p>
                            ${
                                plant.description ||
                                ""
                            }
                        </p>

                        <p>
                            <strong>
                                Water:
                            </strong>

                            ${
                                plant.waterRequirement ||
                                "Not available"
                            }
                        </p>

                        <button
                            class="primary-btn"
                            onclick="deleteMyPlant('${item._id}')"
                        >
                            🗑️ Remove
                        </button>

                    </div>

                `;

            }
        );


        html += `
            </div>
        `;


        myPlantsResult.innerHTML =
            html;


    } catch (error) {

        console.error(error);

        myPlantsResult.innerHTML = `
            <p>
                ❌ Cannot connect to backend.
            </p>
        `;

    }

}


// =====================================================
// DELETE PLANT
// =====================================================

async function deleteMyPlant(
    id
) {

    const token =
        localStorage.getItem(
            "token"
        );


    if (!token) {
        return;
    }


    if (
        !confirm(
            "Remove this plant?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/user-plants/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to remove plant."
            );

            return;
        }


        loadMyPlants();


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to backend."
        );

    }

}


// =====================================================
// PLANT DOCTOR DATA
// =====================================================

const doctorAdvice = {

    yellow: {

        title:
            "🌿 Yellow Leaves",

        text:
            "Yellow leaves can be caused by several factors. Check soil moisture, drainage and lighting.",

        tips: [
            "Check soil moisture.",
            "Make sure the pot has drainage.",
            "Check the plant's sunlight.",
            "Remove severely damaged leaves."
        ]

    },


    brown: {

        title:
            "🍂 Brown Leaves",

        text:
            "Brown leaves may be associated with dry soil, low humidity, excessive fertilizer or environmental stress.",

        tips: [
            "Check soil moisture.",
            "Avoid extremely dry soil.",
            "Avoid excessive fertilizer.",
            "Check humidity and light."
        ]

    },


    drooping: {

        title:
            "🥀 Drooping Leaves",

        text:
            "Drooping may happen because of watering problems or environmental stress.",

        tips: [
            "Check soil moisture.",
            "Look for standing water.",
            "Check drainage.",
            "Avoid extreme heat."
        ]

    },


    spots: {

        title:
            "🔴 Leaf Spots",

        text:
            "Leaf spots can have different causes, including pests, environmental stress and plant diseases.",

        tips: [
            "Inspect leaves carefully.",
            "Remove badly damaged leaves.",
            "Avoid water remaining on leaves.",
            "Check for insects."
        ]

    },


    dry: {

        title:
            "🏜️ Dry Soil",

        text:
            "Very dry soil can indicate that the plant needs water, although watering needs differ between plants.",

        tips: [
            "Check the soil below the surface.",
            "Water appropriately for the plant.",
            "Make sure excess water can drain.",
            "Create a regular care schedule."
        ]

    },


    root: {

        title:
            "🌱 Root Problems",

        text:
            "Poor drainage and excessive moisture can contribute to root problems.",

        tips: [
            "Check roots for dark or soft areas.",
            "Improve drainage.",
            "Avoid overwatering.",
            "Use suitable soil."
        ]

    }

};


// =====================================================
// SHOW PLANT DOCTOR
// =====================================================

function showPlantDoctor() {

    document
        .getElementById("doctor")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// DOCTOR BUTTON
// =====================================================

doctorBtn.addEventListener(
    "click",
    function () {

        doctorResult.classList.remove(
            "hidden"
        );


        const problem =
            plantProblem.value;


        if (!problem) {

            doctorResult.innerHTML = `
                <p>
                    ⚠️ Please select a problem first.
                </p>
            `;

            return;
        }


        const advice =
            doctorAdvice[problem];


        let tips = "";


        advice.tips.forEach(
            function (tip) {

                tips += `
                    <li>${tip}</li>
                `;

            }
        );


        doctorResult.innerHTML = `

            <div class="doctor-answer">

                <h3>
                    ${advice.title}
                </h3>

                <p>
                    ${advice.text}
                </p>

                <br>

                <strong>
                    What you can do:
                </strong>

                <ul>
                    ${tips}
                </ul>

            </div>

        `;

    }
);


// =====================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =====================================================

window.goHome =
    goHome;

window.scrollToRecommendation =
    scrollToRecommendation;

window.scrollToCare =
    scrollToCare;

window.showMyPlants =
    showMyPlants;

window.showPlantDoctor =
    showPlantDoctor;

window.addPlant =
    addPlant;

window.deleteMyPlant =
    deleteMyPlant;

window.logout =
    logout;


// =====================================================
// START
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkLogin();

    }
);