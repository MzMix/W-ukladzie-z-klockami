       let content = ` <!-- Opcje: --> <ul class="list-unstyled components">`;

        let part = "";
        let counter = 1;
        for (let submenu of data.sideMenuContent) {

            if (submenu.class) {
                part = `<li class="${submenu.class}">
            <a href="#submenu${counter}" data-toggle="collapse" aria-expanded="false"
               class="dropdown-toggle">${submenu.name}</a></li>
               <ul class="collapse list-unstyled" id="submenu${counter}">`;
            } else {
                part = `<li>

            <a href="#submenu${counter}" data-toggle="collapse" aria-expanded="false"
               class="dropdown-toggle">${submenu.name}</a>
               
               </li>
               
               
               <ul class="collapse list-unstyled" id="submenu${counter}">`;
            }

            for (let opt of submenu.content) {
                part += `<li class="${opt.class}"><a href="#" onclick="${opt.fxn}">${opt.name}</a></li>`;
            }
            counter++;

            part += `</ul></li>`;

            content += part;
        }

        content += `</ul> <!-- Opcje END -->`;