import uniqid from "uniqid";
import cloneDeep from "clone-deep";

export const usersArray = users => {
  const data = [];
  for (let key in users) {
    data.push({ name: key, score: users[key] });
  }
  return data;
};

export const teamsArray = challenges => {
  const data = [];
  for (let key in challenges) {
    const { total, day, template, users } = challenges[key];
    data.push({
      team: key,
      users: usersArray(users),
      total,
      day,
      template,
    });
  }
  return data;
};

export const challengesArray = challenges => {
  const teams = teamsArray(challenges);
  const data = [];
  for (let i = 0; i < teams.length - 1; i += 2) {
    data.push({
      school1: teams[i].team,
      score1: teams[i].total,
      school2: teams[i + 1].team,
      score2: teams[i + 1].total,
      total: teams[i].total + teams[i + 1].total,
    });
  }
  return data;
};

export const emptyDays = (days = 6, tasks = 2) =>
  numbersArray(days).map(() => ({
    title: "",
    tasks: numbersArray(tasks).map(() => ({ options: [], isBonus: false }))
  }));

export const initialOptions = options =>
  options.map(day => ({
    ...day,
    id: day.id || uniqid(),
    tasks: day.tasks.map(task => ({
      ...task,
      id: task.id || uniqid(),
      options: task.options.map(option => ({
        ...option,
        id: option.id || uniqid()
      })),
      selection: task.selection || task.options[0]?.text,
      extraInput: task.extraInput || ""
    }))
  }));

export const stripHTML = text => text.replace(/(<([^>]+)>)/ig, "");

export const convertTaskText = text => {
  const chars = stripHTML(text).replace(" - ", " – ").split("");
  let closingTag = false;
  chars.forEach((char, index) => {
    if (char === "*") {
      chars[index] = !closingTag ? "<strong>" : "</strong>";
      closingTag = !closingTag;
    }
  });
  return chars.join("");
};

export const newTask = () => ({
  id: uniqid(),
  options: [],
  isBonus: false,
  selection: null,
  extraInput: ""
});

export const clearedOptions = (options, removeSelections = true) => {
  const optionsClone = cloneDeep(options, true);
  optionsClone.forEach(day => {
    day.tasks.forEach(task => {
      if (removeSelections) {
        delete task.selection;
      }
      delete task.extraInput;
    })
  })
  return optionsClone;
}

export const textInputKeys = labels => {
  const keys = [];
  for (let key in labels) {
    if (key !== "language" && key !== "phone") {
      keys.push(key);
    }
  }
  return keys;
};

export const initialData = labels => {
  const formData = {};
  for (let key in labels) {
    formData[key] = "";
  }
  return formData;
};

export const numbersArray = n =>
  Array.from({ length: n }, (_, i) => i + 1);

export const dataArrayFromObject = data =>
  Object.keys(data).map(id => ({ id, ...data[id] }));
