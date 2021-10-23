import uniqid from "uniqid";
import cloneDeep from "clone-deep";
import moment from "moment";
import emojis from "emoji.json/emoji-compact.json";

export const transformData = data => {
  if (!("isTemplatePublic" in data)) {
    data.isTemplatePublic = data.isPublic;
  }
  if (!("allowTemplateCopies" in data)) {
    data.allowTemplateCopies = data.allowCopies;
  }
  if (!("templateId" in data)) {
    data.templateId = data.template;
  }
  return data;
};

export const initialPreMessages = messages => {
  if (!messages) {
    messages = [{}];
  }
  return messages.map(message => ({
    id: message.id || uniqid(),
    isAudio: message.text || message.isAudio === false ? false : true,
    text: message.text || "",
    file: message.fileUrl || null,
    fileUrl: message.fileUrl || null,
    time: message.time || "18:00:00"
  }));
};

export const emptyDays = () => [{
  title: "",
  tasks: [newTask()],
  messages: [newMessage()]
}];

export const initialOptions = options => {
  if (!options) {
    options = emptyDays();
  }
  return options.map(day => ({
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
      isAudio: message.content || message.isAudio === false ? false : true,
      content: message.content || "",
      file: message.fileUrl || null,
      fileUrl: message.fileUrl || null,
      time: message.time || "18:00:00"
    }))
  }));
};

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

export const newMessage = (isAudio = true) => ({
  id: uniqid(),
  isAudio,
  content: "",
  file: null,
  fileUrl: null,
  time: "18:00:00"
});

export const defaultDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

export const clearedPreMessages = messages => {
  const messagesClone = cloneDeep(messages, true);
  messagesClone.forEach(message => {
    delete message.file;
  });
  return messagesClone;
};

export const clearedOptions = options => {
  const optionsClone = cloneDeep(options, true);
  optionsClone.forEach(day => {
    day.tasks.forEach(task => {
      delete task.selection;
      delete task.extraInput;
    });
    day.messages.forEach(message => {
      delete message.file;
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

export const initialsImg = user => {
  const { organization, fullName, username } = user || {};
  let name = organization || fullName || username || "";
  name = name.split(" ").join("+");
  return `https://ui-avatars.com/api/?name=${name}&size=512`;
};

export const numbersArray = n =>
  Array.from({ length: n }, (_, i) => i + 1);

export const dataArrayFromObject = data =>
  Object.keys(data).map(id => ({ id, ...data[id] }));

export const currentDay = date =>
  moment(new Date()).diff(moment(date), "days");;

export const newNotification = payload => {
  let newItem = { id: uniqid() };
  if (typeof payload === "string") {
    newItem.html = payload;
  } else {
    newItem = { ...newItem, ...payload };
  }
  return newItem;
};

export const isTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;