class MobileOverlay {
  constructor(cssPrefix) {
    this.cssPrefix = cssPrefix;
    this.overlay = document.createElement("div");

    this._init();
  }

  _init() {
    const closeButtonContainer = document.createElement("div");
    closeButtonContainer.classList.add(`${this.cssPrefix}__close-button-container`);

    const closeButton = document.createElement("div");
    closeButton.classList.add(`${this.cssPrefix}__close-button`);

    const navContainer = document.createElement("nav");
    navContainer.setAttribute('id', 'mobile-navigation');

    closeButtonContainer.appendChild(closeButton);
    closeButton.addEventListener("click", () => { this.close() });

    this.overlay.classList.add(this.cssPrefix, "content-wrapper");
    this.overlay.appendChild(closeButtonContainer);
    this.overlay.appendChild(navContainer);

    document.body.prepend(this.overlay);
  }

  open() {
    this.overlay.style.height = "100%";
    document.body.style.overflow = "hidden";
  }

  close() {
    this.overlay.style.height = "0%";
    document.body.style.overflow = "auto";
  }
}

class Navigation {
  constructor(items, cssPrefix) {
    this.items = items;
    this.cssPrefix = cssPrefix;

    return this._init()
  }

  _init() {
    const ul = document.createElement('ul');
    ul.setAttribute('class', this.cssPrefix);

    this.items.forEach(item => {
      let li = document.createElement('li');
      li.setAttribute('class', `${this.cssPrefix}__item`);
      li.innerHTML = `<a href="#${item.link}" class="${this.cssPrefix}__link"> ${item.name} </a>`

      ul.appendChild(li)
    });

    return ul;
  }
}

class ServiceCard {
  constructor(name, desc, price, cssPrefix) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.cssPrefix = cssPrefix;

    return this._init();
  }

  _init() {
    const card = document.createElement('div');
    card.classList.add(`${this.cssPrefix}__content-item`);

    const info = document.createElement('div');
    info.classList.add(`${this.cssPrefix}__content-item-info`);
    info.innerHTML = `
      <h4> ${this.name} </h4>
      <span> ${this.desc} </span>`

    const price = document.createElement('div');
    price.classList.add(`${this.cssPrefix}__content-item-price`);
    price.innerHTML = `${this.price} ₽`;

    card.appendChild(info);
    card.appendChild(price);
    return card;
  }
}

class Tab {
  constructor(tabObj, tabContent, cssPrefix) {
    this.tabObj = tabObj;
    this.tabContent = tabContent;
    this.cssPrefix = cssPrefix

    return this._init();
  }

  _init() {
    const li = document.createElement('li');
    li.classList.add(`${this.cssPrefix}__link-item`);

    li.innerHTML = `${this.tabObj.name}`;
    return li;
  }
}

class TabsManager {
  constructor(tabObjects, cssPrefix) {
    this.tabObjects = tabObjects;
    this.cssPrefix = cssPrefix;

    this.activeTab = null;
    this.activeContent = null;

    return this._init();
  }

  _init() {
    const tabsManager = document.createElement("div");
    tabsManager.classList.add(this.cssPrefix);

    const tabsUl = document.createElement("ul");
    tabsUl.classList.add(`${this.cssPrefix}__links`);

    const tabsContentArray = [];

    this.tabObjects.forEach(element => {
      let tabContent = document.createElement("div");
      tabContent.classList.add(`${this.cssPrefix}__content`);

      element.content.forEach(contentItem => {
        let serviceCard = new ServiceCard(contentItem.name, contentItem.desc, contentItem.price, this.cssPrefix);
        tabContent.appendChild(serviceCard);
      });

      let tab = new Tab(element, tabContent, this.cssPrefix);
      tab.addEventListener("click", () => { this._toggle(tab, tabContent) });
      tabsUl.appendChild(tab);

      tabsContentArray.push(tabContent);
    });

    this.activeTab = tabsUl.firstChild;
    this.activeTab.classList.add("active");

    this.activeContent = tabsContentArray[0];
    this.activeContent.classList.add("active");

    tabsManager.appendChild(tabsUl);
    tabsContentArray.forEach(item => {
      tabsManager.appendChild(item);
    })

    return tabsManager;
  }

  _toggle(tab, content) {
    this.activeTab.classList.remove("active");
    this.activeContent.classList.remove("active");

    tab.classList.add("active");
    content.classList.add("active");

    this.activeTab = tab;
    this.activeContent = content;
  }
}

export { Navigation, MobileOverlay, TabsManager };