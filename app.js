import data from "./data.js";

// Ascessing the DOM
let toggleBtn = document.querySelector(".toggle-btn");
let closeBtn = document.querySelector(".close-btn");
let sidebarWrapper = document.querySelector(".sidebar-wrapper");
let sideBar = document.querySelector(".sidebar-links");
let linksBtn = [...document.querySelectorAll(".link-btn")];
let submenu = document.querySelector(".submenu");
let hero = document.querySelector(".hero");
let nav = document.querySelector(".navbar");

toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show-sidebar");
});
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show-sidebar");
});

//    Side Bar
sideBar.innerHTML = data
  .map((item) => {
    const { page, links } = item;
    return `
    <article>
    <h4>${page}</h4>
    <div class='submenu-links'>
    ${links
      .map((i) => {
        return `
        <a href="${i.url}"><i class="${i.icon}"></i> ${i.label}</a>
        `;
      })
      .join(" ")}
    </div>
    </article>
    `;
  })
  .join(" ");

linksBtn.forEach((btn) => {
  btn.addEventListener("mouseover", (e) => {
    let label = e.currentTarget.textContent;
    let position = e.currentTarget.getBoundingClientRect();
    let center = (position.left + position.right) / 2;
    let bottom = position.bottom + 16;
    let tempLink = data.find((link) => link.page == label);

    if (tempLink) {
      const { page, links } = tempLink;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      let column;
      if (links.length == 2) {
        column = "col-2";
      }
      if (links.length === 3) {
        column = "col-3";
      }
      if (links.length >= 4) {
        column = "col-4";
      }
      submenu.innerHTML = `
            <article>
            <h4>${page}</h4>
            <div class='submenu-center ${column}'>
            ${links
              .map((i) => {
                return `
                <a href="${i.url}"><i class="${i.icon}"></i> ${i.label}</a>
                `;
              })
              .join(" ")}
            </div>
            </article>
            `;
    }
  });
});

hero.addEventListener("mouseover",()=>{
    submenu.classList.remove("show");
    submenu.style.left = `0px`;
    submenu.style.top = `0px`;
})

nav.addEventListener("click",()=>{
    submenu.classList.remove("show");
    submenu.style.left = `0px`;
    submenu.style.top = `0px`;
})