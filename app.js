const peopleNumbInp = document.getElementById('peopleNumb');
const peopleInpContainer = document.getElementById('peopleInpContainer');
const errorMsg = document.getElementById('errorMsg');

function errorFunction() {

    if (peopleNumbInp.value == 0) {
        errorMsg.style.display = 'grid';
        peopleInpContainer.classList.add('errorBorder');
    } else {
        errorMsg.style.display = 'none';
        peopleInpContainer.classList.remove('errorBorder');
    }
}

peopleNumbInp.addEventListener('input', errorFunction);

document.addEventListener('DOMContentLoaded', function () {
    const billInput = document.getElementById('billInp');
    const tipButtons = document.querySelectorAll('.per');
    const customTipInput = document.getElementById('custom');
    const peopleInput = document.getElementById('peopleNumb');
    const tipAmountText = document.querySelector('.tip-amount-numb');
    const totalAmountText = document.querySelector('.total-numb');
    const resetButton = document.getElementById('resetBtn');

    let tipPercentage = 0;

    function calculateTipAndTotal() {
        const billAmount = parseFloat(billInput.value);
        const customTip = parseFloat(customTipInput.value);

        if (!isNaN(customTip) && customTip >= 0 && customTip < 100) {
            tipPercentage = customTip;
        } else {
            for (const button of tipButtons) {
                if (button.classList.contains('selected')) {
                    tipPercentage = parseFloat(button.textContent);
                }
            }
        }

        const numPeople = parseInt(peopleInput.value);

        if (!isNaN(billAmount) && billAmount >= 0 && !isNaN(numPeople) && numPeople > 0) {
            const tipPerPerson = (billAmount * (tipPercentage / 100)) / numPeople;
            const totalPerPerson = (billAmount / numPeople) + tipPerPerson;

            tipAmountText.textContent = '$' + tipPerPerson.toFixed(2);
            totalAmountText.textContent = '$' + totalPerPerson.toFixed(2);
        } else {
            tipAmountText.textContent = '$0.00';
            totalAmountText.textContent = '$0.00';
        }
    }

    for (const button of tipButtons) {
        button.addEventListener('click', function () {
            tipButtons.forEach(btn => btn.classList.remove('selected'));

            button.classList.add('selected');

            calculateTipAndTotal();
        });
    }

    customTipInput.addEventListener('input', function () {
        tipButtons.forEach(btn => btn.classList.remove('selected'));

        calculateTipAndTotal();
    });

    peopleInput.addEventListener('input', calculateTipAndTotal);

    resetButton.addEventListener('click', function () {
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '';
        tipButtons.forEach(btn => btn.classList.remove('selected'));
        tipAmountText.textContent = '$0.00';
        totalAmountText.textContent = '$0.00';
    });
});

