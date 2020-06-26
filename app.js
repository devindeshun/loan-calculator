
const calculate = document.querySelector('#loan-form');


calculateLoan = (e) => {
    const loanAmount = document.querySelector('#amount');
    const interest =  document.querySelector('#interest');
    const yrsToRepay = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    
    const principle = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(yrsToRepay.value) * 12;
    
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);
    
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
        
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        
    } else {
        setTimeout(() => { 
            document.getElementById('loading').style.display = 'none';
            showError('Please check your numbers for errors.');
        }, 2000);
    }
    
    e.preventDefault();
}

showError = (error) => {
    const errorDiv = document.createElement('div');
    
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    errorDiv.className = 'alert alert-danger';
    
    errorDiv.appendChild(document.createTextNode(error));
    
    card.insertBefore(errorDiv, heading);
    
    setTimeout(() => { errorDiv.remove() }, 3000)
}

calculate.addEventListener('submit', calculateLoan);

document.querySelector('.btn').addEventListener('click', (e) => {
    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateLoan, 2000);

    e.preventDefault();
})
