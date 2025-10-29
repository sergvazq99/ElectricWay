window.onload = function () { document.getElementById("myModal").style.display = "block"; };

        document.getElementById("cerrarModal").onclick = function () {
            document.getElementById("myModal").style.display = "none";
        };

        window.onload = function () {
            const modal = document.getElementById("myModal");
            const cerrarBtn = document.getElementById("cerrarModal");
            const mainContent = document.getElementById("content");
            

            // Mostrar modal automáticamente
            modal.style.display = "block";
            mainContent.classList.add("blurred");

            // Cerrar modal y quitar desenfoque
            cerrarBtn.onclick = function () {
                modal.style.display = "none";
                mainContent.classList.remove("blurred");
            }

            // También cerrar si se hace clic fuera del modal (opcional)
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                    mainContent.classList.remove("blurred");
                }
            }
        };