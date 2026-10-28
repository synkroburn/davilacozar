(function () {
  var form = document.querySelector("form.form");
  if (!form) return;

  var gracias = document.getElementById("gracias");
  var aviso = document.getElementById("aviso-form");
  var a = form.querySelector("[data-a]");
  var b = form.querySelector("[data-b]");
  var answer = form.querySelector("[data-answer]");
  var n1 = 2 + Math.floor(Math.random() * 8);
  var n2 = 2 + Math.floor(Math.random() * 8);
  if (a && b) {
    a.textContent = String(n1);
    b.textContent = String(n2);
  }

  var frame = document.createElement("iframe");
  frame.name = "form-sink";
  frame.hidden = true;
  frame.setAttribute("aria-hidden", "true");
  frame.title = "Envío del formulario";
  document.body.appendChild(frame);
  frame.src = "about:blank";
  form.target = frame.name;
  var sent = false;

  frame.addEventListener("load", function () {
    if (!sent) return;
    finish();
  });

  var done = false;
  function finish() {
    if (done) return;
    done = true;
    form.hidden = true;
    gracias.hidden = false;
    gracias.textContent = "Gracias. Ya tenemos el mensaje y te escribimos a ese correo.";
  }

  form.addEventListener("submit", function (event) {
    if (answer && Number(String(answer.value).trim()) !== n1 + n2) {
      event.preventDefault();
      aviso.hidden = false;
      aviso.textContent = "Esa suma no cuadra.";
      answer.focus();
      return;
    }
    var honey = form.querySelector("[name=_honey]");
    if (honey && honey.value) {
      event.preventDefault();
      return;
    }

    aviso.hidden = true;
    var button = form.querySelector("button");
    button.disabled = true;
    sent = true;
    window.setTimeout(function () {
      if (done) return;
      button.disabled = false;
      aviso.hidden = false;
      aviso.textContent = "No se ha podido enviar. Escríbenos a fran@davilacozar.es.";
    }, 45000);
  });
})();
