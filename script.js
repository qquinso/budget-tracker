const setup = document.getElementById("setup");

const transactionForm =
    document.getElementById("transactionForm");

const scriptUrlInput =
    document.getElementById("scriptUrl");

const connectButton =
    document.getElementById("connectButton");

const addButton =
    document.getElementById("addButton");

const settingsButton =
    document.getElementById("settingsButton");

const message =
    document.getElementById("message");


// ------------------------
// DATE
// ------------------------

function updateDate() {

    const today = new Date();

    document.getElementById("date").textContent =
        today.toLocaleDateString(
            "en-PH",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );

}


updateDate();


// ------------------------
// CHECK CONNECTION
// ------------------------

const savedUrl =
    localStorage.getItem("budgetScriptUrl");


if (savedUrl) {

    transactionForm.classList.remove("hidden");

} else {

    setup.classList.remove("hidden");

}


// ------------------------
// CONNECT
// ------------------------

connectButton.addEventListener(
    "click",
    () => {

        const url =
            scriptUrlInput.value.trim();


        if (!url) {

            alert(
                "Please enter your Apps Script URL."
            );

            return;

        }


        localStorage.setItem(
            "budgetScriptUrl",
            url
        );


        setup.classList.add("hidden");

        transactionForm.classList.remove(
            "hidden"
        );

    }
);


// ------------------------
// ADD TRANSACTION
// ------------------------

addButton.addEventListener(
    "click",
    async () => {

        const scriptUrl =
            localStorage.getItem(
                "budgetScriptUrl"
            );


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const amount =
            document
                .getElementById("amount")
                .value;


        const category =
            document
                .getElementById("category")
                .value;


        const payment =
            document
                .getElementById("payment")
                .value;


        const type =
            document
                .getElementById("type")
                .value;


        // VALIDATION

        if (
            !description ||
            !amount ||
            !category ||
            !payment
        ) {

            message.textContent =
                "Please complete all fields.";

            return;

        }


        // DATA

        const transaction = {

            description: description,

            amount: Number(amount),

            category: category,

            payment: payment,

            type: type

        };


        // LOADING

        addButton.textContent =
            "Adding...";

        addButton.disabled =
            true;


        try {

            await fetch(
                scriptUrl,
                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain"
                    },

                    body:
                        JSON.stringify(
                            transaction
                        )

                }
            );


            // SUCCESS

            message.textContent =
                "✓ Transaction added";


            // RESET FORM

            document
                .getElementById("description")
                .value = "";


            document
                .getElementById("amount")
                .value = "";


            document
                .getElementById("category")
                .value = "";


            document
                .getElementById("payment")
                .value = "";


            document
                .getElementById("type")
                .value =
                    "Cash Out";


        } catch (error) {

            console.error(error);


            message.textContent =
                "Something went wrong.";

        }


        addButton.textContent =
            "Add Transaction";


        addButton.disabled =
            false;

    }
);


// ------------------------
// SETTINGS
// ------------------------

settingsButton.addEventListener(
    "click",
    () => {

        const confirmReset =
            confirm(
                "Change your Google Sheet connection?"
            );


        if (confirmReset) {

            localStorage.removeItem(
                "budgetScriptUrl"
            );


            transactionForm.classList.add(
                "hidden"
            );


            setup.classList.remove(
                "hidden"
            );

        }

    }
);
