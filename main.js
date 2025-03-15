const units = {
    "ml": "мл",
    "tab": "таб",
    "caps": "капс",
}

const methods = {
    "intramuscular": "внутримышечно, подкожно",
    "peroral": "перорально",
}

const multiplicities = {
    "4": "каждые 4 часа",
    "8-12": "каждые 8-12 часов",
    "12": "каждые 12 часов",
    "24": "каждые 24 часа",
    "48": "каждые 48 часов",
}

const data = {
    "analgin": ["Анальгин (Спазмалгон, Баралгин)", 30, 500, "ml", "intramuscular", "8-12", ""],
    "trimedat": ["Тримедат детский", 10, 100, "tab", "peroral", "8-12", ""],
    "ganaton": ["Ганатон", 8, 50, "tab", "peroral", "12", ""],
    "febtal": ["Фебтал", 20, 150, "tab", "peroral", "24", ""],
    "nebolin": ["Неболин 1 мг", 0.4, 1, "ml", "peroral", "12", ""],
    "melox05": ["Мелоксидил 0.5 мг", 0.4, 0.5, "ml", "peroral", "12", ""],
    "melox15": ["Мелоксидил 1.5 мг", 0.4, 1.5, "ml", "peroral", "12", ""],
    "antepsin_tab": ["Антепсин (табл)", 25, 1000, "tab", "peroral", "8-12", ""],
    "antepsin_susp": ["Антепсин (сусп) ", 25, 200, "ml", "peroral", "8-12", ""],
    "bicilin": ["Бицилин (ветбицин) 3 - 600 тыс", 60000, 120000, "ml", "intramuscular", "48", "плюс NaCl 5 мл"],
    "enroflon": ["Энрофлон (Байтрил / Энрофлоксацин) 5%", 5, 50, "ml", "intramuscular", "12", ""],
    "express_uspokoin": ["Экспресс успокоин (кошачий)", 8, 24, "tab", "peroral", "12", ""],
    "gabapentin": ["Габапентин (Конвалис)", 15, 300, "caps", "peroral", "12", ""],
    "espumizan": ["Эспумизан", 1, 1, "ml", "peroral", "4", ""],
    "smekta": ["Смекта", 0.8, 1, "ml", "peroral", "4", "1 пакет развести в 20 мл воды"],
    "heptral": ["Гептрал", 50, 400, "tab", "peroral", "12", ""],
}

const drugs = [
    "analgin",
    "trimedat",
    "ganaton",
    "febtal",
    "nebolin",
    "melox05",
    "melox15",
    "antepsin_tab",
    "antepsin_susp",
    "bicilin",
    "enroflon",
    "express_uspokoin",
    "gabapentin",
    "espumizan",
    "smekta",
    "heptral"
]

window.onload = function () {
    drugs.forEach(d => {
        const option = document.createElement('option');
        option.value = d;
        option.text = data[d][0];
        document.querySelector("#drug").appendChild(option);
    });

    document.querySelector("#weight").addEventListener("focus", () => {
        reset();
    })

    document.querySelector("#drug").addEventListener("focus", () => {
        reset();
    })

    document.querySelector("#submit").addEventListener("click", () => {
        calculate();
    })
}

function reset() {
    document.querySelector("#weight").classList.remove("is-invalid");
    document.querySelector("#drug").classList.remove("is-invalid");
    document.querySelector("#result-container").classList.remove("d-block");
    document.querySelector("#result-container").classList.add("d-none");
    document.querySelector("#result").innerHTML = "";
}

function calculate() {
    reset()

    const weight = document.querySelector("#weight").value.replace(",", ".");

    if (weight === "" || isNaN(weight) || weight <= 0) {
        document.querySelector("#weight").classList.add("is-invalid");
        return;
    }

    const drug = document.querySelector("#drug").value;
    if (drug === "") {
        document.querySelector("#drug").classList.add("is-invalid");
        return;
    }

    const record = data[drug];
    const doze = record[1]
    const concentration = record[2]
    const unit = units[record[3]]
    const method = methods[record[4]]
    const multiplicity = multiplicities[record[5]]
    const note = record[6]
    const result = (weight * doze) / concentration
    const resultRounded = Math.round((result + Number.EPSILON) * 100) / 100;

    document.querySelector("#result-container").classList.remove("d-none");
    document.querySelector("#result-container").classList.add("d-block");
    document.querySelector("#result").innerHTML = resultRounded + " " + unit + " " + method + " " + multiplicity + (note !== "" ? " (" + note + ")" : "");
}