function sendData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  fetch('/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, age })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);  // 資料寫入成功會跳出訊息
  })
  .catch(error => {
    console.error('送出失敗：', error);
    alert('發送失敗');
  });
}
