document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const myAccountLink = document.getElementById('my-account-link');
  const myTransactions = document.getElementById('transactions-section');
  const myKyc = document.getElementById('register')
  const myLogin = document.getElementById('log-in')
  const myLogOut = document.getElementById('log-out')


  const token = localStorage.getItem('token')
  if (token) {
    if (myAccountLink) myAccountLink.style.display = 'block'
    if (myTransactions) myAccountLink.style.display = 'block'
    if (myKyc) myKyc.style.display = 'none'
    if (myLogin) myLogin.style.display = 'none'
    if (myLogOut) myLogOut.style.display = 'block'

  } else {
    if (myKyc) myKyc.style.display = 'block'
    if (myLogin) myLogin.style.display = 'block'
    if (myLogOut) myLogOut.style.display = 'none'
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });

  function login(email, password) {
    fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.user.token) {
          localStorage.setItem('token', data.user.token);
          window.location.href = 'http://127.0.0.1:5500/Front/index.html';
        } else {
          loginError.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        loginError.style.display = 'block';
      });
  }
});

function logout() {

  localStorage.removeItem('token');


  window.location.href = 'login.html';

  if (myAccountLink) myAccountLink.style.display = 'none';
  if (transactionsSection) transactionsSection.style.display = 'none';
  if (logoutLink) logoutLink.style.display = 'none';
  if (loginLink) loginLink.style.display = 'block';
  if (signupLink) signupLink.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');

  hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

})


document.addEventListener("DOMContentLoaded", () => {
  const depositModal = document.getElementById('deposit-modal');
  const transferModal = document.getElementById('transfer-modal');
  const closeDeposit = document.getElementById('close-deposit');
  const closeTransfer = document.getElementById('close-transfer');
  const depositBtn = document.querySelector('.transaction-item:nth-child(1) .btn');
  const transferBtn = document.querySelector('.transaction-item:nth-child(2) .btn');
  const depoForm = document.getElementById('deposit-form')

  depositBtn.addEventListener('click', () => {
    depositModal.style.display = 'block';
  });

  transferBtn.addEventListener('click', () => {
    transferModal.style.display = 'block';
  });

  closeDeposit.addEventListener('click', () => {
    depositModal.style.display = 'none';
  });

  closeTransfer.addEventListener('click', () => {
    transferModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === depositModal) {
      depositModal.style.display = 'none';
    }
    if (event.target === transferModal) {
      transferModal.style.display = 'none';
    }
  });

depoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const deposit = document.getElementById('deposit-amount').value;
    const depositError = document.getElementById('deposit-error')
    const token = localStorage.getItem('token')
    credit(deposit)

    function credit(deposit) {
      fetch('http://localhost:3000/api/v1/transaction/deposit', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(deposit)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data){
            window.location.href = 'http://127.0.0.1:5500/Front/index.html';
          } else {
            depositError.style.display = 'block'
          }
        })
    }
    depositModal.style.display = 'none';
  });



  document.getElementById('transfer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Recipient number:', document.getElementById('recipient-number').value);
    console.log('Transfer amount:', document.getElementById('transfer-amount').value);
    transferModal.style.display = 'none';
  });

});

