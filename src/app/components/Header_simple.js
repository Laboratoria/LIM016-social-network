export function HeaderSimple() {
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-timeline");

  // const background = document.createElement("div")
  // background.classList.add("background-header")

  const logoHeader = document.createElement("div");
  logoHeader.classList.add("logo-timeline");

  // background.append(logoHeader)
  // headerContainer.append(background)
  headerContainer.append(logoHeader);

  return headerContainer;
}
