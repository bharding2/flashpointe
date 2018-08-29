window.launchSTELLA = function(name, titleSections, bodyEl) {
  console.log('stella has entered the building');

  titleSections.forEach((ele, idx) => {
    setTimeout(() => {
      ele.classList.add(`color-${idx}`);
    }, idx * 50);
  });

  let containerEl = document.createElement('main');
  containerEl.classList.add(`${name}-container`);
  bodyEl.appendChild(containerEl);

  let messagesEl = document.createElement('aside');
  messagesEl.classList.add(`${name}-messages`);
  containerEl.appendChild(messagesEl);

  fetch('https://api.github.com/repos/bharding2/flashpointe/issues')
    .then((response) => {
      return response.json();
    })
    .then((issues) => {
      let nameIssues = issues.filter((ele) => {
        return ele.labels.some((label) => {
          return label.name === name.toLowerCase();
        });
      });

      nameIssues.forEach((issue) => {
        createIssue(issue, messagesEl);
      });
    });
    
    function createIssue(issue, parentEl) {
      var articleEl = document.createElement('article');
      articleEl.id = issue.number;
    
      var titleEl = document.createElement('h2');
      titleEl.textContent = issue.title;
      articleEl.appendChild(titleEl);
    
      var bylineEl = document.createElement('p');
      bylineEl.textContent = `Posted by ${issue.user.login} at ${issue.created_at}`;
      articleEl.appendChild(bylineEl);
    
      var bodyEl = document.createElement('div');
      bodyEl.innerHTML = issue.body;
      articleEl.appendChild(bodyEl);
    
      parentEl.appendChild(articleEl);
    }
};
