const API = 'http://localhost:5000/api/v1';
let isRegister = false;

function toggleMode() {
  isRegister = !isRegister;
  document.getElementById('formTitle').textContent = isRegister ? 'Register' : 'Login';
  document.getElementById('nameField').style.display = isRegister ? 'block' : 'none';
  document.getElementById('toggleText').textContent = isRegister
    ? 'Already have an account? Login'
    : "Don't have an account? Register";
  showMsg('', '');
}

function showMsg(text, type) {
  const el = document.getElementById('msg');
  el.textContent = text;
  el.className = `msg ${type}`;
}

async function handleSubmit() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const name = document.getElementById('name')?.value.trim();

  const endpoint = isRegister ? '/auth/register' : '/auth/login';
  const body = isRegister ? { name, email, password } : { email, password };

  try {
    const res = await fetch(`${API}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!res.ok) {
      showMsg(data.error || 'Something went wrong', 'error');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    showMsg('Redirecting...', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 800);
  } catch (err) {
    showMsg('Cannot connect to server', 'error');
  }
}