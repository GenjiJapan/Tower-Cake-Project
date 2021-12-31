import React from "react";
import Cookies from "universal-cookie";
import "./NotFound.css";

function Error(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");

  window.onload = function () {
    var paragraph = document.getElementById("type-in");
    var supparagraph = document.getElementById("type-after");

    var text = paragraph.innerHTML;
    var textafter = supparagraph.innerHTML;

    paragraph.innerHTML = "";
    supparagraph.innerHTML = "";

    for (var i = 0, len = text.length; i < len; i++) {
      (function (i) {
        window.setTimeout(function () {
          paragraph.innerHTML += text[i];
        }, i * 100);
      })(i);
    }
    window.setTimeout(function () {
      paragraph.style.borderRight = "3px solid #222";
      supparagraph.style.borderRight = "3px solid #555";
      for (var i = 0, len = textafter.length; i < len; i++) {
        (function (i) {
          window.setTimeout(function () {
            supparagraph.innerHTML += textafter[i];
          }, i * 100);
        })(i);
      }
    }, text.length * 100 + 200);
  };

  return (
    <div className="notfound">
      <p class="back"></p>
      <p id="type-in">
        Error{" "}
        {account.permissionId >= 4 || account.permissionId <= 0 ? "403" : "404"}{" "}
      </p>
      <p id="type-after">
        {account.permissionId >= 4 || account.permissionId <= 0
          ? "Forbidden"
          : "Page not found"}{" "}
      </p>
    </div>
  );
}

export default Error;
