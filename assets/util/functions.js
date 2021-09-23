import uniqid from "uniqid";
import cloneDeep from "clone-deep";
import moment from "moment";
import emojis from "emoji.json/emoji-compact.json";

export const initialPreMessages = messages => {
  if (!messages) {
    messages = [{}];
  }
  return messages.map(message => ({
    id: message.id || uniqid(),
    text: message.text || "",
    time: message.time || "18:00:00"
  }))
};

export const emptyDays = () => [{
  title: "",
  tasks: [newTask()],
  messages: [newMessage()]
}];

export const initialOptions = (options = emptyDays()) =>
  options.map(day => ({
    ...day,
    id: day.id || uniqid(),
    title: day.title.replace(" - ", " – "),
    introduction: day.introduction || "",
    tasks: day.tasks.map((task, taskIndex) => ({
      ...task,
      id: task.id || uniqid(),
      options: task.options.map(option => ({
        ...option,
        id: option.id || uniqid()
      })),
      selection: task.selection || task.options[0]?.text,
      points: task.points || taskIndex + 1,
      time: task.time || "18:00:00",
      extraInput: task.extraInput || "",
    })),
    messages: (day.messages || [{}]).map(message => ({
      id: message.id || uniqid(),
      file: message.file || null,
      content: message.content || "",
      time: message.time || "18:00:00"
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

export const newTask = index => ({
  id: uniqid(),
  options: [],
  isBonus: false,
  selection: null,
  points: index + 1,
  time: "18:00:00",
  extraInput: ""
});

export const newMessage = () => ({
  id: uniqid(),
  type: "text",
  content: "",
  time: "18:00:00"
});

export const clearedOptions = (options, removeSelections = true) => {
  const optionsClone = cloneDeep(options, true);
  optionsClone.forEach(day => {
    day.tasks.forEach(task => {
      if (removeSelections) {
        delete task.selection;
      }
      delete task.extraInput;
    });
  });
  return optionsClone;
};

export const isSelectionMatching = task => {
  for (let option of task.options) {
    if (option.text === task.selection) {
      return true;
    }
  }
  return false;
};

export const randomEmoji = () => {
  const index = Math.floor(Math.random() * emojis.length);
  return emojis[index];
};

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

export const currentDay = date => {
  if (!date) {
    date = moment(new Date()).add(7, "days")
  };
  return moment(new Date()).diff(moment(date), "days");
};

export const newNotification = payload => {
  let newItem = { id: uniqid() };
  if (typeof payload === "string") {
    newItem.html = payload;
  } else {
    newItem = { ...newItem, ...payload };
  }
  return newItem;
};