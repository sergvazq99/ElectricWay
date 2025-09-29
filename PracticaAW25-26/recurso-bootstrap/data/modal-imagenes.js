const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalContent");
  const closeModal = document.getElementsByClassName("close")[0];
  const clickableImg = document.querySelector(".clickable-img");
  const mainContent = document.getElementById("main-content");

  clickableImg.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    mainContent.classList.add("blurred"); // Aplica el desenfoque
  }

  closeModal.onclick = function () {
    modal.style.display = "none";
    mainContent.classList.remove("blurred"); // Quita el desenfoque
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      mainContent.classList.remove("blurred"); // Quita el desenfoque
    }
  }